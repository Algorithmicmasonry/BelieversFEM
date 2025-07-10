import Image from "next/image"

interface HeroProps {
  businessName?: string
  businessLogo?: string
}

export default function Hero({ businessName = "Your Business", businessLogo }: HeroProps) {
  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="container mx-auto px-4 text-center">
        {businessLogo && (
          <div className="mb-8">
            <Image
              src={businessLogo || "/placeholder.svg"}
              alt={`${businessName} Logo`}
              width={120}
              height={120}
              className="mx-auto rounded-full shadow-lg"
            />
          </div>
        )}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Welcome to {businessName}</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">Discover our amazing collection of quality products</p>
      </div>
    </section>
  )
}
