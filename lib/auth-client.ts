// lib/auth-client.ts
import { createAuthClient } from "better-auth/react";

export const {
  signIn,
  signOut,
  useSession,
  forgetPassword,
  resetPassword,
} = createAuthClient({
  /** The base URL of the server, dynamically set based on environment */
  baseURL: process.env.NEXT_PUBLIC_AUTH_BASE_URL || undefined, // Fallback to undefined for same-domain requests
});