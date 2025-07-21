"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StoreProduct } from "@/types/types";
import { Heart } from "lucide-react";
import Image from "next/image";
import WhatsappOrderButton from "./order-on-whatsapp";


interface ProductGridProps {
  products: StoreProduct[];
  number: string // <-- Add this prop definition
}

export default function ProductGrid({ products, number }: ProductGridProps) {
 
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              All Products
            </h2>
            <p className="text-gray-600">
              Explore our complete collection of quality products.
            </p>
          </div>
          <Button
            variant="outline"
            className="mt-4 md:mt-0 bg-transparent shadow-md"
          >
            View All Products Here
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <a href={`/products/${product.id}`} key={product.id}>
              <Card className="group hover:shadow-lg transition-shadow w-full">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <Image
                      src={
                        product.images && product.images.length > 0
                          ? product.images[0]
                          : "/placeholder.svg"
                      }
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

                    {/* <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(product.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-1">
                        {product.rating}
                      </span>
                    </div> */}

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900 px-2">
                        {new Intl.NumberFormat("en-NG", {
                          style: "currency",
                          currency: "NGN",
                          minimumFractionDigits: 0,
                          maximumFractionDigits: 0,
                        }).format(product.price)}
                      </span>
                      <WhatsappOrderButton
                        productName={product.name}
                        productPrice={product.price}
                        businessWhatsappNumber={number}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
