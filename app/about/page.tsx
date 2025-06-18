import { Metadata } from "next"
import { Award, Users, MapPin, Clock, Shield, Heart, Star, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "About Us - Permanent Printing Press Ghana | Our Story & Mission",
  description: "Learn about Permanent Printing Press Ghana's journey, mission, and commitment to quality printing services. Discover our story, values, and the team behind Ghana's premier printing company.",
  keywords: "about us, printing company Ghana, our story, mission, values, team, quality printing",
}

export default function AboutPage() {
  const values = [
    {
      icon: Shield,
      title: "Quality First",
      description: "We never compromise on quality, using only premium materials and state-of-the-art printing technology."
    },
    {
      icon: Clock,
      title: "Speed & Efficiency",
      description: "Fast turnaround times without sacrificing quality. We understand the importance of meeting deadlines."
    },
    {
      icon: Heart,
      title: "Customer Focus",
      description: "Your satisfaction is our priority. We work closely with you to bring your vision to life."
    },
    {
      icon: Users,
      title: "Community Impact",
      description: "Supporting local businesses and contributing to Ghana's economic growth through quality printing services."
    }
  ]

  const milestones = [
    { year: "2020", title: "Company Founded", description: "Started with a vision to revolutionize printing in Ghana" },
    { year: "2021", title: "First 1000 Customers", description: "Reached our first major milestone serving local businesses" },
    { year: "2022", title: "Expanded Services", description: "Added packaging and bulk order capabilities" },
    { year: "2023", title: "Nationwide Delivery", description: "Launched delivery services across all regions of Ghana" },
    { year: "2024", title: "Digital Transformation", description: "Launched online platform for seamless ordering experience" },
    { year: "2025", title: "Industry Leader", description: "Became Ghana's most trusted printing partner" }
  ]

  const team = [
    {
      name: "Kwame Asante",
      role: "Founder & CEO",
      image: "/placeholder.svg?height=200&width=200",
      bio: "15+ years in printing industry, passionate about quality and innovation."
    },
    {
      name: "Ama Osei",
      role: "Head of Design",
      image: "/placeholder.svg?height=200&width=200",
      bio: "Creative director with expertise in branding and visual communication."
    },
    {
      name: "Kofi Mensah",
      role: "Production Manager",
      image: "/placeholder.svg?height=200&width=200",
      bio: "Ensures every order meets our high quality standards and deadlines."
    },
    {
      name: "Sarah Addo",
      role: "Customer Success",
      image: "/placeholder.svg?height=200&width=200",
      bio: "Dedicated to providing exceptional customer service and support."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-red-50 py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <Badge className="bg-orange-100 text-orange-800 mb-4">Our Story</Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Building Ghana's Premier Printing Company
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              From humble beginnings to becoming Ghana's most trusted printing partner, 
              we've been on a mission to deliver exceptional quality and service since 2020.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                To empower businesses and individuals across Ghana with high-quality, 
                reliable printing services that help bring their creative visions to life. 
                We believe that every great idea deserves to be printed with excellence.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Quality Guaranteed</h3>
                    <p className="text-gray-600">Every order meets our high standards</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Fast Delivery</h3>
                    <p className="text-gray-600">Quick turnaround times nationwide</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Customer Focus</h3>
                    <p className="text-gray-600">Your satisfaction is our priority</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=500&width=600"
                alt="Our printing facility"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4">
                <div className="text-2xl font-bold text-orange-600">5000+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do and shape how we serve our customers.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-6 h-6 text-orange-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-gray-600 text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From startup to industry leader - here's how we've grown over the years.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                    {milestone.year}
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              The passionate professionals behind Permanent Printing Press who make it all possible.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-orange-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-bold mb-2">5000+</div>
              <div className="text-orange-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold mb-2">50,000+</div>
              <div className="text-orange-100">Products Printed</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold mb-2">99%</div>
              <div className="text-orange-100">Quality Rate</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold mb-2">24hrs</div>
              <div className="text-orange-100">Average Delivery</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ready to Start Your Printing Project?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust us with their printing needs. 
            Let's bring your ideas to life together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Browse Products
            </a>
            <a
              href="/contact"
              className="border border-orange-600 text-orange-600 hover:bg-orange-50 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
} 