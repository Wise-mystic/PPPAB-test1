import { CheckCircle, Star, Zap, Heart } from "lucide-react"

export default function WhyChooseUs() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast Turnaround",
      description: "Most orders completed within 24-48 hours without compromising quality",
    },
    {
      icon: Star,
      title: "Premium Quality Materials",
      description: "We use only the finest fabrics and printing materials for lasting results",
    },
    {
      icon: CheckCircle,
      title: "100% Satisfaction Guarantee",
      description: "Not happy with your order? We'll make it right or refund your money",
    },
    {
      icon: Heart,
      title: "Personalized Service",
      description: "Dedicated support team to help bring your creative vision to life",
    },
  ]

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-orange-50">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 sm:mb-8">
              Why Thousands Choose
              <span className="text-orange-600"> Permanent Printing Press</span>
            </h2>

            <div className="space-y-6 sm:space-y-8">
              {features.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <div key={index} className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">{feature.title}</h3>
                      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Content - Image/Visual */}
          <div className="relative order-1 lg:order-2">
            <div className="relative z-10">
              <img
                src="/placeholder.svg?height=500&width=600"
                alt="Quality printing process"
                className="w-full h-auto rounded-xl sm:rounded-2xl shadow-2xl"
              />

              {/* Floating Stats */}
              <div className="absolute -top-4 -left-4 sm:-top-8 sm:-left-8 bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
                <div className="text-2xl sm:text-3xl font-bold text-orange-600">99%</div>
                <div className="text-xs sm:text-sm text-gray-600">Customer Satisfaction</div>
              </div>

              <div className="absolute -bottom-4 -right-4 sm:-bottom-8 sm:-right-8 bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6">
                <div className="text-2xl sm:text-3xl font-bold text-green-600">24hrs</div>
                <div className="text-xs sm:text-sm text-gray-600">Average Delivery</div>
              </div>
            </div>

            {/* Background Decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-200 to-red-200 rounded-xl sm:rounded-2xl transform rotate-3 scale-105 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
