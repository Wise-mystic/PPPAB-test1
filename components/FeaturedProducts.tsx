"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, ShoppingCart, Eye } from "lucide-react"
import { useCart } from "@/context/CartContext"

export default function FeaturedProducts() {
  const [favorites, setFavorites] = useState<number[]>([])
  const { addToCart } = useCart()

  const products = [
    {
      id: 1,
      name: "Premium Cotton T-Shirt",
      description: "High-quality 100% cotton t-shirt perfect for custom printing",
      price: 2500,
      originalPrice: 3000,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
      reviews: 124,
      category: "T-Shirts",
      badge: "Best Seller",
      colors: ["#000000", "#FFFFFF", "#FF6B35", "#1E40AF"],
      sizes: ["S", "M", "L", "XL", "XXL"],
    },
    {
      id: 2,
      name: "Custom Food Packaging Box",
      description: "Eco-friendly packaging solution for food products",
      price: 150,
      originalPrice: 200,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.9,
      reviews: 89,
      category: "Packaging",
      badge: "Eco-Friendly",
      colors: ["#8B4513", "#228B22", "#FF6B35"],
      sizes: ["Small", "Medium", "Large"],
    },
    {
      id: 3,
      name: "Professional Hoodie",
      description: "Premium hoodie with custom printing options",
      price: 5500,
      originalPrice: 6500,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.7,
      reviews: 67,
      category: "Hoodies",
      badge: "New",
      colors: ["#000000", "#808080", "#1E40AF", "#DC2626"],
      sizes: ["S", "M", "L", "XL"],
    },
    {
      id: 4,
      name: "Bulk Plain T-Shirts (10 Pack)",
      description: "Wholesale pack of plain t-shirts for bulk orders",
      price: 20000,
      originalPrice: 25000,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.6,
      reviews: 156,
      category: "Bulk",
      badge: "Bulk Deal",
      colors: ["#000000", "#FFFFFF", "#808080"],
      sizes: ["Mixed Sizes"],
    },
    {
      id: 5,
      name: "Custom Tote Bag",
      description: "Durable canvas tote bag perfect for branding",
      price: 1800,
      originalPrice: 2200,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.5,
      reviews: 43,
      category: "Bags",
      badge: "Popular",
      colors: ["#F5F5DC", "#000000", "#1E40AF"],
      sizes: ["One Size"],
    },
    {
      id: 6,
      name: "Business Card Printing",
      description: "Professional business cards with premium finish",
      price: 5000,
      originalPrice: 6000,
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.9,
      reviews: 201,
      category: "Print",
      badge: "Professional",
      colors: ["#FFFFFF", "#F8F8FF", "#FFFACD"],
      sizes: ["Standard", "Premium"],
    },
  ]

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">Featured Products</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Discover our most popular products loved by thousands of customers. Quality guaranteed with fast delivery
            nationwide.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Product Image */}
              <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Badge */}
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                  <Badge
                    variant={product.badge === "Best Seller" ? "default" : "secondary"}
                    className={`text-xs sm:text-sm ${
                      product.badge === "Best Seller"
                        ? "bg-orange-500"
                        : product.badge === "New"
                          ? "bg-green-500"
                          : product.badge === "Bulk Deal"
                            ? "bg-blue-500"
                            : "bg-purple-500"
                    } text-white`}
                  >
                    {product.badge}
                  </Badge>
                </div>

                {/* Quick Actions */}
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full p-0 bg-white/90 hover:bg-white"
                    onClick={() => toggleFavorite(product.id)}
                  >
                    <Heart
                      className={`w-3 h-3 sm:w-4 sm:h-4 ${
                        favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                      }`}
                    />
                  </Button>
                  <Link href={`/products/${product.id}`}>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full p-0 bg-white/90 hover:bg-white"
                    >
                      <Eye className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
                    </Button>
                  </Link>
                </div>

                {/* Discount Badge */}
                {product.originalPrice > product.price && (
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 bg-red-500 text-white px-2 py-1 rounded text-xs sm:text-sm font-semibold">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4 sm:p-6">
                {/* Category */}
                <div className="text-xs sm:text-sm text-orange-600 font-semibold mb-2">{product.category}</div>

                {/* Name */}
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors line-clamp-1">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 sm:w-4 sm:h-4 ${
                          i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs sm:text-sm text-gray-600">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-lg sm:text-2xl font-bold text-gray-900">GH₵{product.price.toLocaleString()}</span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-sm sm:text-lg text-gray-500 line-through">GH₵{product.originalPrice.toLocaleString()}</span>
                  )}
                </div>

                {/* Color Options */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-xs sm:text-sm text-gray-500">Colors:</span>
                  <div className="flex space-x-1">
                    {product.colors.slice(0, 4).map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-gray-300"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                    {product.colors.length > 4 && (
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-600">
                        +{product.colors.length - 4}
                      </div>
                    )}
                  </div>
                </div>

                {/* Size Options */}
                <div className="flex items-center space-x-2 mb-4">
                  <span className="text-xs sm:text-sm text-gray-500">Sizes:</span>
                  <div className="flex flex-wrap gap-1">
                    {product.sizes.slice(0, 3).map((size, index) => (
                      <span key={index} className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {size}
                      </span>
                    ))}
                    {product.sizes.length > 3 && (
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                        +{product.sizes.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleAddToCart(product)}
                    className="flex-1 bg-orange-600 hover:bg-orange-700 text-white text-sm sm:text-base py-2 sm:py-3"
                  >
                    <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12 sm:mt-16">
          <Link href="/products">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 sm:py-4 text-base sm:text-lg">
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
