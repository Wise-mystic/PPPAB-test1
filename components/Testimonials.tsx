"use client"

import { useState } from "react"
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Adebayo Johnson",
      role: "Small Business Owner",
      company: "AJ Fashion Store",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "Permanent Printing Press transformed my business! Their custom t-shirt printing quality is exceptional, and the turnaround time is incredible. I've ordered over 500 pieces and every single one was perfect.",
      project: "Custom T-Shirt Line",
    },
    {
      id: 2,
      name: "Fatima Abdul",
      role: "Event Planner",
      company: "Elite Events Ghana",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "I needed 200 custom hoodies for a corporate event with just 48 hours notice. They delivered on time with outstanding quality. My client was thrilled! Definitely my go-to printing partner.",
      project: "Corporate Event Merchandise",
    },
    {
      id: 3,
      name: "Chinedu Okafor",
      role: "Restaurant Owner",
      company: "Mama's Kitchen",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "The food packaging solutions they provided elevated our brand image significantly. Professional design, eco-friendly materials, and competitive pricing. Our customers love the new packaging!",
      project: "Food Packaging Design",
    },
    {
      id: 4,
      name: "Sarah Williams",
      role: "Fashion Designer",
      company: "SW Couture",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "Working with their design team was a dream. They understood my vision perfectly and delivered custom fabric prints that exceeded my expectations. The attention to detail is remarkable.",
      project: "Custom Fabric Printing",
    },
    {
      id: 5,
      name: "Ibrahim Mohammed",
      role: "NGO Director",
      company: "Hope Foundation",
      image: "/placeholder.svg?height=80&width=80",
      rating: 5,
      text: "Bulk order pricing made it possible for our NGO to get quality branded materials within our budget. Professional service, great communication, and social impact awareness. Highly recommended!",
      project: "NGO Branded Materials",
    },
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const current = testimonials[currentTestimonial]

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">What Our Customers Say</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Don't just take our word for it. Here's what our satisfied customers have to say about their experience with
            Permanent Printing Press.
          </p>
        </div>

        {/* Main Testimonial */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 relative">
            {/* Quote Icon */}
            <div className="absolute top-4 sm:top-6 lg:top-8 left-4 sm:left-6 lg:left-8 text-orange-200">
              <Quote className="w-12 h-12 sm:w-16 sm:h-16" />
            </div>

            {/* Content */}
            <div className="relative z-10">
              {/* Rating */}
              <div className="flex items-center justify-center mb-4 sm:mb-6">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 sm:w-6 sm:h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-lg sm:text-xl lg:text-2xl text-gray-800 text-center leading-relaxed mb-6 sm:mb-8 font-medium px-4 sm:px-0">
                "{current.text}"
              </blockquote>

              {/* Customer Info */}
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                <img
                  src={current.image || "/placeholder.svg"}
                  alt={current.name}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover border-4 border-white shadow-lg"
                />
                <div className="text-center sm:text-left">
                  <h4 className="text-base sm:text-lg font-bold text-gray-900">{current.name}</h4>
                  <p className="text-sm text-gray-600">{current.role}</p>
                  <p className="text-sm sm:text-base text-orange-600 font-semibold">{current.company}</p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">{current.project}</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-center space-x-3 sm:space-x-4 mt-6 sm:mt-8">
              <Button variant="outline" size="sm" onClick={prevTestimonial} className="rounded-full w-10 h-10 sm:w-12 sm:h-12 p-0">
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>

              {/* Dots Indicator */}
              <div className="flex space-x-1 sm:space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                      index === currentTestimonial ? "bg-orange-600 w-6 sm:w-8" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>

              <Button variant="outline" size="sm" onClick={nextTestimonial} className="rounded-full w-10 h-10 sm:w-12 sm:h-12 p-0">
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Customer Logos */}
        <div className="mt-12 sm:mt-16">
          <p className="text-center text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">Trusted by leading brands and businesses</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8 items-center opacity-60">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="flex items-center justify-center">
                <img
                  src={`/placeholder.svg?height=60&width=120&text=Brand${i}`}
                  alt={`Brand ${i}`}
                  className="h-8 sm:h-12 w-auto grayscale hover:grayscale-0 transition-all"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
