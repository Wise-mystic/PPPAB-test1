import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shirt, Package, Users, Palette } from "lucide-react"

export default function ProductCategories() {
  const categories = [
    {
      id: 1,
      name: "T-Shirt & Fabric Printing",
      description: "Custom t-shirts, hoodies, and fabric printing with premium quality materials",
      image: "/placeholder.svg?height=300&width=400",
      icon: Shirt,
      href: "/products/t-shirts",
      featured: true,
      stats: "2000+ designs",
    },
    {
      id: 2,
      name: "Food & Product Packaging",
      description: "Professional packaging solutions for food products and retail items",
      image: "/placeholder.svg?height=300&width=400",
      icon: Package,
      href: "/products/packaging",
      featured: true,
      stats: "500+ packages",
    },
    {
      id: 3,
      name: "Bulk Plain Clothing",
      description: "Wholesale plain t-shirts, hoodies, and apparel for businesses",
      image: "/placeholder.svg?height=300&width=400",
      icon: Users,
      href: "/products/bulk-clothing",
      featured: false,
      stats: "Bulk pricing",
    },
    {
      id: 4,
      name: "Custom Design Studio",
      description: "Professional design services and custom branding solutions",
      image: "/placeholder.svg?height=300&width=400",
      icon: Palette,
      href: "/design-studio",
      featured: false,
      stats: "Expert designers",
    },
  ]

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">Our Services</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            From custom t-shirt printing to professional packaging solutions, we bring your creative vision to life with
            speed and precision.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <div
                key={category.id}
                className={`group relative bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden ${
                  category.featured ? "md:col-span-2 lg:col-span-2" : ""
                }`}
              >
                {/* Featured Badge */}
                {category.featured && (
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10 bg-orange-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                    Popular
                  </div>
                )}

                {/* Image */}
                <div className="relative h-40 sm:h-48 lg:h-64 overflow-hidden">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  {/* Icon */}
                  <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>

                  {/* Stats */}
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 text-white">
                    <span className="text-xs sm:text-sm font-semibold bg-black/30 backdrop-blur-sm px-2 py-1 rounded">
                      {category.stats}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-orange-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">{category.description}</p>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <Link href={category.href} className="flex-1">
                      <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white group text-sm sm:text-base py-2 sm:py-3">
                        Shop Now
                        <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <Link href={`${category.href}/quote`}>
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto border-orange-600 text-orange-600 hover:bg-orange-50 text-sm sm:text-base py-2 sm:py-3"
                      >
                        Get Quote
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 to-red-500/0 group-hover:from-orange-500/10 group-hover:to-red-500/10 transition-all duration-300 pointer-events-none"></div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-8 max-w-4xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">Need Something Custom?</h3>
            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              Our design team can help bring your unique vision to life. Get a personalized quote for your project
              today.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base w-full sm:w-auto">
                  Contact Our Team
                </Button>
              </Link>
              <Link href="/design-studio">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-orange-600 text-orange-600 hover:bg-orange-50 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base w-full sm:w-auto"
                >
                  Try Design Studio
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
