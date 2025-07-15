"use server"
import { authOptions } from '@/config/auth'
import { db } from '@/prisma/db'
import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation';

export const getDashboardLayoutData = async () => {
  // user data such as name, email and avatar
  // user business data such as name, subdomain, whatsapp number, isActive, createdAt

  try {
    const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

    const userId = session?.user?.id;

    if(!userId) {
      throw new Error("Unauthorized: user not authenticated")
    }

    const user = await db.user.findUnique({
      where: {id: userId}
    })

    if (!user) {
      return {
        success: false,
        errorMessage: "User not found",
        user: null,
        business: null
      }
    }

    const business = await db.business.findUnique({
      where: { userId: user.id }
    })

    return {
      success: true,
      errorMessage: null,
      user,
      business
    }

  } catch (error) {
    console.error("Error fetching dashboard layout data:", error)

    return {
      success: false,
      errorMessage: error instanceof Error ? error.message : "Unexpected error",
      user: null,
      business: null
    }
  }
}

