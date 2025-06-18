"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, User, Menu, X, Search, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/context/CartContext"
import { useAuth } from "@/context/AuthContext"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { cartItems } = useCart()
  const { user, logout } = useAuth()

  const navigation = [
    { name: "T-Shirts", href: "/products?category=t-shirts" },
    { name: "Packaging", href: "/products?category=packaging" },
    { name: "Bulk Orders", href: "/bulk-orders" },
    { name: "Custom Design", href: "/design-studio" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-2 text-xs sm:text-sm border-b">
          <div className="flex items-center space-x-2 sm:space-x-4 text-gray-600">
            <div className="hidden sm:flex items-center space-x-1">
              <Phone className="w-3 h-3" />
              <span>+233 XX XXX XXXX</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-3 h-3" />
              <span className="hidden xs:inline">Serving All Ghana 🇬🇭</span>
              <span className="xs:hidden">Ghana 🇬🇭</span>
            </div>
          </div>
          <div className="hidden sm:flex items-center space-x-4">
            <span className="text-orange-600 font-semibold text-xs sm:text-sm">Free Delivery on Orders Above GH₵200</span>
          </div>
        </div>

        {/* Main header */}
        <div className="flex items-center justify-between py-3 sm:py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg sm:text-xl">P</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">Permanent Printing Press</h1>
              <p className="text-xs text-gray-600">Speed Meets Quality - Ghana 🇬🇭</p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-sm font-bold text-gray-900">PPP Ghana</h1>
              <p className="text-xs text-gray-600">Speed Meets Quality</p>
            </div>
          </Link>

          {/* Search bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-md mx-4 lg:mx-8">
            <div className="relative w-full">
              <Input type="text" placeholder="Search products..." className="pl-10 pr-4 py-2 w-full" />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* User account */}
            <div className="hidden md:flex items-center space-x-2">
              {user ? (
                <div className="flex items-center space-x-2">
                  <span className="text-sm">Hello, {user.name}</span>
                  <Button variant="ghost" size="sm" onClick={logout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                    <User className="w-4 h-4" />
                    <span>Login</span>
                  </Button>
                </Link>
              )}
            </div>

            {/* Cart */}
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="sm" className="flex items-center space-x-1">
                <ShoppingCart className="w-4 h-5 sm:w-5 sm:h-5" />
                {cartItems.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-orange-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                    {cartItems.length}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Mobile menu button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 py-3 border-t">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-gray-700 hover:text-orange-600 font-medium transition-colors text-sm lg:text-base"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="container mx-auto px-4 py-4">
            {/* Mobile search */}
            <div className="mb-4">
              <div className="relative">
                <Input type="text" placeholder="Search products..." className="pl-10 pr-4 py-2 w-full" />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
            </div>

            {/* Mobile navigation */}
            <nav className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-gray-700 hover:text-orange-600 font-medium py-2 px-2 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Mobile auth */}
            <div className="mt-4 pt-4 border-t">
              {user ? (
                <div className="space-y-2">
                  <p className="text-sm px-2">Hello, {user.name}</p>
                  <Button variant="outline" size="sm" onClick={logout} className="w-full">
                    Logout
                  </Button>
                </div>
              ) : (
                <Link href="/auth/login">
                  <Button variant="outline" size="sm" className="w-full">
                    Login / Register
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile delivery info */}
            <div className="mt-4 pt-4 border-t">
              <div className="text-center text-sm text-orange-600 font-semibold">
                Free Delivery on Orders Above GH₵200
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
