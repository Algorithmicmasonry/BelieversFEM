import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { StoreProduct } from "@/types/types";

// import { S3ClientResolvedConfig } from "@aws-sdk/client-s3";

// IMPORTANT: If you are using Prisma, uncomment this and remove the manual interface below.
// import { Product as PrismaProduct } from "@prisma/client";

// If NOT using Prisma generated types (or as a temporary workaround until Prisma types are correctly imported):


interface FeaturedProductsProps {
  // Use PrismaProduct if imported, otherwise use the manual Product interface
  products: StoreProduct[];
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-primary max-w-2xl mx-auto">
            Discover our handpicked selection of premium products that our
            customers love most.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(
            (
              product // Make sure you are mapping over 'products' prop
            ) => (
              <Card
                key={product.id}
                className="group hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <Image
                      // Use product.images and handle potential empty array
                      src={
                        product.images && product.images.length > 0
                          ? product.images[0]
                          : "/placeholder.svg"
                      }
                      alt={product.name}
                      width={300}
                      height={300}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {/* Handle optional badge: only render if product.badge exists */}
                    {product.badge && (
                      <Badge className="absolute top-4 left-4 bg-red-500">
                        {product.badge}
                      </Badge>
                    )}
                    <Button
                      size="icon"
                      variant="secondary"
                      className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>

                    {/* Conditionally render rating/reviews if they exist */}
                    {product.rating !== undefined &&
                      product.reviews !== undefined && (
                        <div className="flex items-center mb-3">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(product.rating || 0) // Use fallback 0 for rating
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500 ml-2">
                            {product.rating} ({product.reviews} reviews)
                          </span>
                        </div>
                      )}

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-gray-900">
                          {new Intl.NumberFormat("en-NG", {
                            style: "currency",
                            currency: "NGN",
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(product.price)}
                        </span>
                      </div>
                    </div>

                    {/* Assuming you want to link to an individual product page */}
                    <Link href={`/products/${product.id}`}>
                      <Button className="w-full">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )
          )}
        </div>
      </div>
    </section>
  );
}
