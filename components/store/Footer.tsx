import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react"
import Link from 'next/link'; // Import Link for internal routing
import { Business } from '@prisma/client'

interface FooterProps {
  business: Business
}

export default function Footer({ business }: FooterProps) {
  const currentYear = new Date().getFullYear(); // Get the current year
  const url = process.env.NEXT_PUBLIC_AUTH_BASE_URL || ""

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{business.businessName}</h3>
            <p className="text-gray-300 mb-4">
              {business.businessDescription}
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 cursor-pointer hover:text-blue-400 transition-colors" />
              <Twitter className="h-5 w-5 cursor-pointer hover:text-blue-400 transition-colors" />
              <Instagram className="h-5 w-5 cursor-pointer hover:text-pink-400 transition-colors" />
              <Youtube className="h-5 w-5 cursor-pointer hover:text-red-400 transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Shop All
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Categories
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Sale
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Returns
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Size Guide
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>{business.whatsappNumber}</span>
              </div>
              {/* If you have business email or address from the business object, you can add them here */}
              {/* <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>{business.email}</span>
              </div> */}
              {/* <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{business.address}</span>
              </div> */}
            </div>
          </div>
        </div>

        {/* Dynamic Copyright and "Built with Ivie" Section */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 w-full">
          <p>
            &copy; {currentYear} {business.businessName}. All rights reserved. | Privacy Policy | Terms of Service
          </p>
          <div className="mt-2 text-sm">
            Built with{' '}
            <Link href={url} className="underline hover:text-white transition-colors" target="_blank">
              Ivie
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}