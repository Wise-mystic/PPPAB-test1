"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { 
  Package, 
  Users, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  FileText,
  Truck,
  Shield,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react"

interface BulkOrderForm {
  companyName: string
  contactPerson: string
  email: string
  phone: string
  address: string
  city: string
  region: string
  businessType: string
  orderType: string
  quantity: string
  deliveryDate: string
  specialRequirements: string
  budget: string
  urgency: string
  designFiles: File[]
  termsAccepted: boolean
}

const businessTypes = [
  "Restaurant/Food Service",
  "Retail Store",
  "School/Educational Institution",
  "Corporate/Office",
  "Event Planning",
  "Non-Profit Organization",
  "Manufacturing",
  "Healthcare",
  "Other"
]

const orderTypes = [
  "Custom T-Shirts",
  "Food Packaging Boxes",
  "Business Cards",
  "Banners & Signage",
  "Stickers & Labels",
  "Bags & Totes",
  "Hoodies & Sweatshirts",
  "Custom Apparel",
  "Marketing Materials",
  "Other"
]

const urgencyLevels = [
  { value: "standard", label: "Standard (7-10 days)", price: 0 },
  { value: "rush", label: "Rush (3-5 days)", price: 15 },
  { value: "express", label: "Express (1-2 days)", price: 25 }
]

export default function BulkOrdersPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<BulkOrderForm>({
    companyName: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    region: "",
    businessType: "",
    orderType: "",
    quantity: "",
    deliveryDate: "",
    specialRequirements: "",
    budget: "",
    urgency: "standard",
    designFiles: [],
    termsAccepted: false
  })

  const handleInputChange = (field: keyof BulkOrderForm, value: string | boolean | File[]) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setFormData(prev => ({ ...prev, designFiles: [...prev.designFiles, ...files] }))
  }

  const removeFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      designFiles: prev.designFiles.filter((_, i) => i !== index)
    }))
  }

  const validateStep = (currentStep: number): boolean => {
    switch (currentStep) {
      case 1:
        return !!(formData.companyName && formData.contactPerson && formData.email && formData.phone)
      case 2:
        return !!(formData.orderType && formData.quantity && formData.deliveryDate)
      case 3:
        return formData.termsAccepted
      default:
        return true
    }
  }

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1)
    } else {
      toast({
        title: "Please complete all required fields",
        description: "All fields marked with * are required.",
        variant: "destructive"
      })
    }
  }

  const prevStep = () => {
    setStep(step - 1)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      toast({
        title: "Bulk Order Submitted Successfully!",
        description: "We'll contact you within 24 hours to discuss your requirements and provide a detailed quote.",
      })

      // Reset form
      setFormData({
        companyName: "",
        contactPerson: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        region: "",
        businessType: "",
        orderType: "",
        quantity: "",
        deliveryDate: "",
        specialRequirements: "",
        budget: "",
        urgency: "standard",
        designFiles: [],
        termsAccepted: false
      })
      setStep(1)
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const calculateRushFee = () => {
    const urgency = urgencyLevels.find(u => u.value === formData.urgency)
    return urgency?.price || 0
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Bulk Orders</h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Get wholesale pricing and custom solutions for your business. Perfect for restaurants, 
            schools, corporate events, and retail businesses across Ghana.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-4xl mx-auto mb-6 sm:mb-8">
          <div className="flex items-center justify-center space-x-2 sm:space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base ${
                  step >= stepNumber ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step > stepNumber ? <CheckCircle className="w-4 h-4 sm:w-6 sm:h-6" /> : stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-8 h-1 sm:w-16 mx-1 sm:mx-2 ${step > stepNumber ? 'bg-orange-600' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-8 sm:space-x-16 mt-3 sm:mt-4">
            <span className={`text-xs sm:text-sm ${step >= 1 ? 'text-orange-600 font-semibold' : 'text-gray-500'}`}>
              Company Info
            </span>
            <span className={`text-xs sm:text-sm ${step >= 2 ? 'text-orange-600 font-semibold' : 'text-gray-500'}`}>
              Order Details
            </span>
            <span className={`text-xs sm:text-sm ${step >= 3 ? 'text-orange-600 font-semibold' : 'text-gray-500'}`}>
              Review & Submit
            </span>
          </div>
        </div>

        {/* Benefits Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card>
            <CardContent className="p-4 sm:p-6 text-center">
              <Package className="w-10 h-10 sm:w-12 sm:h-12 text-orange-600 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-semibold mb-2">Wholesale Pricing</h3>
              <p className="text-sm sm:text-base text-gray-600">Get up to 40% off retail prices for bulk orders</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-6 text-center">
              <Truck className="w-10 h-10 sm:w-12 sm:h-12 text-orange-600 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-semibold mb-2">Free Delivery</h3>
              <p className="text-sm sm:text-base text-gray-600">Free delivery across Ghana for orders above GH₵500</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 sm:p-6 text-center">
              <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-orange-600 mx-auto mb-3 sm:mb-4" />
              <h3 className="text-base sm:text-lg font-semibold mb-2">Quality Guarantee</h3>
              <p className="text-sm sm:text-base text-gray-600">Premium materials and professional finish guaranteed</p>
            </CardContent>
          </Card>
        </div>

        {/* Form */}
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-base sm:text-lg">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                {step === 1 && "Company Information"}
                {step === 2 && "Order Details"}
                {step === 3 && "Review & Submit"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <Label htmlFor="companyName">Company Name *</Label>
                        <Input
                          id="companyName"
                          value={formData.companyName}
                          onChange={(e) => handleInputChange("companyName", e.target.value)}
                          placeholder="Your company name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="contactPerson">Contact Person *</Label>
                        <Input
                          id="contactPerson"
                          value={formData.contactPerson}
                          onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                          placeholder="Full name"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="your@email.com"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="+233 XX XXX XXXX"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="businessType">Business Type</Label>
                      <Select value={formData.businessType} onValueChange={(value) => handleInputChange("businessType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your business type" />
                        </SelectTrigger>
                        <SelectContent>
                          {businessTypes.map((type) => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input
                          id="address"
                          value={formData.address}
                          onChange={(e) => handleInputChange("address", e.target.value)}
                          placeholder="Street address"
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          placeholder="City"
                        />
                      </div>
                      <div>
                        <Label htmlFor="region">Region</Label>
                        <Input
                          id="region"
                          value={formData.region}
                          onChange={(e) => handleInputChange("region", e.target.value)}
                          placeholder="Region"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <Label htmlFor="orderType">Order Type *</Label>
                        <Select value={formData.orderType} onValueChange={(value) => handleInputChange("orderType", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select order type" />
                          </SelectTrigger>
                          <SelectContent>
                            {orderTypes.map((type) => (
                              <SelectItem key={type} value={type}>{type}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="quantity">Quantity *</Label>
                        <Input
                          id="quantity"
                          value={formData.quantity}
                          onChange={(e) => handleInputChange("quantity", e.target.value)}
                          placeholder="e.g., 100 pieces"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <Label htmlFor="deliveryDate">Desired Delivery Date *</Label>
                        <Input
                          id="deliveryDate"
                          type="date"
                          value={formData.deliveryDate}
                          onChange={(e) => handleInputChange("deliveryDate", e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="urgency">Urgency Level</Label>
                        <Select value={formData.urgency} onValueChange={(value) => handleInputChange("urgency", value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {urgencyLevels.map((level) => (
                              <SelectItem key={level.value} value={level.value}>
                                {level.label} {level.price > 0 && `(+GH₵${level.price}%)`}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="budget">Budget Range (Optional)</Label>
                      <Input
                        id="budget"
                        value={formData.budget}
                        onChange={(e) => handleInputChange("budget", e.target.value)}
                        placeholder="e.g., GH₵5000 - GH₵10000"
                      />
                    </div>

                    <div>
                      <Label htmlFor="specialRequirements">Special Requirements</Label>
                      <Textarea
                        id="specialRequirements"
                        value={formData.specialRequirements}
                        onChange={(e) => handleInputChange("specialRequirements", e.target.value)}
                        placeholder="Any specific requirements, design preferences, or additional information..."
                        rows={4}
                      />
                    </div>

                    <div>
                      <Label>Design Files (Optional)</Label>
                      <div className="mt-2">
                        <Input
                          type="file"
                          multiple
                          accept=".jpg,.jpeg,.png,.pdf,.ai,.psd"
                          onChange={handleFileUpload}
                          className="cursor-pointer"
                        />
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">
                          Accepted formats: JPG, PNG, PDF, AI, PSD (Max 10MB each)
                        </p>
                      </div>
                      {formData.designFiles.length > 0 && (
                        <div className="mt-4 space-y-2">
                          {formData.designFiles.map((file, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <span className="text-xs sm:text-sm">{file.name}</span>
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFile(index)}
                                className="text-red-600 text-xs sm:text-sm"
                              >
                                Remove
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-start">
                        <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mr-2 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-blue-900 text-sm sm:text-base">What happens next?</h4>
                          <p className="text-blue-700 text-xs sm:text-sm mt-1">
                            After submitting your bulk order request, our team will review your requirements 
                            and contact you within 24 hours with a detailed quote and timeline.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-sm sm:text-base">Company Information</h4>
                        <div className="space-y-2 text-xs sm:text-sm">
                          <p><strong>Company:</strong> {formData.companyName}</p>
                          <p><strong>Contact:</strong> {formData.contactPerson}</p>
                          <p><strong>Email:</strong> {formData.email}</p>
                          <p><strong>Phone:</strong> {formData.phone}</p>
                          {formData.address && <p><strong>Address:</strong> {formData.address}</p>}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-sm sm:text-base">Order Details</h4>
                        <div className="space-y-2 text-xs sm:text-sm">
                          <p><strong>Type:</strong> {formData.orderType}</p>
                          <p><strong>Quantity:</strong> {formData.quantity}</p>
                          <p><strong>Delivery:</strong> {formData.deliveryDate}</p>
                          <p><strong>Urgency:</strong> {urgencyLevels.find(u => u.value === formData.urgency)?.label}</p>
                        </div>
                      </div>
                    </div>

                    {formData.specialRequirements && (
                      <div>
                        <h4 className="font-semibold mb-2 text-sm sm:text-base">Special Requirements</h4>
                        <p className="text-xs sm:text-sm text-gray-600">{formData.specialRequirements}</p>
                      </div>
                    )}

                    {formData.designFiles.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-2 text-sm sm:text-base">Design Files</h4>
                        <div className="space-y-1">
                          {formData.designFiles.map((file, index) => (
                            <p key={index} className="text-xs sm:text-sm text-gray-600">{file.name}</p>
                          ))}
                        </div>
                      </div>
                    )}

                    <Separator />

                    <div className="flex items-start space-x-3">
                      <Checkbox
                        id="terms"
                        checked={formData.termsAccepted}
                        onCheckedChange={(checked) => handleInputChange("termsAccepted", checked as boolean)}
                        required
                      />
                      <div className="text-xs sm:text-sm">
                        <Label htmlFor="terms" className="font-medium">
                          I agree to the terms and conditions *
                        </Label>
                        <p className="text-gray-600 mt-1">
                          By submitting this form, I agree to receive communications from Permanent Printing Press 
                          regarding my bulk order request.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6 sm:mt-8">
                  {step > 1 && (
                    <Button type="button" variant="outline" onClick={prevStep} className="text-sm sm:text-base">
                      Previous
                    </Button>
                  )}
                  <div className="ml-auto">
                    {step < 3 ? (
                      <Button type="button" onClick={nextStep} className="text-sm sm:text-base">
                        Next Step
                      </Button>
                    ) : (
                      <Button type="submit" disabled={loading} className="bg-orange-600 hover:bg-orange-700 text-sm sm:text-base">
                        {loading ? "Submitting..." : "Submit Bulk Order Request"}
                      </Button>
                    )}
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <div className="max-w-4xl mx-auto mt-6 sm:mt-8">
          <Card>
            <CardContent className="p-4 sm:p-6">
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Need immediate assistance?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-xs sm:text-sm">
                <div className="flex items-center">
                  <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-orange-600" />
                  <span>+233 XX XXX XXXX</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-orange-600" />
                  <span>bulk@permanentprinting.com</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-orange-600" />
                  <span>Mon-Fri: 8AM-6PM</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 