import { Eye, MessageCircle, TrendingUp, Package, Calendar, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock data
const mockAnalytics = {
  totalViews: 92,
  totalClicks: 23,
  totalProducts: 3,
  conversionRate: 25,
  monthlyGrowth: 12,
  weeklyViews: 34,
}

const mockProducts = [
  {
    id: "1",
    name: "Premium Cotton T-Shirt",
    price: 5500,
    views: 45,
    whatsappClicks: 12,
    conversionRate: 27,
  },
  {
    id: "2",
    name: "Denim Jeans",
    price: 12000,
    views: 32,
    whatsappClicks: 8,
    conversionRate: 25,
  },
  {
    id: "3",
    name: "Running Sneakers",
    price: 18000,
    views: 15,
    whatsappClicks: 3,
    conversionRate: 20,
  },
]

const mockTimelineData = [
  { date: "2024-01-01", views: 12, clicks: 3 },
  { date: "2024-01-02", views: 18, clicks: 5 },
  { date: "2024-01-03", views: 15, clicks: 4 },
  { date: "2024-01-04", views: 22, clicks: 6 },
  { date: "2024-01-05", views: 25, clicks: 5 },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Analytics</h2>
        <p className="text-gray-600">Track your store performance and customer engagement</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-blue-100">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-blue-600 flex items-center">
              <Eye className="h-4 w-4 mr-2" />
              Total Store Views
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{mockAnalytics.totalViews}</div>
            <p className="text-sm text-gray-500 mt-1">+{mockAnalytics.monthlyGrowth}% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-green-100">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-green-600 flex items-center">
              <MessageCircle className="h-4 w-4 mr-2" />
              WhatsApp Inquiries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{mockAnalytics.totalClicks}</div>
            <p className="text-sm text-gray-500 mt-1">+8% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-orange-100">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-orange-600 flex items-center">
              <Package className="h-4 w-4 mr-2" />
              Active Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">{mockAnalytics.totalProducts}</div>
            <p className="text-sm text-gray-500 mt-1">Ready for customers</p>
          </CardContent>
        </Card>

        <Card className="border-purple-100">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-purple-600 flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              Conversion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">{mockAnalytics.conversionRate}%</div>
            <p className="text-sm text-gray-500 mt-1">Views to inquiries</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-blue-500" />
              Recent Activity
            </CardTitle>
            <CardDescription>Your store activity over the past week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockTimelineData.map((day) => (
                <div key={day.date} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">
                      {new Date(day.date).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="flex items-center text-blue-600">
                      <Eye className="h-4 w-4 mr-1" />
                      {day.views}
                    </span>
                    <span className="flex items-center text-green-600">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {day.clicks}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-green-500" />
              Customer Insights
            </CardTitle>
            <CardDescription>Understanding your customer behavior</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Peak Activity Time</p>
                  <p className="text-xs text-gray-500">When customers visit most</p>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-200">
                  2:00 PM - 6:00 PM
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Most Popular Day</p>
                  <p className="text-xs text-gray-500">Highest traffic day</p>
                </div>
                <Badge variant="outline" className="text-blue-600 border-blue-200">
                  Saturday
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Average Session</p>
                  <p className="text-xs text-gray-500">Time spent on store</p>
                </div>
                <Badge variant="outline" className="text-orange-600 border-orange-200">
                  2m 34s
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Product Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Product Performance</CardTitle>
          <CardDescription>How your individual products are performing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockProducts.map((product, index) => (
              <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium">{product.name}</h3>
                  <p className="text-sm text-gray-500">₦{product.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center space-x-6 text-sm">
                  <div className="text-center">
                    <div className="font-medium text-blue-600">{product.views}</div>
                    <div className="text-gray-500">Views</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-green-600">{product.whatsappClicks}</div>
                    <div className="text-gray-500">Clicks</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-purple-600">{product.conversionRate}%</div>
                    <div className="text-gray-500">Rate</div>
                  </div>
                  <Badge variant={index === 0 ? "default" : "secondary"}>
                    {index === 0 ? "Top Performer" : "Good"}
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
