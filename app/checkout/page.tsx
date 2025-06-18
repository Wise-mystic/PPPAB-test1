"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Smartphone, Building, MapPin, User, Phone, Mail } from "lucide-react"
import { useCart } from "@/context/CartContext"
import { useAuth } from "@/context/AuthContext"
import { useToast } from "@/hooks/use-toast"

const ghanaRegions = [
  "Greater Accra",
  "Ashanti",
  "Western",
  "Central",
  "Eastern",
  "Volta",
  "Northern",
  "Upper East",
  "Upper West",
  "Brong-Ahafo",
  "Western North",
  "Ahafo",
  "Bono",
  "Bono East",
  "Oti",
  "North East",
  "Savannah",
]

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart()
  const { user } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("momo")
  const [saveInfo, setSaveInfo] = useState(false)

  const [shippingInfo, setShippingInfo] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ")[1] || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    region: "",
    postalCode: "",
  })

  const [billingInfo, setBillingInfo] = useState({
    sameAsShipping: true,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    region: "",
    postalCode: "",
  })

  const [paymentInfo, setPaymentInfo] = useState({
    // Mobile Money
    momoNumber: "",
    momoProvider: "",
    // Card
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardName: "",
  })

  const shippingCost = cartTotal > 200 ? 0 : 15
  const tax = cartTotal * 0.125
  const finalTotal = cartTotal + shippingCost + tax

  const handleShippingChange = (field: string, value: string) => {
    setShippingInfo((prev) => ({ ...prev, [field]: value }))
  }

  const handlePaymentChange = (field: string, value: string) => {
    setPaymentInfo((prev) => ({ ...prev, [field]: value }))
  }

  const validateForm = () => {
    const requiredShippingFields = ["firstName", "lastName", "email", "phone", "address", "city", "region"]
    const missingFields = requiredShippingFields.filter((field) => !shippingInfo[field as keyof typeof shippingInfo])

    if (missingFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required shipping information.",
        variant: "destructive",
      })
      return false
    }

    if (paymentMethod === "momo" && (!paymentInfo.momoNumber || !paymentInfo.momoProvider)) {
      toast({
        title: "Payment Information Required",
        description: "Please provide your mobile money details.",
        variant: "destructive",
      })
      return false
    }

    if (paymentMethod === "card" && (!paymentInfo.cardNumber || !paymentInfo.expiryDate || !paymentInfo.cvv)) {
      toast({
        title: "Payment Information Required",
        description: "Please provide your card details.",
        variant: "destructive",
      })
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Create order
      const orderData = {
        items: cartItems,
        shipping: shippingInfo,
        billing: billingInfo.sameAsShipping ? shippingInfo : billingInfo,
        payment: {
          method: paymentMethod,
          ...paymentInfo,
        },
        totals: {
          subtotal: cartTotal,
          shipping: shippingCost,
          tax,
          total: finalTotal,
        },
      }

      // In real app, send to API
      console.log("Order data:", orderData)

      clearCart()

      toast({
        title: "Order Placed Successfully!",
        description: "Thank you for your order. You will receive a confirmation email shortly.",
      })

      router.push("/order-confirmation")
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (cartItems.length === 0) {
    router.push("/cart")
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Checkout</h1>

          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Column - Forms */}
              <div className="space-y-8">
                {/* Shipping Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      Shipping Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={shippingInfo.firstName}
                          onChange={(e) => handleShippingChange("firstName", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={shippingInfo.lastName}
                          onChange={(e) => handleShippingChange("lastName", e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="email"
                          type="email"
                          value={shippingInfo.email}
                          onChange={(e) => handleShippingChange("email", e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="0XX XXX XXXX"
                          value={shippingInfo.phone}
                          onChange={(e) => handleShippingChange("phone", e.target.value)}
                          className="pl-10"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="address">Street Address *</Label>
                      <Input
                        id="address"
                        value={shippingInfo.address}
                        onChange={(e) => handleShippingChange("address", e.target.value)}
                        placeholder="House number and street name"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          value={shippingInfo.city}
                          onChange={(e) => handleShippingChange("city", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="region">Region *</Label>
                        <Select
                          value={shippingInfo.region}
                          onValueChange={(value) => handleShippingChange("region", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select region" />
                          </SelectTrigger>
                          <SelectContent>
                            {ghanaRegions.map((region) => (
                              <SelectItem key={region} value={region}>
                                {region}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="postalCode">Postal Code (Optional)</Label>
                      <Input
                        id="postalCode"
                        value={shippingInfo.postalCode}
                        onChange={(e) => handleShippingChange("postalCode", e.target.value)}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Method */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CreditCard className="w-5 h-5 mr-2" />
                      Payment Method
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      {/* Mobile Money */}
                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="momo" id="momo" />
                        <Label htmlFor="momo" className="flex items-center cursor-pointer">
                          <Smartphone className="w-5 h-5 mr-2 text-green-600" />
                          Mobile Money
                          <Badge variant="secondary" className="ml-2">
                            Popular
                          </Badge>
                        </Label>
                      </div>

                      {paymentMethod === "momo" && (
                        <div className="ml-6 space-y-4 border-l-2 border-green-200 pl-4">
                          <div>
                            <Label htmlFor="momoProvider">Provider *</Label>
                            <Select
                              value={paymentInfo.momoProvider}
                              onValueChange={(value) => handlePaymentChange("momoProvider", value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select provider" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="mtn">MTN Mobile Money</SelectItem>
                                <SelectItem value="vodafone">Vodafone Cash</SelectItem>
                                <SelectItem value="airteltigo">AirtelTigo Money</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="momoNumber">Mobile Money Number *</Label>
                            <Input
                              id="momoNumber"
                              type="tel"
                              placeholder="0XX XXX XXXX"
                              value={paymentInfo.momoNumber}
                              onChange={(e) => handlePaymentChange("momoNumber", e.target.value)}
                            />
                          </div>
                        </div>
                      )}

                      {/* Credit/Debit Card */}
                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex items-center cursor-pointer">
                          <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                          Credit/Debit Card
                        </Label>
                      </div>

                      {paymentMethod === "card" && (
                        <div className="ml-6 space-y-4 border-l-2 border-blue-200 pl-4">
                          <div>
                            <Label htmlFor="cardName">Cardholder Name *</Label>
                            <div className="relative">
                              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                              <Input
                                id="cardName"
                                value={paymentInfo.cardName}
                                onChange={(e) => handlePaymentChange("cardName", e.target.value)}
                                className="pl-10"
                                placeholder="Name on card"
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="cardNumber">Card Number *</Label>
                            <Input
                              id="cardNumber"
                              value={paymentInfo.cardNumber}
                              onChange={(e) => handlePaymentChange("cardNumber", e.target.value)}
                              placeholder="1234 5678 9012 3456"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="expiryDate">Expiry Date *</Label>
                              <Input
                                id="expiryDate"
                                value={paymentInfo.expiryDate}
                                onChange={(e) => handlePaymentChange("expiryDate", e.target.value)}
                                placeholder="MM/YY"
                              />
                            </div>
                            <div>
                              <Label htmlFor="cvv">CVV *</Label>
                              <Input
                                id="cvv"
                                value={paymentInfo.cvv}
                                onChange={(e) => handlePaymentChange("cvv", e.target.value)}
                                placeholder="123"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Bank Transfer */}
                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="bank" id="bank" />
                        <Label htmlFor="bank" className="flex items-center cursor-pointer">
                          <Building className="w-5 h-5 mr-2 text-purple-600" />
                          Bank Transfer
                          <Badge variant="outline" className="ml-2">
                            Manual
                          </Badge>
                        </Label>
                      </div>
                    </RadioGroup>

                    {/* Save Information */}
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="saveInfo"
                        checked={saveInfo}
                        onCheckedChange={(checked) => setSaveInfo(checked as boolean)}
                      />
                      <Label htmlFor="saveInfo" className="text-sm">
                        Save my information for faster checkout next time
                      </Label>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - Order Summary */}
              <div>
                <Card className="sticky top-8">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Order Items */}
                    <div className="space-y-3">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center space-x-3">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{item.name}</p>
                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                          </div>
                          <p className="text-sm font-medium">GH₵{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>

                    <Separator />

                    {/* Totals */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>GH₵{cartTotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>
                          {shippingCost === 0 ? (
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              FREE
                            </Badge>
                          ) : (
                            `GH₵${shippingCost.toFixed(2)}`
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>VAT (12.5%)</span>
                        <span>GH₵{tax.toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>GH₵{finalTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Place Order Button */}
                    <Button
                      type="submit"
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3"
                      disabled={loading}
                    >
                      {loading ? "Processing..." : `Place Order - GH₵${finalTotal.toFixed(2)}`}
                    </Button>

                    {/* Security Notice */}
                    <div className="text-xs text-gray-500 text-center">
                      🔒 Your payment information is secure and encrypted
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
