import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient, Prisma } from "@prisma/client";
import { nextCookies } from "better-auth/next-js";
import { sendEmail } from "./email";
import { withAccelerate } from "@prisma/extension-accelerate";


const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
  datasources: {
    db: {
     url: process.env.DATABASE_URL || process.env.DIRECT_DATABASE_URL,
    },
  },
}).$extends(withAccelerate());

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "mongodb",
  }),
  user: {
    additionalFields: {
      firstName: {
        type: "string",
        required: true,
      },
      lastName: {
        type: "string",
        required: true,
      },
    },
  },
  advanced: {
    database: {
      generateId: false,
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    account: {
      accountLinking: {
        enabled: true,
      },
    },
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Reset your password",
        text: `Click the link to reset your password: ${url}`,
      });
    },
    resetPasswordTokenExpiresIn: 3600,
  },
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      redirectURI: `${
        process.env.NEXT_PUBLIC_AUTH_BASE_URL || "http://localhost:3000"
      }/api/auth/callback/google`,
      mapProfileToUser: (profile) => {
        return {
          firstName: profile.given_name,
          lastName: profile.family_name,
          image: profile.picture,
        };
      },
    },
  },
  plugins: [nextCookies()],
  errorHandler: (error: unknown) => {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error("Prisma Error:", {
        code: error.code,
        message: error.message,
        meta: error.meta,
        stack: error.stack,
      });
    } else if (error instanceof Error) {
      console.error("Generic Error:", {
        message: error.message,
        stack: error.stack,
      });
    } else {
      console.error("Unknown Error:", error);
    }
    throw error;
  },
});