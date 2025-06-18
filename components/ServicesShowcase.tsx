import { Truck, Shield, Clock, Users, Award, Headphones } from "lucide-react"

export default function ServicesShowcase() {
  const services = [
    {
      icon: Clock,
      title: "24-Hour Express Service",
      description: "Rush orders delivered within 24 hours for urgent printing needs",
      color: "text-orange-600",
    },
    {
      icon: Shield,
      title: "Quality Guarantee",
      description: "100% satisfaction guarantee or your money back on all orders",
      color: "text-green-600",
    },
    {
      icon: Truck,
      title: "Nationwide Delivery",
      description: "Free delivery on orders above GH₵500 across Ghana",
      color: "text-blue-600",
    },
    {
      icon: Users,
      title: "Bulk Order Discounts",
      description: "Special pricing for bulk orders and corporate clients",
      color: "text-purple-600",
    },
    {
      icon: Award,
      title: "Premium Materials",
      description: "Only the finest quality materials and printing techniques",
      color: "text-red-600",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Round-the-clock customer support for all your needs",
      color: "text-indigo-600",
    },
  ]

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">Why Choose Us</h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            We're committed to delivering exceptional printing services that exceed your expectations. Here's what sets
            us apart from the competition.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <div
                key={index}
                className="group bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:bg-white/20 transition-all duration-300 border border-white/10"
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 sm:w-16 sm:h-16 ${service.color} bg-white rounded-xl sm:rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform`}
                >
                  <IconComponent className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>

                {/* Content */}
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 group-hover:text-orange-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{service.description}</p>
              </div>
            )
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-12 sm:mt-16 lg:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-orange-400 mb-1 sm:mb-2">5000+</div>
            <div className="text-xs sm:text-sm lg:text-base text-gray-300">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-orange-400 mb-1 sm:mb-2">50,000+</div>
            <div className="text-xs sm:text-sm lg:text-base text-gray-300">Products Printed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-orange-400 mb-1 sm:mb-2">99%</div>
            <div className="text-xs sm:text-sm lg:text-base text-gray-300">Quality Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-orange-400 mb-1 sm:mb-2">24hrs</div>
            <div className="text-xs sm:text-sm lg:text-base text-gray-300">Average Delivery</div>
          </div>
        </div>
      </div>
    </section>
  )
}
