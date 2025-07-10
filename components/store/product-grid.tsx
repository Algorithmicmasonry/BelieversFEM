"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Heart } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Minimalist Desk Lamp",
    price: 89.99,
    rating: 4.5,
    image: "/placeholder.svg?height=250&width=250",
  },
  {
    id: 2,
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    rating: 4.7,
    image: "/placeholder.svg?height=250&width=250",
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 79.99,
    rating: 4.4,
    image: "/placeholder.svg?height=250&width=250",
  },
  {
    id: 4,
    name: "Ceramic Coffee Mug",
    price: 19.99,
    rating: 4.8,
    image: "/placeholder.svg?height=250&width=250",
  },
  {
    id: 5,
    name: "Leather Wallet",
    price: 49.99,
    rating: 4.6,
    image: "/placeholder.svg?height=250&width=250",
  },
  {
    id: 6,
    name: "Yoga Mat",
    price: 39.99,
    rating: 4.9,
    image: "/placeholder.svg?height=250&width=250",
  },
  {
    id: 7,
    name: "Stainless Steel Bottle",
    price: 34.99,
    rating: 4.5,
    image: "/placeholder.svg?height=250&width=250",
  },
  {
    id: 8,
    name: "Wireless Mouse",
    price: 59.99,
    rating: 4.3,
    image: "/placeholder.svg?height=250&width=250",
  },
]

export default function ProductGrid() {
  const router = useRouter()
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">All Products</h2>
            <p className="text-gray-600">Explore our complete collection of quality products.</p>
          </div>
          <Button variant="outline" className="mt-4 md:mt-0 bg-transparent" onClick={() => router.push("/products")}>
            View All Products
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <a href={`/products/${product.id}`} key={product.id}>
              <Card className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={250}
                      height={250}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>

                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-1">{product.rating}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">${product.price}</span>
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation() // prevent the outer Link from triggering
                          router.push("/cart") // navigate to the cart page
                        }}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
