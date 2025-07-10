"use client"

import { useState } from "react"
import { Search, ShoppingCart, Menu, X, User, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartCount] = useState(3)

  const router = useRouter()

  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      {/* Top bar */}
      <div className="bg-gray-900 text-white py-2 px-4 text-center text-sm">
        Free shipping on orders over $50 • Use code: FREESHIP
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">StyleHub</h1>
          </div>

          {/* Search bar - hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input type="search" placeholder="Search products..." className="pl-10 pr-4 w-full" />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative" onClick={() => router.push("/cart")}>
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input type="search" placeholder="Search products..." className="pl-10 pr-4 w-full" />
          </div>
        </div>

        {/* Navigation */}
        <nav className={`${isMenuOpen ? "block" : "hidden"} md:block mt-4`}>
          <ul className="flex flex-col md:flex-row md:justify-center space-y-2 md:space-y-0 md:space-x-8">
            <li>
              <a href="#" className="block py-2 text-gray-700 hover:text-gray-900 font-medium">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 text-gray-700 hover:text-gray-900 font-medium">
                Shop All
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 text-gray-700 hover:text-gray-900 font-medium">
                Categories
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 text-gray-700 hover:text-gray-900 font-medium">
                Sale
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 text-gray-700 hover:text-gray-900 font-medium">
                About
              </a>
            </li>
            <li>
              <a href="#" className="block py-2 text-gray-700 hover:text-gray-900 font-medium">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
