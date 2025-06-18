"use client";

import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowRight, Send, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8">
          {/* Company Info */}
          <div className="sm:col-span-2 space-y-4 sm:space-y-6">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-3 bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                Permanent Printing Press
              </h3>
              <p className="text-orange-400 font-semibold text-base sm:text-lg mb-3 sm:mb-4">Speed Meets Quality</p>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm sm:text-lg">
              Modern printing and branding company helping individuals and businesses 
              bring their ideas to life with exceptional quality and speed across Ghana.
            </p>
            
            {/* Newsletter Signup */}
            <div className="space-y-3 sm:space-y-4">
              <h4 className="text-base sm:text-lg font-semibold">Stay Updated</h4>
              <p className="text-gray-400 text-sm sm:text-base">Get the latest offers and printing tips</p>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Input 
                  placeholder="Enter your email" 
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-orange-500 text-sm sm:text-base"
                />
                <Button className="bg-orange-600 hover:bg-orange-700 px-4 py-2 sm:py-2 text-sm sm:text-base">
                  <Send className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4 sm:space-y-6">
            <h4 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Quick Links</h4>
            <div className="space-y-2 sm:space-y-3">
              <Link href="/products" className="block text-gray-300 hover:text-orange-400 transition-colors duration-200 flex items-center group text-sm sm:text-base">
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                All Products
              </Link>
              <Link href="/products?category=t-shirts" className="block text-gray-300 hover:text-orange-400 transition-colors duration-200 flex items-center group text-sm sm:text-base">
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                T-Shirts & Apparel
              </Link>
              <Link href="/products?category=packaging" className="block text-gray-300 hover:text-orange-400 transition-colors duration-200 flex items-center group text-sm sm:text-base">
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                Food Packaging
              </Link>
              <Link href="/bulk-orders" className="block text-gray-300 hover:text-orange-400 transition-colors duration-200 flex items-center group text-sm sm:text-base">
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                Bulk Orders
              </Link>
              <Link href="/design-studio" className="block text-gray-300 hover:text-orange-400 transition-colors duration-200 flex items-center group text-sm sm:text-base">
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                Design Studio
              </Link>
              <Link href="/about" className="block text-gray-300 hover:text-orange-400 transition-colors duration-200 flex items-center group text-sm sm:text-base">
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 mr-2 group-hover:translate-x-1 transition-transform duration-200" />
                About Us
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4 sm:space-y-6">
            <h4 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Contact Us</h4>
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 font-medium text-sm sm:text-base">Address</p>
                  <p className="text-gray-400 text-xs sm:text-sm">Accra, Ghana</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 font-medium text-sm sm:text-base">Phone</p>
                  <p className="text-gray-400 text-xs sm:text-sm">+233 XX XXX XXXX</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 font-medium text-sm sm:text-base">Email</p>
                  <p className="text-gray-400 text-xs sm:text-sm">info@permanentprinting.com</p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-3 sm:space-y-4">
              <h5 className="text-base sm:text-lg font-semibold">Follow Us</h5>
              <div className="flex space-x-2 sm:space-x-3">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-orange-400 hover:bg-orange-400/10 p-2 sm:p-3 rounded-full transition-all duration-200">
                  <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-orange-400 hover:bg-orange-400/10 p-2 sm:p-3 rounded-full transition-all duration-200">
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-orange-400 hover:bg-orange-400/10 p-2 sm:p-3 rounded-full transition-all duration-200">
                  <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <div className="flex items-center space-x-2 text-gray-400 text-xs sm:text-sm">
              <span>© 2025 Permanent Printing Press. Made with</span>
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-red-500 fill-current" />
              <span>in Ghana</span>
            </div>
            
            <div className="flex items-center space-x-4 sm:space-x-6 text-xs sm:text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-orange-400 transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-orange-400 transition-colors duration-200">
                Terms of Service
              </Link>
              <Link href="/shipping" className="text-gray-400 hover:text-orange-400 transition-colors duration-200">
                Shipping Info
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
