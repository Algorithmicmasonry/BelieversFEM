"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Upload, ImageIcon } from "lucide-react"
import Image from "next/image"

interface ImageUploadMultipleProps {
  value: string[]
  onChange: (urls: string[]) => void
  maxImages?: number
  placeholder?: string
}

export function ImageUploadMultiple({
  value = [],
  onChange,
  maxImages = 5,
  placeholder = "Upload Product Images",
}: ImageUploadMultipleProps) {
  const [isUploading, setIsUploading] = useState(false)

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)

    try {
      const uploadPromises = Array.from(files)
        .slice(0, maxImages - value.length)
        .map(async (file) => {
          // Simulate upload - replace with your actual upload logic
          return new Promise<string>((resolve) => {
            const reader = new FileReader()
            reader.onload = () => {
              // In a real app, you'd upload to your storage service here
              // For now, we'll use the data URL as a placeholder
              resolve(reader.result as string)
            }
            reader.readAsDataURL(file)
          })
        })

      const uploadedUrls = await Promise.all(uploadPromises)
      const newUrls = [...value, ...uploadedUrls]
      onChange(newUrls)
    } catch (error) {
      console.error("Upload failed:", error)
    } finally {
      setIsUploading(false)
      // Reset the input
      event.target.value = ""
    }
  }

  const removeImage = (indexToRemove: number) => {
    const newUrls = value.filter((_, index) => index !== indexToRemove)
    onChange(newUrls)
  }

  const canAddMore = value.length < maxImages

  return (
    <div className="space-y-4">
      {/* Upload Button */}
      {canAddMore && (
        <div className="flex items-center gap-4">
          <Label htmlFor="image-upload" className="cursor-pointer">
            <div className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-orange-400 transition-colors">
              <Upload className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-600">{isUploading ? "Uploading..." : placeholder}</span>
            </div>
          </Label>
          <Input
            id="image-upload"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
            disabled={isUploading}
            className="hidden"
          />
          <span className="text-xs text-gray-500">
            {value.length}/{maxImages} images
          </span>
        </div>
      )}

      {/* Image Preview Grid */}
      {value.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {value.map((url, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden border border-gray-200">
                {url.startsWith("data:") ? (
                  // Handle data URLs (base64 images)
                  <Image
                    src={url || "/placeholder.svg"}
                    alt={`Product image ${index + 1}`}
                    className="w-full h-full object-cover"
                    width={50}
                    height={100}
                  />
                ) : (
                  // Handle regular URLs
                  <Image
                    src={url || "/placeholder.svg?height=150&width=150"}
                    alt={`Product image ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              {/* Remove Button */}
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(index)}
              >
                <X className="h-3 w-3" />
              </Button>

              {/* Image Number */}
              <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                {index + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty State */}
      {value.length === 0 && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-sm">No images uploaded yet</p>
          <p className="text-gray-400 text-xs mt-1">You can upload up to {maxImages} images per product</p>
        </div>
      )}

      {/* Help Text */}
      <p className="text-xs text-gray-500">
        Recommended: Upload high-quality images (JPG, PNG) for best results. The first image will be used as the main
        product image.
      </p>
    </div>
  )
}
