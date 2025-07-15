import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { db } from "@/prisma/db";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  providers: [
    GoogleProvider({
      allowDangerousEmailAccountLinking: true,
      profile(profile) {
        console.log("Google profile:", profile);
        return {
          id: profile.sub,
          name: `${profile.given_name || "Unknown"} ${profile.family_name || ""}`.trim() || "Unknown",
          firstName: profile.given_name || "",
          lastName: profile.family_name || "",
          phone: "",
          image: profile.picture || null,
          email: profile.email || "",
        };
      },
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      httpOptions: {
        timeout: 10000,
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jb@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw { error: "No Inputs Found", status: 401 };
          }
          
          const existingUser = await db.user.findUnique({
            where: { email: credentials.email },
          });
          
          if (!existingUser) {
            throw { error: "No user found", status: 401 };
          }
          
          let passwordMatch: boolean = false;
          if (existingUser && existingUser.password) {
            passwordMatch = await compare(credentials.password, existingUser.password);
          }
          
          if (!passwordMatch) {
            throw { error: "Password Incorrect", status: 401 };
          }
          
          const user = {
            id: existingUser.id,
            name: existingUser.name,
            email: existingUser.email,
            image: existingUser.image,
            firstName: existingUser.firstName,
            lastName: existingUser.lastName,
            phone: existingUser.phone,
          };
          
          console.log("Credentials authorize user:", user);
          return user;
        } catch (error) {
          console.error("Authorize error:", error);
          throw { error: "Something went wrong", status: 401 };
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("signIn callback triggered:", { user, account, profile });
      
      if (account && account.provider === "google") {
        if (!user.email) {
          console.error("No email provided by Google profile");
          return false;
        }
        
        try {
          const existingAccount = await db.account.findUnique({
            where: {
              provider_providerAccountId: {
                provider: account.provider,
                providerAccountId: account.providerAccountId,
              },
            },
          });
          console.log("Existing account:", existingAccount);

          const existingUser = await db.user.findUnique({
            where: { email: user.email },
          });
          console.log("Existing user by email:", existingUser);

          if (existingUser) {
            // Check for account conflicts
            if (existingAccount && existingAccount.userId !== existingUser.id) {
              console.error(
                `Account conflict: Google account ${account.providerAccountId} is linked to user ${existingAccount.userId}, but email matches user ${existingUser.id}`
              );
              return false;
            }

            // Update or create account link
            await db.account.upsert({
              where: {
                provider_providerAccountId: {
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                },
              },
              update: {
                access_token: account.access_token,
                refresh_token: account.refresh_token,
                expires_at: account.expires_at,
                token_type: account.token_type,
                scope: account.scope,
                id_token: account.id_token,
                session_state: account.session_state,
              },
              create: {
                userId: existingUser.id,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                type: account.type,
                access_token: account.access_token,
                refresh_token: account.refresh_token,
                expires_at: account.expires_at,
                token_type: account.token_type,
                scope: account.scope,
                id_token: account.id_token,
                session_state: account.session_state,
              },
            });
            console.log("Linked Google account to existing user:", existingUser.id);

            // Update user object with existing user data
            user.id = existingUser.id;
            user.firstName = existingUser.firstName;
            user.lastName = existingUser.lastName;
            user.phone = existingUser.phone;
            
            return true;
          } else {
            // Create new user
            const newUser = await db.user.create({
              data: {
                email: user.email,
                name: user.name || "Unknown",
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                phone: user.phone || null,
                image: user.image || null,
              },
            });
            console.log("Created new user:", newUser.id);

            // Create account link
            await db.account.create({
              data: {
                userId: newUser.id,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                type: account.type,
                access_token: account.access_token,
                refresh_token: account.refresh_token,
                expires_at: account.expires_at,
                token_type: account.token_type,
                scope: account.scope,
                id_token: account.id_token,
                session_state: account.session_state,
              },
            });
            console.log("Linked Google account to new user:", newUser.id);

            user.id = newUser.id;
            return true;
          }
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false;
        }
      }
      return true;
    },
    
    async jwt({ token, user, account }) {
      console.log("JWT callback:", { token, user, account });
      
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.phone = user.phone;
      }
      
      // Add account information to token if available
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = account.expires_at;
      }
      
      return token;
    },
    
    async session({ session, token }) {
      console.log("Session callback:", { session, token });
      
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.picture as string;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.phone = token.phone as string;
      }
      
      return session;
    },
  },
  debug: process.env.NODE_ENV === "development",
};