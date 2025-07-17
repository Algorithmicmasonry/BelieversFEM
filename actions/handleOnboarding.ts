"use server"
import { authOptions } from "@/config/auth";
import { db } from "@/prisma/db";
import { getServerSession } from "next-auth";


export interface FormData {
  businessName: string
  businessImageUrl: string
  businessType: string
  whatsappNumber: string
  products: Array<{
    name: string
    description: string
    price: string
    images: string[]
  }>
  bankAccountNumber: string
  bankAccountName: string
  bankCode: string
  settlementSchedule: string
  subdomain: string
}

export const handleOnboarding = async (data: FormData) => {
  try {
    // Get the current session
    const session = await getServerSession(authOptions)
    const userId = session?.user?.id

    if (!userId) {
      throw new Error("Unauthorized: user not authenticated")
    }

    const {
      businessName,
      businessType,
      businessImageUrl,
      whatsappNumber,
      products,
      bankAccountNumber,
      bankAccountName,
      bankCode,
      settlementSchedule,
      subdomain,
    } = data

    // Validate required fields
    if (!businessName.trim() || !businessType.trim() || !whatsappNumber.trim() || !products || products.length === 0) {
      console.error("Required fields missing for onboarding: ", {
        businessName,
        businessType,
        whatsappNumber,
        products,
      })
      throw new Error(
        "All required fields (business name, business type, whatsapp number, and at least one product) must be provided for onboarding",
      )
    }

    const existingBusiness = await db.business.findFirst({
      where: { userId },
    })

    if (existingBusiness) {
      return {
        success: false,
        message: "You have already completed onboarding.",
        data: null,
      }
    }

    // Check if subdomain already exists and make it unique if necessary
    let uniqueSubdomain = subdomain
    let counter = 1
    while (true) {
      const existingBusiness = await db.business.findUnique({
        where: { subdomain: uniqueSubdomain },
      })
      if (!existingBusiness) break
      uniqueSubdomain = `${subdomain}-${counter}`
      counter++
    }

    // Create the business and products in a transaction
    // Create the business and products in a transaction
    const result = await db.$transaction(async (prisma) => {
      // Create the business
      const business = await prisma.business.create({
        data: {
          userId,
          businessName,
          businessType,
          subdomain: uniqueSubdomain,
          whatsappNumber,
          isActive: true,
          businessImageUrl,
          bankAccountName,
          bankAccountNumber,
          bankCode,
          settlementSchedule,
        },
      });

      // Create the products
      const createdProducts = await Promise.all(
        products.map((product, index) =>
          prisma.product.create({
            data: {
              businessId: business.id,
              name: product.name.trim(),
              description: product.description?.trim() || null,
              price: Number.parseFloat(product.price),
              images: {
                create: product.images.map((url) => ({
                  url: url.trim(),
                })),
              },
              sortOrder: index,
              isActive: true,
            },
          }),
        ),
      );

      // Update user's onboarded status
      await prisma.user.update({
        where: { id: userId },
        data: { onboarded: true },
      });

      return {
        business,
        products: createdProducts,
      };
    }, {
      timeout: 15000 // Increased timeout to 15 seconds (adjust as needed)
    });

    console.log("User onboarding completed successfully:", {
      userId,
      businessId: result.business.id,
      productCount: result.products.length,
    });

    return {
      success: true,
      message: "Onboarding completed successfully",
      data: {
        business: result.business,
        products: result.products,
      },
    };
  } catch (error) {
    console.error("Error during user onboarding:", error);

    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
        data: null,
      };
    }

    return {
      success: false,
      message: "An unexpected error occurred during onboarding",
      data: null,
    };
  }
};