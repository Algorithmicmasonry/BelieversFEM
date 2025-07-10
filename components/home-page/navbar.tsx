import Logo from '@/global/logo'
import Link from 'next/link'
import { Button } from '../ui/button'

const Navbar = () => {
  return (
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Logo/>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-gray-600 hover:text-orange-500">
              Features
            </Link>
            <Link href="#pricing" className="text-gray-600 hover:text-orange-500">
              Pricing
            </Link>
            <Link href="#contact" className="text-gray-600 hover:text-orange-500">
              Contact
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="text-gray-600">
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>
  )
}

export default Navbar