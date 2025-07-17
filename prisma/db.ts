import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient({
  transactionOptions: {
    maxWait: 10000, // Wait up to 10 seconds to acquire a connection
    timeout: 10000, // Allow 10 seconds for the transaction to complete
  },
});

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;