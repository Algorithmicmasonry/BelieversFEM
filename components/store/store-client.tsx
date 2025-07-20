import { Business as PrismaBusiness, Product as PrismaProduct } from '@prisma/client'
import Footer from "./Footer"
import Header from "./Header"
import Hero from "./Hero"
import Newsletter from "./Newsletter"
import FeaturedProducts from "./featured-products"
import ProductGrid from "./product-grid"

interface TransformedProduct extends PrismaProduct {
  images: string[];
  originalPrice?: number;
  rating?: number;
  reviews?: number;
  badge?: string;
}

interface TransformedBusinessData extends PrismaBusiness {
  products: TransformedProduct[];
}


// 1. Define the props interface for StoreClient
interface StoreClientProps {
  business: TransformedBusinessData; // Now expects the transformed business data
  products: TransformedProduct[];    // Now expects the transformed products
}


export default function StoreClient({ business, products }: StoreClientProps) {

  console.log("this is the product passed to the store client: ", products);
  return (
    <div className="min-h-screen bg-white">
      <Header businessName={business.businessName} />
      <Hero businessName={business.businessName} businessLogo={business.businessImageUrl} />
      {/* <Categories /> */}
       <FeaturedProducts products={products}/>
      <ProductGrid products={products} number={business.whatsappNumber}/>
      <Newsletter  number={business.whatsappNumber}/>
      <Footer business={business}/>
    </div>
  )
}
