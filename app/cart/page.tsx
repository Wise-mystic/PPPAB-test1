"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, Truck, Shield, Clock } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { useToast } from "@/hooks/use-toast"

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart()
  const { toast } = useToast()
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)

  const shippingCost = cartTotal > 200 ? 0 : 15 // Free shipping over GH₵200
  const tax = cartTotal * 0.125 // 12.5% VAT in Ghana
  const finalTotal = cartTotal - discount + shippingCost + tax

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) {
      removeFromCart(id)
      toast({
        title: "Item Removed",
        description: "Item has been removed from your cart.",
      })
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  const handleRemoveItem = (id: number, name: string) => {
    removeFromCart(id)
    toast({
      title: "Item Removed",
      description: `${name} has been removed from your cart.`,
    })
  }

  const applyPromoCode = () => {
    // Sample promo codes for Ghana
    const promoCodes: Record<string, number> = {
      GHANA10: 10,
      NEWCUSTOMER: 15,
      BULK20: 20,
      STUDENT5: 5,
    }

    if (promoCodes[promoCode.toUpperCase()]) {
      const discountAmount = (cartTotal * promoCodes[promoCode.toUpperCase()]) / 100
      setDiscount(discountAmount)
      toast({
        title: "Promo Code Applied!",
        description: `You saved GH₵${discountAmount.toFixed(2)} with code ${promoCode.toUpperCase()}`,
      })
    } else {
      toast({
        title: "Invalid Promo Code",
        description: "Please check your promo code and try again.",
        variant: "destructive",
      })
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center py-12 sm:py-16">
            <div className="text-6xl sm:text-8xl mb-4 sm:mb-6">🛒</div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Your cart is empty</h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link href="/products">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-6 sm:px-8 py-3 sm:py-4">
                <ShoppingBag className="w-4 h-5 sm:w-5 sm:h-5 mr-2" />
                Start Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <Link href="/products" className="inline-flex items-center text-gray-600 hover:text-orange-600 mb-3 sm:mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">{cartItems.length} items in your cart</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                    {/* Product Image */}
                    <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">{item.name}</h3>
                      <p className="text-sm sm:text-base text-gray-600">GH₵{item.price.toFixed(2)} each</p>
                      {item.size && <p className="text-xs sm:text-sm text-gray-500">Size: {item.size}</p>}
                      {item.color && (
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs sm:text-sm text-gray-500">Color:</span>
                          <div
                            className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-gray-300"
                            style={{ backgroundColor: item.color }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="w-7 h-7 sm:w-8 sm:h-8 p-0"
                      >
                        <Minus className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                      <span className="w-10 sm:w-12 text-center font-semibold text-sm sm:text-base">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="w-7 h-7 sm:w-8 sm:h-8 p-0"
                      >
                        <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    </div>

                    {/* Item Total */}
                    <div className="text-right">
                      <p className="text-base sm:text-lg font-bold text-gray-900">GH₵{(item.price * item.quantity).toFixed(2)}</p>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveItem(item.id, item.name)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 mt-1 sm:mt-2 text-xs sm:text-sm"
                      >
                        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Clear Cart */}
            <div className="flex justify-between items-center pt-4">
              <Button variant="outline" onClick={clearCart} className="text-red-600 border-red-600 hover:bg-red-50 text-sm sm:text-base">
                <Trash2 className="w-4 h-4 mr-2" />
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-4 sm:space-y-6">
            {/* Promo Code */}
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-base sm:text-lg">Promo Code</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                  <Input
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={applyPromoCode} variant="outline" className="w-full sm:w-auto">
                    Apply
                  </Button>
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  <p>Try: GHANA10, NEWCUSTOMER, BULK20, STUDENT5</p>
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader className="pb-3 sm:pb-4">
                <CardTitle className="text-base sm:text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <div className="flex justify-between text-sm sm:text-base">
                  <span>Subtotal</span>
                  <span>GH₵{cartTotal.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600 text-sm sm:text-base">
                    <span>Discount</span>
                    <span>-GH₵{discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-sm sm:text-base">
                  <span>Shipping</span>
                  <span>
                    {shippingCost === 0 ? (
                      <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs sm:text-sm">
                        FREE
                      </Badge>
                    ) : (
                      `GH₵${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>

                <div className="flex justify-between text-sm sm:text-base">
                  <span>VAT (12.5%)</span>
                  <span>GH₵{tax.toFixed(2)}</span>
                </div>

                <Separator />

                <div className="flex justify-between text-base sm:text-lg font-bold">
                  <span>Total</span>
                  <span>GH₵{finalTotal.toFixed(2)}</span>
                </div>

                <Link href="/checkout">
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 sm:py-4 text-sm sm:text-base">
                    Proceed to Checkout
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Shipping Info */}
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center space-x-3 text-xs sm:text-sm">
                  <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                  <span>Free shipping on orders over GH₵200</span>
                </div>
                <div className="flex items-center space-x-3 text-xs sm:text-sm">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  <span>Delivery within 2-3 business days</span>
                </div>
                <div className="flex items-center space-x-3 text-xs sm:text-sm">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                  <span>100% satisfaction guarantee</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
