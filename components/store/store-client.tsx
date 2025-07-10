import Header from "./Header" 
import Hero from "./Hero" 
import FeaturedProducts from "./featured-products" 
import Categories from "./categories" 
import ProductGrid from "./product-grid" 
import Newsletter from "./Newsletter"
import Footer from "./Footer" 

export default function StoreClient() {
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
