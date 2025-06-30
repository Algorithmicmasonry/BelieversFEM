import Link from "next/link"
import { Plus, Edit, Trash2, MoreHorizontal, Eye, MessageCircle, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data
const mockProducts = [
  {
    id: "1",
    name: "Premium Cotton T-Shirt",
    description: "High-quality cotton t-shirt available in multiple colors",
    price: 5500,
    isActive: true,
    views: 45,
    whatsappClicks: 12,
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "2",
    name: "Denim Jeans",
    description: "Classic fit denim jeans for everyday wear",
    price: 12000,
    isActive: true,
    views: 32,
    whatsappClicks: 8,
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "3",
    name: "Running Sneakers",
    description: "Comfortable running sneakers with excellent cushioning",
    price: 18000,
    isActive: false,
    views: 15,
    whatsappClicks: 3,
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "4",
    name: "Casual Hoodie",
    description: "Warm and comfortable hoodie perfect for cool weather",
    price: 8500,
    isActive: true,
    views: 28,
    whatsappClicks: 7,
    imageUrl: "/placeholder.svg?height=100&width=100",
  },
]

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Products</h2>
          <p className="text-gray-600">Manage your product catalog</p>
        </div>
        <Link href="/dashboard/products/new">
          <Button className="bg-orange-500 hover:bg-orange-600">
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </Link>
      </div>

      {/* Products Grid */}
      <div className="grid gap-6">
        {mockProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                {/* Product Image */}
                <div className="flex-shrink-0">
                  <img
                    src={product.imageUrl || "/placeholder.svg"}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg border"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">{product.name}</h3>
                        <Badge variant={product.isActive ? "default" : "secondary"}>
                          {product.isActive ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <p className="text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                      <div className="flex items-center space-x-6 text-sm">
                        <span className="font-medium text-lg text-gray-900">₦{product.price.toLocaleString()}</span>
                        <span className="flex items-center text-gray-500">
                          <Eye className="h-4 w-4 mr-1" />
                          {product.views} views
                        </span>
                        <span className="flex items-center text-gray-500">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {product.whatsappClicks} clicks
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Product
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Product
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {mockProducts.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products yet</h3>
            <p className="text-gray-500 mb-6">Get started by adding your first product to your store.</p>
            <Link href="/dashboard/products/new">
              <Button className="bg-orange-500 hover:bg-orange-600">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Product
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
