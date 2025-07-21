"use client"

import { type FormEvent, useEffect, useState } from "react"
import { ArrowRight, ArrowLeft, Check, Building, Phone, Package, Plus, Trash2, CreditCard, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { handleOnboarding } from "@/actions/handleOnboarding"
import { ImageUploadNormal } from "./image-upload-normal"
import { ImageUploadMultiple } from "./image-upload-multiple"
import type { FormData, Product } from "@/types/types"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const url = process.env.NEXT_PUBLIC_ROOT_DOMAIN

  // Business Information
  const [businessName, setBusinessName] = useState("")
  const [businessDescription, setBusinessDescription] = useState("")
  const [businessType, setBusinessType] = useState("")
  const [customBusinessType, setCustomBusinessType] = useState("")
  const [businessImageUrl, setBusinessImageUrl] = useState("")
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, setData] = useState<FormData>({
    businessName: "",
    businessDescription: "",
    businessImageUrl: "",
    businessType: "",
    whatsappNumber: "",
    products: [],
    bankAccountNumber: "",
    bankAccountName: "",
    bankCode: "",
    settlementSchedule: "",
    subdomain: "",
  })

 

  // Contact Information
  const [whatsappNumber, setWhatsappNumber] = useState("")

  // Banking Information
  const [bankAccountNumber, setBankAccountNumber] = useState("")
  const [bankAccountName, setBankAccountName] = useState("")
  const [bankCode, setBankCode] = useState("")
  const [settlementSchedule, setSettlementSchedule] = useState("weekly")
  const [subdomainName, setSubdomainName] = useState("")

  // Products - Initialize with 'images' array
  const [products, setProducts] = useState<Product[]>([{ name: "", description: "", price: "", images: [] }])

  const router = useRouter()

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  // Business types
  const businessTypes = [
    { value: "fashion", label: "Fashion & Clothing" },
    {
      value: "software development agency",
      label: "Software Development Agency",
    },
    { value: "electronics", label: "Electronics" },
    { value: "food", label: "Food & Beverages" },
    { value: "beauty", label: "Beauty & Cosmetics" },
    { value: "agriculture", label: "Agriculture" },
    { value: "home", label: "Home & Garden" },
    { value: "sports", label: "Sports & Fitness" },
    { value: "books", label: "Books & Media" },
    { value: "automotive", label: "Automotive" },
    { value: "health", label: "Health & Wellness" },
    { value: "ecommerce", label: "E-commerce" },
    { value: "education", label: "Education & Training" },
    { value: "real estate", label: "Real Estate" },
    { value: "financial services", label: "Financial Services" },
    { value: "consulting", label: "Consulting & Strategy" },
    { value: "events", label: "Events & Entertainment" },
    { value: "logistics", label: "Logistics & Transportation" },
    { value: "hospitality", label: "Hospitality & Tourism" },
    { value: "construction", label: "Construction & Building" },
    { value: "photography", label: "Photography & Videography" },
    { value: "marketing", label: "Marketing & Advertising" },
    { value: "legal", label: "Legal & Compliance" },
    { value: "telecommunications", label: "Telecommunications" },
    { value: "manufacturing", label: "Manufacturing" },
    { value: "nonprofit", label: "Nonprofit & NGOs" },
    { value: "freelance", label: "Freelance & Gigs" },
    { value: "gaming", label: "Gaming & Esports" },
    { value: "pets", label: "Pet Services & Supplies" },
    { value: "other", label: "Other" },
  ]

  // Nigerian banks
  const banks = [
    { code: "044", name: "Access Bank" },
    { code: "014", name: "Afribank Nigeria Plc" },
    { code: "023", name: "Citibank Nigeria Limited" },
    { code: "050", name: "Ecobank Nigeria Plc" },
    { code: "084", name: "Enterprise Bank Limited" },
    { code: "070", name: "Fidelity Bank Plc" },
    { code: "011", name: "First Bank of Nigeria Limited" },
    { code: "214", name: "First City Monument Bank Plc" },
    { code: "058", name: "Guaranty Trust Bank Plc" },
    { code: "030", name: "Heritage Banking Company Ltd" },
    { code: "082", name: "Keystone Bank Limited" },
    { code: "076", name: "Polaris Bank Limited" },
    { code: "221", name: "Stanbic IBTC Bank Plc" },
    { code: "068", name: "Standard Chartered Bank Nigeria Limited" },
    { code: "232", name: "Sterling Bank Plc" },
    { code: "033", name: "United Bank For Africa Plc" },
    { code: "032", name: "Union Bank of Nigeria Plc" },
    { code: "035", name: "Wema Bank Plc" },
    { code: "057", name: "Zenith Bank Plc" },
  ]

  const addProduct = () => {
    if (products.length < 5) {
      setProducts([...products, { name: "", description: "", price: "", images: [] }])
    }
  }

  const removeProduct = (index: number) => {
    if (products.length > 1) {
      setProducts(products.filter((_, i) => i !== index))
    }
  }

  // Updated updateProduct to handle images array properly
  const updateProduct = (index: number, field: keyof Product, value: string | string[]) => {
    const updatedProducts = products.map((product, i) =>
      i === index
        ? {
            ...product,
            [field]: value,
          }
        : product,
    )
    setProducts(updatedProducts)
  }

  const generateSubdomain = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  useEffect(() => {
    if (businessName.trim()) {
      const generatedSubdomain = generateSubdomain(businessName)
      setSubdomainName(generatedSubdomain)
    } else {
      setSubdomainName("")
    }
  }, [businessName])

  // Handle business type change and reset custom type when needed
  const handleBusinessTypeChange = (value: string) => {
    setBusinessType(value)
    if (value !== "other") {
      setCustomBusinessType("")
    }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    if (!businessName.trim()) {
      console.log("Business name is required")
      setIsLoading(false)
      return
    }

    // Use custom business type if "other" is selected, otherwise use the selected business type
    const finalBusinessType = businessType === "other" ? customBusinessType : businessType

    const formData: FormData = {
      businessName,
      businessDescription,
      businessType: finalBusinessType,
      whatsappNumber,
      products,
      businessImageUrl,
      bankAccountNumber,
      bankAccountName,
      bankCode,
      settlementSchedule,
      subdomain: subdomainName,
    }

    setData(formData)

    try {
      const result = await handleOnboarding(formData)
      if (result.success) {
        toast.success("Business Onboarded successfully")
        router.push("/dashboard")
      } else {
        toast.error("Business onboarding failed")
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else if (typeof error === "string") {
        toast.error(error)
      } else {
        toast.error("An unexpected error occurred")
      }
    } finally {
      setIsLoading(false)
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        const businessTypeValid = businessType === "other" ? businessType && customBusinessType.trim() : businessType
        return businessName && businessTypeValid
      case 2:
        return whatsappNumber
      case 3:
        return bankAccountNumber && bankAccountName && bankCode
      case 4:
        // Ensure all products have a name, price, and at least one image
        return products.every((p) => p.name && p.price && p.images.length > 0)
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Link href="/">
              <Image src="/ivie1.png" alt="ivie_logo" width="150" height="100" className="cursor-pointer" />
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Set up your personalized assitant with your business information
          </h1>
          <p className="text-gray-600 mt-2">{"Let's get your account setup and ready ready in just a few steps"}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>
              Step {currentStep} of {totalSteps}
            </span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="border-orange-100 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center">
                {currentStep === 1 && (
                  <>
                    <Building className="h-5 w-5 mr-2 text-orange-500" />
                    Business Information
                  </>
                )}
                {currentStep === 2 && (
                  <>
                    <Phone className="h-5 w-5 mr-2 text-blue-500" />
                    Contact Details
                  </>
                )}
                {currentStep === 3 && (
                  <>
                    <CreditCard className="h-5 w-5 mr-2 text-green-500" />
                    Banking Information
                  </>
                )}
                {currentStep === 4 && (
                  <>
                    <Package className="h-5 w-5 mr-2 text-purple-500" />
                    Your Products
                  </>
                )}
              </CardTitle>
              <CardDescription>
                {currentStep === 1 && "Tell us about your business"}
                {currentStep === 2 && "How can customers reach you?"}
                {currentStep === 3 && "Set up your payment details"}
                {currentStep === 4 && "Add your products to start selling"}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Step 1: Business Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name *</Label>
                    <Input
                      id="businessName"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="Enter your business name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessDescriptioin">Business Description *</Label>
                    <Input
                      id="businessDescription"
                      value={businessDescription}
                      onChange={(e) => setBusinessDescription(e.target.value)}
                      placeholder="Write a brief description of your business"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="businessType">Business Type *</Label>
                    <Select value={businessType} onValueChange={handleBusinessTypeChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your business type" />
                      </SelectTrigger>
                      <SelectContent>
                        {businessTypes.map((type, index) => (
                          <SelectItem key={index} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Custom Business Type Input - Show when "other" is selected */}
                  {businessType === "other" && (
                    <div className="space-y-2">
                      <Label htmlFor="customBusinessType">Please specify your business type *</Label>
                      <Input
                        id="customBusinessType"
                        value={customBusinessType}
                        onChange={(e) => setCustomBusinessType(e.target.value)}
                        placeholder="Enter your business type"
                        required
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="businessImage">Business Logo/Image (Optional)</Label>
                    <ImageUploadNormal
                      value={businessImageUrl}
                      onChange={setBusinessImageUrl}
                      uploadType="logo"
                      placeholder="Upload Business Logo"
                    />
                  </div>

                  {businessName && (
                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <p className="text-sm text-gray-600 mb-1">Your store will be available at:</p>
                      <p className="font-medium text-orange-600">{`${subdomainName}.${url}`}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Step 2: Contact Details */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">WhatsApp Number *</Label>
                    <Input
                      id="whatsapp"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      placeholder="+234 801 234 5678"
                      required
                    />
                    <p className="text-sm text-gray-500">
                      Customers will use this number to contact you about orders. Make sure it&apos;s active on
                      WhatsApp.
                    </p>
                  </div>

                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h3 className="font-medium text-blue-900 mb-2">Why do we need your WhatsApp?</h3>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Customers can contact you directly about products</li>
                      <li>• Pre-filled messages make ordering easier</li>
                      <li>• Build trust with direct communication</li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Step 3: Banking Information */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h3 className="font-medium text-green-900 mb-2">Payment Setup</h3>
                    <p className="text-sm text-green-700">
                      We&apos;ll use this information to set up payments for your store. Your customers will be able to
                      pay directly through your store.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bankCode">Bank *</Label>
                    <Select value={bankCode} onValueChange={setBankCode}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your bank" />
                      </SelectTrigger>
                      <SelectContent>
                        {banks.map((bank, index) => (
                          <SelectItem key={index} value={bank.code}>
                            {bank.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bankAccountNumber">Account Number *</Label>
                    <Input
                      id="bankAccountNumber"
                      value={bankAccountNumber}
                      onChange={(e) => setBankAccountNumber(e.target.value)}
                      placeholder="1234567890"
                      maxLength={10}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bankAccountName">Account Name *</Label>
                    <Input
                      id="bankAccountName"
                      value={bankAccountName}
                      onChange={(e) => setBankAccountName(e.target.value)}
                      placeholder="Account holder name"
                      required
                    />
                    <p className="text-sm text-gray-500">This should match the name on your bank account exactly</p>
                  </div>

                  <div className="space-y-3">
                    <Label>Settlement Schedule</Label>
                    <RadioGroup value={settlementSchedule} onValueChange={setSettlementSchedule}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="weekly" id="weekly" />
                        <Label htmlFor="weekly">Weekly - Receive payments every week (Recommended)</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="monthly" id="monthly" />
                        <Label htmlFor="monthly">Monthly - Receive payments every month</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg border">
                    <h3 className="font-medium text-gray-900 mb-2">Transaction Fees</h3>
                    <p className="text-sm text-gray-600">
                      A small fee of 2.5% will be charged on each successful transaction to cover payment processing
                      costs.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 4: Products */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Add Your Products</h3>
                    <Button
                      type="button"
                      onClick={addProduct}
                      disabled={products.length >= 5}
                      variant="outline"
                      size="sm"
                      className="border-orange-200 text-orange-600 hover:bg-orange-50"
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Product
                    </Button>
                  </div>

                  {products.map((product, index) => (
                    <Card key={index} className="border-gray-200">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">Product {index + 1}</CardTitle>
                          {products.length > 1 && (
                            <Button
                              type="button"
                              onClick={() => removeProduct(index)}
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor={`product-name-${index}`}>Product Name *</Label>
                          <Input
                            id={`product-name-${index}`}
                            value={product.name}
                            onChange={(e) => updateProduct(index, "name", e.target.value)}
                            placeholder="e.g., Premium T-Shirt"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`product-description-${index}`}>Description</Label>
                          <Textarea
                            id={`product-description-${index}`}
                            value={product.description}
                            onChange={(e) => updateProduct(index, "description", e.target.value)}
                            placeholder="Brief description of your product"
                            rows={2}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`product-images-${index}`}>Product Images *</Label>
                          <ImageUploadMultiple
                            value={product.images}
                            onChange={(urls) => updateProduct(index, "images", urls)}
                            maxImages={5}
                            placeholder="Upload Product Images"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor={`product-price-${index}`}>Price (₦) *</Label>
                          <Input
                            id={`product-price-${index}`}
                            type="number"
                            value={product.price}
                            onChange={(e) => updateProduct(index, "price", e.target.value)}
                            placeholder="0.00"
                            min="0"
                            step="0.01"
                            required
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <p className="text-sm text-gray-500">
                    You can add up to 5 products during setup. More products can be added later from your dashboard.
                    Each product can have up to 5 images.
                  </p>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                <Button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  variant="outline"
                  className="border-gray-300 bg-transparent"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                {currentStep < totalSteps ? (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="bg-orange-500 hover:bg-orange-600"
                    disabled={!isStepValid()}
                  >
                    Next Step
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                ) : (
                  <Button type="submit" className="bg-green-500 hover:bg-green-600" disabled={!isStepValid()}>
                    {isLoading ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <div className="flex items-center justify-center">
                        <Check className="h-4 w-4 mr-2" />
                        Complete Setup
                      </div>
                    )}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  )
}
