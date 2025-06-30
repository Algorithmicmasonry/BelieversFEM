"use server"
import {auth} from '@/lib/auth'
import { db } from '@/prisma/db'
import { headers } from 'next/headers'

export const dashboardLayoutData = async () => {
  // user data such as name, email and avatar
  // user business data such as name, subdomain, whatsapp number, isActive, createdAt

  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })

    const userId = session?.user?.id;

    if(!userId) {
      throw new Error("Unauthorized: user not authenticated")
    }
  } catch (error) {
    
  }

}
