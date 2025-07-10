import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

const categories = [
  { name: "Electronics", image: "/placeholder.svg?height=200&width=200", count: 45 },
  { name: "Fashion", image: "/placeholder.svg?height=200&width=200", count: 32 },
  { name: "Home & Garden", image: "/placeholder.svg?height=200&width=200", count: 28 },
  { name: "Sports", image: "/placeholder.svg?height=200&width=200", count: 19 },
  { name: "Books", image: "/placeholder.svg?height=200&width=200", count: 15 },
  { name: "Beauty", image: "/placeholder.svg?height=200&width=200", count: 22 },
]

export default function Categories() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse through our carefully curated categories to find exactly what you&apos;re looking for.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <Card key={index} className="group cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-4 text-center">
                <div className="relative mb-4">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    width={120}
                    height={120}
                    className="mx-auto rounded-full group-hover:scale-105 transition-transform"
                  />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count} items</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
