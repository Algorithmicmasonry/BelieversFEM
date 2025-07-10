import { MessageCircle, Phone, Clock, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

// Mock data
const mockMessages = [
  {
    id: "1",
    customerName: "Anonymous Customer",
    productName: "Premium Cotton T-Shirt",
    productPrice: 5500,
    message: "Hi! I'm interested in Premium Cotton T-Shirt - ₦5,500. Is it available?",
    timestamp: "2024-01-15T10:30:00Z",
    status: "new",
    location: "Lagos, Nigeria",
  },
  {
    id: "2",
    customerName: "Anonymous Customer",
    productName: "Denim Jeans",
    productPrice: 12000,
    message: "Hi! I'm interested in Denim Jeans - ₦12,000. What sizes do you have available?",
    timestamp: "2024-01-14T15:45:00Z",
    status: "responded",
    location: "Abuja, Nigeria",
  },
  {
    id: "3",
    customerName: "Anonymous Customer",
    productName: "Running Sneakers",
    productPrice: 18000,
    message: "Hi! I'm interested in Running Sneakers - ₦18,000. Can I see more pictures?",
    timestamp: "2024-01-13T09:20:00Z",
    status: "new",
    location: "Port Harcourt, Nigeria",
  },
  {
    id: "4",
    customerName: "Anonymous Customer",
    productName: "General Inquiry",
    productPrice: 0,
    message: "Hi! I'd like to know more about your products at Fashion Hub.",
    timestamp: "2024-01-12T14:15:00Z",
    status: "responded",
    location: "Kano, Nigeria",
  },
]

const mockStats = {
  totalMessages: 23,
  newMessages: 8,
  respondedMessages: 15,
  responseRate: 65,
}

export default function MessagesPage() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) {
      return "Just now"
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`
    } else {
      const diffInDays = Math.floor(diffInHours / 24)
      return `${diffInDays}d ago`
    }
  }

  const generateWhatsAppUrl = (message: string) => {
    const phoneNumber = "+2348012345678" // This would come from your business settings
    return `https://wa.me/${phoneNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Messages</h2>
        <p className="text-gray-600">Manage customer inquiries and WhatsApp conversations</p>
      </div>

      {/* Message Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-blue-100">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-blue-600 flex items-center">
              <MessageCircle className="h-4 w-4 mr-2" />
              Total Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">{mockStats.totalMessages}</div>
            <p className="text-sm text-gray-500 mt-1">All time</p>
          </CardContent>
        </Card>

        <Card className="border-orange-100">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-orange-600 flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              New Messages
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-orange-600">{mockStats.newMessages}</div>
            <p className="text-sm text-gray-500 mt-1">Awaiting response</p>
          </CardContent>
        </Card>

        <Card className="border-green-100">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-green-600 flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Responded
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">{mockStats.respondedMessages}</div>
            <p className="text-sm text-gray-500 mt-1">Messages handled</p>
          </CardContent>
        </Card>

        <Card className="border-purple-100">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-purple-600 flex items-center">
              <Phone className="h-4 w-4 mr-2" />
              Response Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">{mockStats.responseRate}%</div>
            <p className="text-sm text-gray-500 mt-1">Customer satisfaction</p>
          </CardContent>
        </Card>
      </div>

      {/* Messages List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Customer Messages</CardTitle>
          <CardDescription>WhatsApp inquiries from your store visitors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {mockMessages.map((message) => (
              <div key={message.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {message.customerName.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-gray-900">{message.customerName}</h3>
                      <p className="text-sm text-gray-500">{message.location}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={message.status === "new" ? "destructive" : "default"}>
                        {message.status === "new" ? "New" : "Responded"}
                      </Badge>
                      <span className="text-sm text-gray-500">{formatDate(message.timestamp)}</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-medium text-gray-700">Product:</span>
                      <span className="text-sm text-gray-900">{message.productName}</span>
                      {message.productPrice > 0 && (
                        <Badge variant="outline" className="text-xs">
                          ₦{message.productPrice.toLocaleString()}
                        </Badge>
                      )}
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-700">{message.message}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <a href={generateWhatsAppUrl(message.message)} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" className="bg-green-500 hover:bg-green-600">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Reply on WhatsApp
                      </Button>
                    </a>
                    <Button variant="outline" size="sm">
                      Mark as Responded
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* WhatsApp Integration Info */}
      <Card className="border-green-100">
        <CardHeader>
          <CardTitle className="flex items-center text-green-700">
            <MessageCircle className="h-5 w-5 mr-2" />
            WhatsApp Integration
          </CardTitle>
          <CardDescription>How customer messages work with your store</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">How it works:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Customers click &quot;Order Now&quot; on your products</li>
                <li>• Pre-filled WhatsApp messages are generated</li>
                <li>• Messages include product name and price</li>
                <li>• You receive notifications here and on WhatsApp</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Best practices:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Respond quickly to maintain customer interest</li>
                <li>• Ask follow-up questions about size, color, etc.</li>
                <li>• Share additional product photos if requested</li>
                <li>• Provide clear payment and delivery information</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
