import StoreClient from "@/components/store/store-client"

export default async function StorePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <div>My Post: {slug}
  <StoreClient/>
  </div>
}