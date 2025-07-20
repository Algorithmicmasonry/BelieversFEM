import StoreClient from "@/components/store/store-client";
import { getSubdomainData } from '@/lib/sub-domain';
import { notFound } from 'next/navigation';
import { Business as PrismaBusiness, Product as PrismaProduct, Image as PrismaImage } from '@prisma/client';

interface SubdomainPageProps {
  params: {
    subdomain: string; // The subdomain captured from the URL (e.g., "tenant1")
  };
}

interface TransformedProduct extends PrismaProduct {
  // Override the Prisma 'images' type to be an array of strings (URLs)
  images: string[];
  // Add any other optional fields that your UI expects but might not be
  // directly present in the base PrismaProduct, or are optional in your schema.
  originalPrice?: number;
  rating?: number;
  reviews?: number;
  badge?: string;
}

interface TransformedBusinessData extends PrismaBusiness {
  products: TransformedProduct[];
}




export default async function SubdomainPage({ params }: { params: { subdomain: string } }) {
  const { subdomain } = await params;

  // 1. Fetch the raw business data including products and their images
  const business = await getSubdomainData(subdomain);

  console.log("This is the business object passed to the subdomain page: ", business);

  // If no business is found for this subdomain, show a 404 page
  if (!business) {
    notFound();
  }

  // 2. Perform the data transformation
  // This maps over the products and converts the `Image[]` relation into `string[]` of URLs
  const transformedProducts: TransformedProduct[] = business.products.map(product => ({
    ...product,
    // Safely map image objects to their URLs.
    // Ensure `img.url` is what actually holds your image path.
    images: product.images.map((img: PrismaImage) => img.url),
    // You might also add placeholder/default values for optional UI-only fields here
    // if they are not coming from your Prisma query or DB.
    // e.g., rating: 0,
    // e.g., reviews: 0,
    // e.g., badge: "New",
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