// app/subdomain/[subdomain]/page.tsx

import StoreClient from "@/components/store/store-client";
import { getSubdomainData } from '@/lib/sub-domain';
import { notFound } from 'next/navigation';

// Import Metadata type from Next.js
import type { Metadata } from 'next';

// Important: Import your Prisma types for accurate typing
import { Business as PrismaBusiness, Product as PrismaProduct, Image as PrismaImage } from '@prisma/client';


// --- Your Type Definitions (Keep these as they are) ---
interface TransformedProduct extends PrismaProduct {
  images: string[]; // Override the Prisma 'images' type to be an array of strings (URLs)
  originalPrice?: number;
  rating?: number;
  reviews?: number;
  badge?: string;
}

interface TransformedBusinessData extends PrismaBusiness {
  products: TransformedProduct[];
}

type Props = {
params: Promise<{ subdomain: string }>;
}
// --- Dynamic Metadata Generation Function (Already correct) ---
// This function is fine as it is, as its 'params' type { subdomain: string } is what
// Next.js expects for generateMetadata in current versions. The build error
// is NOT related to generateMetadata.
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { subdomain } =  await params;

  const business = await getSubdomainData(subdomain);

  if (!business) {
    return {
      title: 'Store Not Found - Ivie',
      description: 'The requested online store could not be found.',
    };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://your-default-app-domain.com';

  const absoluteBusinessImageUrl = business.businessImageUrl
    ? `${baseUrl}${business.businessImageUrl.startsWith('/') ? '' : '/'}${business.businessImageUrl}`
    : `${baseUrl}/placeholder-store-logo.png`;

  return {
    title: `${business.businessName} Online Store - Ivie`,
    description: business.businessDescription || `Visit the official online store of ${business.businessName} powered by Ivie. Browse products and make inquiries via WhatsApp.`,
    openGraph: {
      title: `${business.businessName} Online Store`,
      description: business.businessDescription || `Explore products and services from ${business.businessName}. Shop online with ease via Ivie.`,
      url: `${baseUrl}/subdomain/${subdomain}`,
      siteName: 'Ivie',
      images: [
        {
          url: absoluteBusinessImageUrl,
          width: 800,
          height: 600,
          alt: `${business.businessName} Logo`,
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${business.businessName} Online Store`,
      description: business.businessDescription || `Browse ${business.businessName}'s products and connect on WhatsApp.`,
      images: [absoluteBusinessImageUrl],
      creator: '@yourtwitterhandle',
    },
    keywords: [`${business.businessName}`, 'online store', 'e-commerce', 'shop', 'ivie', 'products', 'whatsapp shopping'],
    authors: [{ name: 'Ivie Team' }],
  };
}


// --- THE CRUCIAL CHANGE IS HERE FOR YOUR Page COMPONENT ---
// Define the Props type for the Page component as the Next.js internal type checker expects.
// This matches the problematic doc snippet you found.
type SubdomainPageProps = {
  params: Promise<{ subdomain: string }>;
  // Add searchParams if you're expecting them, even if not used right now
  // searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function SubdomainPage({ params }: SubdomainPageProps) {
  // Await params here, as its type is now Promise<{ subdomain: string }>
  const { subdomain } = await params;

  // 1. Fetch the raw business data including products and their images
  const business = await getSubdomainData(subdomain);

  console.log("This is the business object passed to the subdomain page: ", business);

  // If no business is found for this subdomain, show a 404 page
  if (!business) {
    notFound();
  }

  // 2. Perform the data transformation
  const transformedProducts: TransformedProduct[] = business.products.map(product => ({
    ...product,
    images: product.images.map((img: PrismaImage) => img.url),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    originalPrice: (product as any).originalPrice ?? undefined,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rating: (product as any).rating ?? undefined,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reviews: (product as any).reviews ?? undefined,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    badge: (product as any).badge ?? undefined,
  }));

  // Create the final transformed business object to pass down
  const transformedBusiness: TransformedBusinessData = {
    ...business,
    products: transformedProducts,
  };

  return (
    <StoreClient business={transformedBusiness} products={transformedBusiness.products} />
  );
}