import { Building, Phone, CreditCard, Globe, Bell, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

// Mock data
const mockBusiness = {
  businessName: "Fashion Hub",
  businessType: "fashion",
  subdomain: "fashion-hub",
  whatsappNumber: "+234 801 234 5678",
  bankAccountNumber: "1234567890",
  bankAccountName: "John Doe",
  bankCode: "058",
  settlementSchedule: "weekly",
  isActive: true,
}

const mockUser = {
  name: "John Doe",
  email: "john@example.com",
}

const businessTypes = [
  { value: "fashion", label: "Fashion & Clothing" },
  { value: "electronics", label: "Electronics" },
  { value: "food", label: "Food & Beverages" },
  { value: "beauty", label: "Beauty & Cosmetics" },
  { value: "home", label: "Home & Garden" },
  { value: "sports", label: "Sports & Fitness" },
  { value: "books", label: "Books & Media" },
  { value: "automotive", label: "Automotive" },
  { value: "health", label: "Health & Wellness" },
  { value: "other", label: "Other" },
]

const banks = [
  { code: "044", name: "Access Bank" },
  { code: "058", name: "Guaranty Trust Bank Plc" },
  { code: "033", name: "United Bank For Africa Plc" },
  { code: "057", name: "Zenith Bank Plc" },
  { code: "011", name: "First Bank of Nigeria Limited" },
  { code: "214", name: "First City Monument Bank Plc" },
]

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Settings</h2>
        <p className="text-gray-600">Manage your store and account settings</p>
      </div>

      <div className="grid gap-8">
        {/* Business Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="h-5 w-5 mr-2 text-orange-500" />
              Business Information
            </CardTitle>
            <CardDescription>Update your business details and store information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name</Label>
                <Input id="businessName" defaultValue={mockBusiness.businessName} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type</Label>
                <Select defaultValue={mockBusiness.businessType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {businessTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subdomain">Store URL</Label>
              <div className="flex">
                <Input id="subdomain" defaultValue={mockBusiness.subdomain} />
                <span className="inline-flex items-center px-3 text-sm text-gray-500 bg-gray-50 border border-l-0 rounded-r-md">
                  .ekki.com
                </span>
              </div>
              <p className="text-sm text-gray-500">Your store will be available at this URL</p>
            </div>

            <Button className="bg-orange-500 hover:bg-orange-600">Save Business Information</Button>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Phone className="h-5 w-5 mr-2 text-blue-500" />
              Contact Information
            </CardTitle>
            <CardDescription>Manage how customers can reach you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="whatsapp">WhatsApp Number</Label>
              <Input id="whatsapp" defaultValue={mockBusiness.whatsappNumber} />
              <p className="text-sm text-gray-500">Customers will use this number to contact you about orders</p>
            </div>

            <Button className="bg-blue-500 hover:bg-blue-600">Update Contact Information</Button>
          </CardContent>
        </Card>

        {/* Payment Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-green-500" />
              Payment Settings
            </CardTitle>
            <CardDescription>Manage your payment and banking information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bankName">Bank</Label>
                <Select defaultValue={mockBusiness.bankCode}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {banks.map((bank) => (
                      <SelectItem key={bank.code} value={bank.code}>
                        {bank.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="accountNumber">Account Number</Label>
                <Input id="accountNumber" defaultValue={mockBusiness.bankAccountNumber} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountName">Account Name</Label>
              <Input id="accountName" defaultValue={mockBusiness.bankAccountName} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="settlementSchedule">Settlement Schedule</Label>
              <Select defaultValue={mockBusiness.settlementSchedule}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Daily</SelectItem>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-sm text-gray-500">How often you want to receive payments</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border">
              <h4 className="font-medium text-gray-900 mb-2">Transaction Fees</h4>
              <p className="text-sm text-gray-600">
                A fee of 2.5% is charged on each successful transaction to cover payment processing costs.
              </p>
            </div>

            <Button className="bg-green-500 hover:bg-green-600">Update Payment Settings</Button>
          </CardContent>
        </Card>

        {/* Store Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="h-5 w-5 mr-2 text-purple-500" />
              Store Settings
            </CardTitle>
            <CardDescription>Control your store visibility and status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="storeActive">Store Status</Label>
                <p className="text-sm text-gray-500">
                  Your store is currently {mockBusiness.isActive ? "live and visible" : "hidden"} to customers
                </p>
              </div>
              <Switch id="storeActive" defaultChecked={mockBusiness.isActive} />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="allowOrders">Accept Orders</Label>
                <p className="text-sm text-gray-500">Allow customers to place orders through WhatsApp</p>
              </div>
              <Switch id="allowOrders" defaultChecked={true} />
            </div>

            <Button className="bg-purple-500 hover:bg-purple-600">Save Store Settings</Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2 text-yellow-500" />
              Notification Settings
            </CardTitle>
            <CardDescription>Choose how you want to be notified about store activity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="emailNotifications">Email Notifications</Label>
                <p className="text-sm text-gray-500">Receive email alerts for new orders and messages</p>
              </div>
              <Switch id="emailNotifications" defaultChecked={true} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="whatsappNotifications">WhatsApp Notifications</Label>
                <p className="text-sm text-gray-500">Get notified on WhatsApp for urgent matters</p>
              </div>
              <Switch id="whatsappNotifications" defaultChecked={false} />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="weeklyReports">Weekly Reports</Label>
                <p className="text-sm text-gray-500">Receive weekly performance summaries</p>
              </div>
              <Switch id="weeklyReports" defaultChecked={true} />
            </div>

            <Button className="bg-yellow-500 hover:bg-yellow-600">Save Notification Settings</Button>
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-red-500" />
              Account Settings
            </CardTitle>
            <CardDescription>Manage your personal account information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" defaultValue={mockUser.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" defaultValue={mockUser.email} />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Change Password</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button className="bg-blue-500 hover:bg-blue-600">Update Account</Button>
              <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent">
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
