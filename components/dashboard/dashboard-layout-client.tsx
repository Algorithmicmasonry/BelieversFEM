"use client"

import type React from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Logo from "@/global/logo"
import { cn } from "@/lib/utils"
import {
  BarChart3,
  Copy,
  ExternalLink,
  Home,
  Menu,
  MessageCircle,
  Package,
  Settings,
  Users,
  X
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

// Mock data
const mockUser = {
  name: "John Doe",
  email: "john@example.com",
  avatar: "/placeholder.svg?height=40&width=40",
}

const mockBusiness = {
  name: "Fashion Hub",
  subdomain: "fashion-hub",
  whatsappNumber: "+234 801 234 5678",
  isActive: true,
  createdAt: "2024-01-15",
}

const sidebarItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Products",
    href: "/dashboard/products",
    icon: Package,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
  },
  {
    title: "Customers",
    href: "/dashboard/customers",
    icon: Users,
  },
  {
    title: "Messages",
    href: "/dashboard/messages",
    icon: MessageCircle,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
]

export default function DashboardLayoutClient({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  const copyStoreLink = () => {
    navigator.clipboard.writeText(`https://${mockBusiness.subdomain}.ekii.com`)
    // You would show a toast notification here
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center space-x-2">
             <Logo/>
            </div>
            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Business Info */}
          <div className="p-4 border-b bg-orange-50">
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900 truncate">{mockBusiness.name}</h3>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="text-green-600 border-green-200 text-xs">
                  Store Active
                </Badge>
              </div>
              <div className="flex items-center space-x-1">
                <code className="text-xs text-gray-600 truncate">{mockBusiness.subdomain}.ekii.com</code>
                <Button onClick={copyStoreLink} variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive ? "bg-orange-100 text-orange-700" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              )
            })}
          </nav>

          {/* Quick Actions */}
          <div className="p-4 border-t space-y-2">
            <Link href={`https://${mockBusiness.subdomain}.ekii.com`} target="_blank">
              <Button size="sm" className="w-full bg-orange-500 hover:bg-orange-600">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Store
              </Button>
            </Link>
          </div>

          {/* User Menu */}
          <div className="p-4 border-t">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-start p-2">
                  <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage src={mockUser.avatar || "/placeholder.svg"} alt={mockUser.name} />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-gray-900 truncate">{mockUser.name}</p>
                    <p className="text-xs text-gray-500 truncate">{mockUser.email}</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white border-b px-4 py-3 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">
                  {sidebarItems.find((item) => item.href === pathname)?.title || "Dashboard"}
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button
                onClick={copyStoreLink}
                variant="outline"
                size="sm"
                className="hidden md:flex border-orange-200 text-orange-600 hover:bg-orange-50 bg-transparent"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Store Link
              </Button>

              <Link href={`https://${mockBusiness.subdomain}.ekii.com`} target="_blank">
                <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">View Store</span>
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">{children}</main>
      </div>
    </div>
  )
}
