import Hero from "@/components/Hero"
import ProductCategories from "@/components/ProductCategories"
import FeaturedProducts from "@/components/FeaturedProducts"
import ServicesShowcase from "@/components/ServicesShowcase"
import WhyChooseUs from "@/components/WhyChooseUs"
import Testimonials from "@/components/Testimonials"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ProductCategories />
      <FeaturedProducts />
      <ServicesShowcase />
      <WhyChooseUs />
      <Testimonials />
    </main>
  )
}
