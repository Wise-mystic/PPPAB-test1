"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Star } from "lucide-react"

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "Transform Your Ideas Into Reality",
      subtitle: "Speed Meets Quality – Powering Ghana's Brands",
      description:
        "Professional printing services for t-shirts, packaging, and custom branding solutions across Ghana. From concept to creation in record time.",
      image: "/placeholder.svg?height=600&width=800",
      cta1: "Start Designing",
      cta2: "View Products",
    },
    {
      title: "Custom T-Shirt Printing Excellence",
      subtitle: "Premium Quality, Lightning Fast Delivery Across Ghana",
      description:
        "High-quality screen printing, DTG, and vinyl printing for individuals and businesses. Serving Accra, Kumasi, and all regions of Ghana.",
      image: "/placeholder.svg?height=600&width=800",
      cta1: "Shop T-Shirts",
      cta2: "Get Quote",
    },
    {
      title: "Professional Packaging Solutions",
      subtitle: "Make Your Ghanaian Products Stand Out",
      description:
        "Custom packaging design and printing for food products, retail items, and corporate branding. Eco-friendly options available for sustainable businesses.",
      image: "/placeholder.svg?height=600&width=800",
      cta1: "Explore Packaging",
      cta2: "Design Now",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-orange-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-20"></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-12 sm:py-16 lg:py-20 xl:py-32">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-6 sm:space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-orange-500/20 backdrop-blur-sm border border-orange-500/30 rounded-full px-3 sm:px-4 py-2">
              <Star className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400" />
              <span className="text-xs sm:text-sm font-medium">🇬🇭 Ghana's #1 Printing Service</span>
            </div>

            {/* Main Content */}
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">{slides[currentSlide].title}</h1>

              <h2 className="text-lg sm:text-xl lg:text-2xl text-orange-400 font-semibold">{slides[currentSlide].subtitle}</h2>

              <p className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed max-w-2xl">
                {slides[currentSlide].description}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 py-6 sm:py-8">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-orange-400">5000+</div>
                <div className="text-xs sm:text-sm text-gray-400">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-orange-400">24hrs</div>
                <div className="text-xs sm:text-sm text-gray-400">Fast Delivery</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-orange-400">99%</div>
                <div className="text-xs sm:text-sm text-gray-400">Quality Rate</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link href="/design-studio">
                <Button
                  size="lg"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold group w-full sm:w-auto"
                >
                  {slides[currentSlide].cta1}
                  <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Link href="/products">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-gray-900 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold w-full sm:w-auto"
                >
                  {slides[currentSlide].cta2}
                </Button>
              </Link>
            </div>

            {/* Video CTA */}
            <div className="flex items-center space-x-4 pt-4">
              <Button size="sm" variant="ghost" className="text-white hover:text-orange-400 p-0">
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 ml-1" />
                  </div>
                  <span className="text-sm sm:text-base">Watch Our Process</span>
                </div>
              </Button>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative order-first lg:order-last">
            <div className="relative z-10">
              <img
                src={slides[currentSlide].image || "/placeholder.svg"}
                alt="Printing Process"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />

              {/* Floating Elements */}
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 bg-orange-500 text-white p-3 sm:p-4 rounded-xl shadow-lg">
                <div className="text-lg sm:text-2xl font-bold">24/7</div>
                <div className="text-xs sm:text-sm">Support</div>
              </div>

              <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 bg-white text-gray-900 p-3 sm:p-4 rounded-xl shadow-lg">
                <div className="text-lg sm:text-2xl font-bold text-green-600">✓</div>
                <div className="text-xs sm:text-sm font-semibold">Quality Guaranteed</div>
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl transform rotate-3 scale-105 -z-10"></div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center space-x-2 mt-8 sm:mt-12">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                index === currentSlide ? "bg-orange-500 w-6 sm:w-8" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-2 sm:h-3 bg-white/70 rounded-full mt-1 sm:mt-2 animate-pulse"></div>
          </div>
          <span className="text-xs">Scroll Down</span>
        </div>
      </div>
    </section>
  )
}
