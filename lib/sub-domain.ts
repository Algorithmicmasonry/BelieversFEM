// lib/subdomain.ts
import { db } from '@/prisma/db'; // Your Prisma client instance
// Import Prisma's generated types for Business, Product, and Image
import { Business, Product, Image as PrismaImage } from '@prisma/client';

// Define a type that represents the full Business object with its relations.
// This type will match the structure returned by Prisma when you use `include`.
// We're aliasing 'Image' to 'PrismaImage' to avoid conflict with global 'Image' (e.g., Next.js Image component).
export type FullBusinessData = Business & {
  products: (Product & { images: PrismaImage[] })[];
  // Add other relations here if you ever need them in this function, e.g.:
  // storeViews: StoreView[];
  // whatsappClicks: WhatsAppClick[];
  // transactions: Transaction[];
};

// --- Modified getSubdomainData function ---
export async function getSubdomainData(subdomain: string): Promise<FullBusinessData | null> {
  // Sanitize the subdomain to ensure it matches the format stored in your DB.
  // This should be consistent with how subdomains are saved during onboarding.
  const sanitizedSubdomain = subdomain.toLowerCase().replace(/[^a-z0-9-]/g, '');

  try {
    const business = await db.business.findUnique({
      where: {
        subdomain: sanitizedSubdomain,
      },
      // --- CRITICAL CHANGE: Use 'include' to fetch related data ---
      include: {
        products: {
          include: {
            images: true, // Include the images for each product
          },
          orderBy: {
            sortOrder: 'asc', // Optional: Order products by sortOrder
          },
        },
        // You can include other relations here if needed for the store page
        // user: true, // If you need user details associated with the business
      },
    });

    // If no business is found for the given subdomain, return null.
    if (!business) {
      return null;
    }

    // The 'business' object now contains all its fields AND the 'products' array
    // (with each product also containing its 'images' array).
    // We cast it to FullBusinessData to ensure TypeScript knows its full shape.
    return business as FullBusinessData;

  } catch (error) {
    console.error(`Error fetching subdomain data for "${subdomain}":`, error);
    // Return null or re-throw the error based on your application's error handling strategy.
    return null;
  }
}

// --- getAllSubdomains (if still needed, might also need an update depending on its use) ---
// If you need to fetch full business data for all subdomains, you'd adjust this similarly.
// For now, keeping it simple as it was, assuming it's for a list where full details aren't needed.
// If you need full details, change its return type and include clause.
export async function getAllSubdomains(): Promise<{ subdomain: string; createdAt: number; }[]> {
  try {
    const businesses = await db.business.findMany({
      select: {
        subdomain: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    return businesses.map((business) => ({
      subdomain: business.subdomain,
      createdAt: business.createdAt.getTime(),
    }));
  } catch (error) {
    console.error('Error fetching all subdomains:', error);
    return [];
  }
}