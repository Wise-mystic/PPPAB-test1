"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Grid, List, Star, Heart, ShoppingCart, Eye } from "lucide-react"
import Link from "next/link"
import { useCart } from "@/context/CartContext"
import { useToast } from "@/hooks/use-toast"

interface Product {
  id: number
  name: string
  description: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  category: string
  badge?: string
  colors: string[]
  sizes: string[]
  inStock: boolean
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [favorites, setFavorites] = useState<number[]>([])

  const { addToCart } = useCart()
  const { toast } = useToast()

  // Sample products data - In real app, this would come from API
  useEffect(() => {
    const sampleProducts: Product[] = [
      {
        id: 1,
        name: "Premium Cotton T-Shirt",
        description:
          "High-quality 100% cotton t-shirt perfect for custom printing. Made in Ghana with premium materials.",
        price: 25,
        originalPrice: 35,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        reviews: 124,
        category: "T-Shirts",
        badge: "Best Seller",
        colors: ["#000000", "#FFFFFF", "#FF6B35", "#1E40AF"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        inStock: true,
      },
      {
        id: 2,
        name: "Custom Food Packaging Box",
        description: "Eco-friendly packaging solution for food products. Perfect for local Ghanaian businesses.",
        price: 5,
        originalPrice: 8,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.9,
        reviews: 89,
        category: "Packaging",
        badge: "Eco-Friendly",
        colors: ["#8B4513", "#228B22", "#FF6B35"],
        sizes: ["Small", "Medium", "Large"],
        inStock: true,
      },
      {
        id: 3,
        name: "Professional Hoodie",
        description: "Premium hoodie with custom printing options. Perfect for Ghana's harmattan season.",
        price: 55,
        originalPrice: 70,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        reviews: 67,
        category: "Hoodies",
        badge: "New",
        colors: ["#000000", "#808080", "#1E40AF", "#DC2626"],
        sizes: ["S", "M", "L", "XL"],
        inStock: true,
      },
      {
        id: 4,
        name: "Bulk Plain T-Shirts (10 Pack)",
        description: "Wholesale pack of plain t-shirts for bulk orders. Great for schools and organizations.",
        price: 200,
        originalPrice: 250,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.6,
        reviews: 156,
        category: "Bulk",
        badge: "Bulk Deal",
        colors: ["#000000", "#FFFFFF", "#808080"],
        sizes: ["Mixed Sizes"],
        inStock: true,
      },
      {
        id: 5,
        name: "Custom Tote Bag",
        description: "Durable canvas tote bag perfect for branding. Support local Ghanaian businesses.",
        price: 18,
        originalPrice: 25,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.5,
        reviews: 43,
        category: "Bags",
        badge: "Popular",
        colors: ["#F5F5DC", "#000000", "#1E40AF"],
        sizes: ["One Size"],
        inStock: true,
      },
      {
        id: 6,
        name: "Business Card Printing",
        description: "Professional business cards with premium finish. Make a great first impression in Ghana.",
        price: 50,
        originalPrice: 65,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.9,
        reviews: 201,
        category: "Print",
        badge: "Professional",
        colors: ["#FFFFFF", "#F8F8FF", "#FFFACD"],
        sizes: ["Standard", "Premium"],
        inStock: true,
      },
    ]

    setProducts(sampleProducts)
    setFilteredProducts(sampleProducts)
    setLoading(false)
  }, [])

  // Filter and search logic
  useEffect(() => {
    let filtered = products

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((product) => product.category.toLowerCase() === selectedCategory.toLowerCase())
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort((a, b) => b.id - a.id)
        break
      default:
        // Keep original order for "featured"
        break
    }

    setFilteredProducts(filtered)
  }, [products, selectedCategory, searchTerm, sortBy])

  const categories = ["all", "T-Shirts", "Hoodies", "Packaging", "Bags", "Print", "Bulk"]

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Products</h1>
          <p className="text-xl text-gray-600">
            Discover quality printing products made for Ghana. From custom t-shirts to professional packaging.
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4 items-center">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>

            {/* View Mode */}
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {/* Products Grid/List */}
        <div
          className={`grid gap-6 ${
            viewMode === "grid" ? "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
          }`}
        >
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                {viewMode === "grid" ? (
                  // Grid View
                  <div>
                    {/* Product Image */}
                    <div className="relative h-64 overflow-hidden rounded-t-lg">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />

                      {/* Badge */}
                      {product.badge && (
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-orange-500 text-white">{product.badge}</Badge>
                        </div>
                      )}

                      {/* Quick Actions */}
                      <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="w-10 h-10 rounded-full p-0"
                          onClick={() => toggleFavorite(product.id)}
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                            }`}
                          />
                        </Button>
                        <Link href={`/products/${product.id}`}>
                          <Button size="sm" variant="secondary" className="w-10 h-10 rounded-full p-0">
                            <Eye className="w-4 h-4 text-gray-600" />
                          </Button>
                        </Link>
                      </div>

                      {/* Discount Badge */}
                      {product.originalPrice && product.originalPrice > product.price && (
                        <div className="absolute bottom-4 left-4 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <div className="text-sm text-orange-600 font-semibold mb-2">{product.category}</div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

                      {/* Rating */}
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">({product.reviews})</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-center space-x-2 mb-4">
                        <span className="text-xl font-bold text-gray-900">GH₵{product.price}</span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-sm text-gray-500 line-through">GH₵{product.originalPrice}</span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => handleAddToCart(product)}
                          className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
                          disabled={!product.inStock}
                        >
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          {product.inStock ? "Add to Cart" : "Out of Stock"}
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  // List View
                  <div className="flex p-4">
                    <div className="w-32 h-32 flex-shrink-0 mr-4">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="text-sm text-orange-600 font-semibold">{product.category}</div>
                          <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                        </div>
                        {product.badge && <Badge className="bg-orange-500 text-white">{product.badge}</Badge>}
                      </div>

                      <p className="text-gray-600 mb-3">{product.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-gray-900">GH₵{product.price}</span>
                            {product.originalPrice && product.originalPrice > product.price && (
                              <span className="text-lg text-gray-500 line-through">GH₵{product.originalPrice}</span>
                            )}
                          </div>

                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="text-sm text-gray-600 ml-1">({product.reviews})</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" onClick={() => toggleFavorite(product.id)}>
                            <Heart
                              className={`w-4 h-4 ${
                                favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                              }`}
                            />
                          </Button>
                          <Link href={`/products/${product.id}`}>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </Button>
                          </Link>
                          <Button
                            onClick={() => handleAddToCart(product)}
                            className="bg-orange-600 hover:bg-orange-700 text-white"
                            disabled={!product.inStock}
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            {product.inStock ? "Add to Cart" : "Out of Stock"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
