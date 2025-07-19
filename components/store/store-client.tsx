import Header from "./Header" 
import Hero from "./Hero" 
import FeaturedProducts from "./featured-products" 
import Categories from "./categories" 
import ProductGrid from "./product-grid" 
import Newsletter from "./Newsletter"
import Footer from "./Footer" 
import { Business, Product, Image as PrismaImage } from '@prisma/client';

// 1. Define the props interface for StoreClient
interface StoreClientProps {
  business: Business; // The full Business object from Prisma
  products: (Product & { images: PrismaImage[] })[]; // Array of Products, each including its images
}


export default function StoreClient({ business, products }: StoreClientProps) {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero businessName="StyleHub" businessLogo="/placeholder.svg?height=120&width=120" />
      <Categories />
      <FeaturedProducts />
      <ProductGrid />
      <Newsletter />
      <Footer />
    </div>
  )
}
