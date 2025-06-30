import { Users, MessageCircle, Eye, Calendar } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Mock data
const mockCustomers = [
  {
    id: "1",
    name: "Anonymous Customer",
    location: "Lagos, Nigeria",
    lastVisit: "2024-01-15T10:30:00Z",
    totalViews: 5,
    inquiries: 2,
    interestedProducts: ["Premium Cotton T-Shirt", "Denim Jeans"],
  },
  {
    id: "2",
    name: "Anonymous Customer",
    location: "Abuja, Nigeria",
    lastVisit: "2024-01-14T15:45:00Z",
    totalViews: 3,
    inquiries: 1,
    interestedProducts: ["Running Sneakers"],
  },
  {
    id: "3",
    name: "Anonymous Customer",
    location: "Port Harcourt, Nigeria",
    lastVisit: "2024-01-13T09:20:00Z",
    totalViews: 8,
    inquiries: 3,
    interestedProducts: ["Premium Cotton T-Shirt", "Casual Hoodie", "Denim Jeans"],
  },
]

const mockStats = {
  totalVisitors: 45,
  returningVisitors: 12,
  newVisitors: 33,
  averageSessionTime: "2m 34s",
}

export default function CustomersPage() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Customers</h2>
        <p className="text-gray-600">Track visitor behavior and customer interactions</p>
      </div>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-blue-100">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-blue-600 flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Total Visitors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{mockStats.totalVisitors}</div>
            <p className="text-sm text-gray-500 mt-1">This month</p>
          </CardContent>
        </Card>

        <Card className="border-green-100">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-green-600 flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Returning Visitors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{mockStats.returningVisitors}</div>
            <p className="text-sm text-gray-500 mt-1">
              {Math.round((mockStats.returningVisitors / mockStats.totalVisitors) * 100)}% of total
            </p>
          </CardContent>
        </Card>

        <Card className="border-orange-100">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-orange-600 flex items-center">
              <Users className="h-4 w-4 mr-2" />
              New Visitors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">{mockStats.newVisitors}</div>
            <p className="text-sm text-gray-500 mt-1">
              {Math.round((mockStats.newVisitors / mockStats.totalVisitors) * 100)}% of total
            </p>
          </CardContent>
        </Card>

        <Card className="border-purple-100">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-purple-600 flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Avg. Session Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">{mockStats.averageSessionTime}</div>
            <p className="text-sm text-gray-500 mt-1">Time on store</p>
          </CardContent>
        </Card>
      </div>

      {/* Customer Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Customer Activity</CardTitle>
          <CardDescription>Anonymous visitor data and interactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {mockCustomers.map((customer) => (
              <div key={customer.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-orange-100 text-orange-600">{customer.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-gray-900">{customer.name}</h3>
                      <p className="text-sm text-gray-500">{customer.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Last visit</p>
                      <p className="text-sm font-medium">{formatDate(customer.lastVisit)}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 mb-3 text-sm">
                    <span className="flex items-center text-blue-600">
                      <Eye className="h-4 w-4 mr-1" />
                      {customer.totalViews} views
                    </span>
                    <span className="flex items-center text-green-600">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {customer.inquiries} inquiries
                    </span>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600 mb-2">Interested in:</p>
                    <div className="flex flex-wrap gap-2">
                      {customer.interestedProducts.map((product, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {product}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Customer Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Popular Locations</CardTitle>
            <CardDescription>Where your customers are visiting from</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Lagos, Nigeria</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                  </div>
                  <span className="text-sm text-gray-500">60%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Abuja, Nigeria</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "25%" }}></div>
                  </div>
                  <span className="text-sm text-gray-500">25%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Port Harcourt, Nigeria</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{ width: "15%" }}></div>
                  </div>
                  <span className="text-sm text-gray-500">15%</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Behavior</CardTitle>
            <CardDescription>Understanding how customers interact with your store</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Most Viewed Product</p>
                  <p className="text-xs text-gray-500">Customer favorite</p>
                </div>
                <Badge variant="outline" className="text-blue-600 border-blue-200">
                  Premium T-Shirt
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Highest Inquiry Rate</p>
                  <p className="text-xs text-gray-500">Most contacted about</p>
                </div>
                <Badge variant="outline" className="text-green-600 border-green-200">
                  Denim Jeans
                </Badge>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium">Peak Activity</p>
                  <p className="text-xs text-gray-500">Busiest time</p>
                </div>
                <Badge variant="outline" className="text-orange-600 border-orange-200">
                  2:00 PM - 6:00 PM
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
