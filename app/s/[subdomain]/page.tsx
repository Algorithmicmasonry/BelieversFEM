import StoreClient from "@/components/store/store-client";
import { getSubdomainData } from '@/lib/sub-domain';
import { notFound } from 'next/navigation';

interface SubdomainPageProps {
  params: {
    subdomain: string; // The subdomain captured from the URL (e.g., "tenant1")
  };
}


export default async function SubdomainPage({ params }: SubdomainPageProps) {
  // Await params to destructure it, as per the docs example
  const { subdomain } = await params;

  // Fetch the Business data using your lib/subdomain.ts function
  // Assuming getSubdomainData is updated to return FullBusinessData (Business + Products)
  const business = await getSubdomainData(subdomain);
  console.log("This is the business object passed to the subdomain page: ", business)

  // If no business is found for this subdomain, show a 404 page
  if (!business) {
    notFound();
  }

  // business now contains products due to the `include` in getSubdomainData
  return (
    <StoreClient business={business} products={business.products} />
  );
}