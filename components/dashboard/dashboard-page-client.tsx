import Link from "next/link"
import { Eye, MessageCircle, TrendingUp, Package, Plus, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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
  },
  {
    id: "2",
    name: "Denim Jeans",
    description: "Classic fit denim jeans for everyday wear",
    price: 12000,
    isActive: true,
    views: 32,
    whatsappClicks: 8,
  },
  {
    id: "3",
    name: "Sneakers",
    description: "Comfortable running sneakers",
    price: 18000,
    isActive: false,
    views: 15,
    whatsappClicks: 3,
  },
]

const mockAnalytics = {
  totalViews: 92,
  totalClicks: 23,
  totalProducts: 3,
  conversionRate: 25,
}

export default function DashboardOverview() {
  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back!</h2>
        <p className="text-gray-600">{"Here's what's happening with your store today."}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-blue-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{mockAnalytics.totalViews}</div>
            <p className="text-xs text-gray-500">Store visits this month</p>
          </CardContent>
        </Card>

        <Card className="border-green-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">WhatsApp Clicks</CardTitle>
            <MessageCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{mockAnalytics.totalClicks}</div>
            <p className="text-xs text-gray-500">Customer inquiries</p>
          </CardContent>
        </Card>

        <Card className="border-orange-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{mockAnalytics.totalProducts}</div>
            <p className="text-xs text-gray-500">Active products</p>
          </CardContent>
        </Card>

        <Card className="border-purple-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{mockAnalytics.conversionRate}%</div>
            <p className="text-xs text-gray-500">Views to inquiries</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-orange-100 hover:shadow-md transition-shadow cursor-pointer">
          <Link href="/dashboard/products/new">
            <CardHeader>
              <CardTitle className="flex items-center text-orange-600">
                <Plus className="h-5 w-5 mr-2" />
                Add New Product
              </CardTitle>
              <CardDescription>Add a new product to your store catalog</CardDescription>
            </CardHeader>
          </Link>
        </Card>

        <Card className="border-blue-100 hover:shadow-md transition-shadow cursor-pointer">
          <Link href="/dashboard/analytics">
            <CardHeader>
              <CardTitle className="flex items-center text-blue-600">
                <TrendingUp className="h-5 w-5 mr-2" />
                View Analytics
              </CardTitle>
              <CardDescription>Check your store performance and metrics</CardDescription>
            </CardHeader>
          </Link>
        </Card>

        <Card className="border-green-100 hover:shadow-md transition-shadow cursor-pointer">
          <Link href="/dashboard/messages">
            <CardHeader>
              <CardTitle className="flex items-center text-green-600">
                <MessageCircle className="h-5 w-5 mr-2" />
                Customer Messages
              </CardTitle>
              <CardDescription>View and manage customer inquiries</CardDescription>
            </CardHeader>
          </Link>
        </Card>
      </div>

      {/* Recent Products */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Products</CardTitle>
            <CardDescription>Your latest product additions</CardDescription>
          </div>
          <Link href="/dashboard/products">
            <Button variant="outline" size="sm">
              View All
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockProducts.slice(0, 3).map((product) => (
              <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-gray-500">₦{product.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{product.views} views</span>
                  <span>{product.whatsappClicks} clicks</span>
                  <Badge variant={product.isActive ? "default" : "secondary"}>
                    {product.isActive ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
