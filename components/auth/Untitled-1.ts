// "use client";

// import { FormEvent, useState } from "react";
// import Link from "next/link";
// import {
//   Store,
//   ArrowRight,
//   ArrowLeft,
//   Check,
//   Building,
//   Phone,
//   Package,
//   Plus,
//   Trash2,
//   Loader2,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Progress } from "@/components/ui/progress";
// import { handleOnboarding } from "@/actions/handleOnboarding";

// export default function OnboardingPageClient() {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [businessName, setBusinessName] = useState("");
//   const [businessType, setBusinessType] = useState("");
//   const [whatsappNumber, setWhatsappNumber] = useState("");
//   const [products, setProducts] = useState([
//     { name: "", description: "", price: "", imageUrl: "" },
//   ]);
//   const [isLoading, setIsLoading] = useState(false);

//   const totalSteps = 3;
//   const progress = (currentStep / totalSteps) * 100;

//   const addProduct = () => {
//     if (products.length < 5) {
//       setProducts([
//         ...products,
//         { name: "", description: "", price: "", imageUrl: "" },
//       ]);
//     }
//   };

//   const removeProduct = (index: number) => {
//     if (products.length > 1) {
//       setProducts(products.filter((_, i) => i !== index));
//     }
//   };

//   const updateProduct = (index: number, field: string, value: string) => {
//     const updatedProducts = products.map((product, i) =>
//       i === index ? { ...product, [field]: value } : product
//     );
//     setProducts(updatedProducts);
//   };

//   const generateSubdomain = (name: string) => {
//     return name
//       .toLowerCase()
//       .replace(/[^a-z0-9]/g, "-")
//       .replace(/-+/g, "-")
//       .replace(/^-|-$/g, "");
//   };

//   const nextStep = () => {
//     if (currentStep < totalSteps) {
//       setCurrentStep(currentStep + 1);
//     }
//   };

//   const prevStep = () => {
//     if (currentStep > 1) {
//       setCurrentStep(currentStep - 1);
//     }
//   };

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsLoading(true);

//     if (!businessName.trim()) {
//       console.log("Business name is required");
//     }

//     const data = {businessName, businessType, whatsappNumber, products}

//     try {
//       await handleOnboarding(data);
      
//     } catch (error) {}
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-orange-50 to-blue-50 py-8 px-4">
//       <div className="max-w-2xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="flex items-center justify-center space-x-2 mb-4">
//             <Store className="h-8 w-8 text-orange-500" />
//             <span className="text-2xl font-bold text-gray-900">Ekki</span>
//           </div>
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             Set up your store
//           </h1>
//           <p className="text-gray-600">
//             {"Let's get your online store ready in just a few steps"}
//           </p>
//         </div>

//         {/* Progress Bar */}
//         <div className="mb-8">
//           <div className="flex justify-between text-sm text-gray-600 mb-2">
//             <span>
//               Step {currentStep} of {totalSteps}
//             </span>
//             <span>{Math.round(progress)}% complete</span>
//           </div>
//           <Progress value={progress} className="h-2" />
//         </div>

//         <Card className="border-orange-100 shadow-lg">
//           <CardHeader>
//             <CardTitle className="flex items-center">
//               {currentStep === 1 && (
//                 <>
//                   <Building className="h-5 w-5 mr-2 text-orange-500" />
//                   Business Information
//                 </>
//               )}
//               {currentStep === 2 && (
//                 <>
//                   <Phone className="h-5 w-5 mr-2 text-blue-500" />
//                   Contact Details
//                 </>
//               )}
//               {currentStep === 3 && (
//                 <>
//                   <Package className="h-5 w-5 mr-2 text-green-500" />
//                   Your Products
//                 </>
//               )}
//             </CardTitle>
//             <CardDescription>
//               {currentStep === 1 && "Tell us about your business"}
//               {currentStep === 2 && "How can customers reach you?"}
//               {currentStep === 3 && "Add your products to start selling"}
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             {/* Step 1: Business Information */}
//             {currentStep === 1 && (
//               <div className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="businessName">Business Name *</Label>
//                   <Input
//                     id="businessName"
//                     value={businessName}
//                     onChange={(e) => setBusinessName(e.target.value)}
//                     placeholder="Enter your business name"
//                     required
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="businessName">Business Type*</Label>
//                   <Input
//                     id="businessType"
//                     value={businessType}
//                     onChange={(e) => setBusinessType(e.target.value)}
//                     placeholder="Enter your business type"
//                     required
//                   />
//                 </div>

//                 {businessName && (
//                   <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
//                     <p className="text-sm text-gray-600 mb-1">
//                       Your store will be available at:
//                     </p>
//                     <p className="font-medium text-orange-600">
//                       {generateSubdomain(businessName)}.ekki.com
//                     </p>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Step 2: Contact Details */}
//             {currentStep === 2 && (
//               <div className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="whatsapp">WhatsApp Number *</Label>
//                   <Input
//                     id="whatsapp"
//                     value={whatsappNumber}
//                     onChange={(e) => setWhatsappNumber(e.target.value)}
//                     placeholder="+234 801 234 5678"
//                     required
//                   />
//                   <p className="text-sm text-gray-500">
//                     Customers will use this number to contact you about orders
//                   </p>
//                 </div>
//               </div>
//             )}

//             {/* Step 3: Products */}
//             {currentStep === 3 && (
//               <div className="space-y-6">
//                 <div className="flex items-center justify-between">
//                   <h3 className="text-lg font-medium">Add Your Products</h3>
//                   <Button
//                     onClick={addProduct}
//                     disabled={products.length >= 5}
//                     variant="outline"
//                     size="sm"
//                     className="border-orange-200 text-orange-600 hover:bg-orange-50"
//                   >
//                     <Plus className="h-4 w-4 mr-1" />
//                     Add Product
//                   </Button>
//                 </div>

//                 {products.map((product, index) => (
//                   <Card key={index} className="border-gray-200">
//                     <CardHeader className="pb-3">
//                       <div className="flex items-center justify-between">
//                         <CardTitle className="text-base">
//                           Product {index + 1}
//                         </CardTitle>
//                         {products.length > 1 && (
//                           <Button
//                             onClick={() => removeProduct(index)}
//                             variant="ghost"
//                             size="sm"
//                             className="text-red-500 hover:text-red-700 hover:bg-red-50"
//                           >
//                             <Trash2 className="h-4 w-4" />
//                           </Button>
//                         )}
//                       </div>
//                     </CardHeader>
//                     <CardContent className="space-y-4">
//                       <div className="space-y-2">
//                         <Label htmlFor={`product-name-${index}`}>
//                           Product Name *
//                         </Label>
//                         <Input
//                           id={`product-name-${index}`}
//                           value={product.name}
//                           onChange={(e) =>
//                             updateProduct(index, "name", e.target.value)
//                           }
//                           placeholder="e.g., Premium T-Shirt"
//                           required
//                         />
//                       </div>

//                       <div className="space-y-2">
//                         <Label htmlFor={`product-description-${index}`}>
//                           Description
//                         </Label>
//                         <Textarea
//                           id={`product-description-${index}`}
//                           value={product.description}
//                           onChange={(e) =>
//                             updateProduct(index, "description", e.target.value)
//                           }
//                           placeholder="Brief description of your product"
//                           rows={2}
//                         />
//                       </div>

//                       <div className="space-y-2">
//                         <Label htmlFor={`product-price-${index}`}>
//                           Price (₦) *
//                         </Label>
//                         <Input
//                           id={`product-price-${index}`}
//                           type="number"
//                           value={product.price}
//                           onChange={(e) =>
//                             updateProduct(index, "price", e.target.value)
//                           }
//                           placeholder="0.00"
//                           min="0"
//                           step="0.01"
//                           required
//                         />
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}

//                 <p className="text-sm text-gray-500">
//                   You can add up to 5 products during setup. More products can
//                   be added later from your dashboard.
//                 </p>
//               </div>
//             )}

//             {/* Navigation Buttons */}
//             <div className="flex justify-between pt-6">
//               <Button
//                 onClick={prevStep}
//                 disabled={currentStep === 1}
//                 variant="outline"
//                 className="border-gray-300"
//               >
//                 <ArrowLeft className="h-4 w-4 mr-2" />
//                 Previous
//               </Button>

//               {currentStep < totalSteps ? (
//                 <Button
//                   onClick={nextStep}
//                   className="bg-orange-500 hover:bg-orange-600"
//                   disabled={
//                     (currentStep === 1 && !businessName) ||
//                     (currentStep === 2 && !whatsappNumber) ||
//                     (currentStep === 3 &&
//                       products.some((p) => !p.name || !p.price))
//                   }
//                 >
//                   Next Step
//                   <ArrowRight className="h-4 w-4 ml-2" />
//                 </Button>
//               ) : (
//                 <Button className="bg-green-500 hover:bg-green-600">
//                   {isLoading ? (
//                     <Loader2 className="animate-spin" />
//                   ) : (
//                     <div>
//                       <Check className="h-4 w-4 mr-2" />
//                       Complete Setup
//                     </div>
//                   )}
//                 </Button>
//               )}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }
