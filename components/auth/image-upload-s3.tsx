"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Upload, X, ImageIcon, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ImageUploadProps {
  value?: string
  onChange: (value: string) => void
  maxSize?: number // in MB
  className?: string
  placeholder?: string
  uploadType?: 'product' | 'logo' | 'general'
}

export function ImageUpload({
  value,
  onChange,
  maxSize,
  className,
  placeholder = "Upload Image",
  uploadType = 'general',
}: ImageUploadProps) {
  // Set default max sizes based on upload type
  const defaultMaxSize = maxSize || (uploadType === 'product' ? 15 : uploadType === 'logo' ? 8 : 10)
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const uploadToS3 = async (file: File): Promise<string> => {
    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Get presigned URL from your server
      const response = await fetch('/api/upload/presigned-url', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to get upload URL')
      }

      const { uploadUrl, fileUrl } = await response.json()

      // Upload file to S3 using presigned URL
      const uploadResponse = await fetch(uploadUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      })

      if (!uploadResponse.ok) {
        throw new Error('Failed to upload file')
      }

      setUploadProgress(100)
      return fileUrl

    } catch (error) {
      console.error('Upload error:', error)
      throw error
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const handleFileSelect = async (file: File) => {
    // Check file size
    if (file.size > defaultMaxSize * 1024 * 1024) {
      alert(`File size must be less than ${defaultMaxSize}MB`)
      return
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file")
      return
    }

    try {
      // Create temporary preview
      const previewUrl = URL.createObjectURL(file)
      onChange(previewUrl)

      // Upload to S3
      const s3Url = await uploadToS3(file)
      
      // Replace preview with S3 URL
      URL.revokeObjectURL(previewUrl)
      onChange(s3Url)

    } catch (error) {
      alert('Failed to upload image. Please try again.')
      onChange("")
    }
  }

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragging(false)

    const file = event.dataTransfer.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragging(false)
  }

  const removeImage = () => {
    onChange("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const openFileDialog = () => {
    if (!isUploading) {
      fileInputRef.current?.click()
    }
  }

  if (value) {
    return (
      <div className={cn("relative inline-block", className)}>
        <img
          src={value}
          alt="Uploaded preview"
          className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
        />
        {isUploading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
            <div className="text-white text-center">
              <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2" />
              <p className="text-sm">Uploading... {uploadProgress}%</p>
            </div>
          </div>
        )}
        <Button
          onClick={removeImage}
          variant="outline"
          size="sm"
          className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 bg-red-500 text-white hover:bg-red-600 border-red-500"
          type="button"
          disabled={isUploading}
        >
          <X className="h-3 w-3" />
        </Button>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInput} className="hidden" />
      </div>
    )
  }

  return (
    <div className={cn("w-full", className)}>
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 text-center transition-colors",
          isUploading ? "cursor-not-allowed opacity-50" : "cursor-pointer",
          isDragging ? "border-orange-400 bg-orange-50" : "border-gray-300 hover:border-orange-300",
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={openFileDialog}
      >
        {isUploading ? (
          <div className="space-y-4">
            <Loader2 className="h-12 w-12 text-orange-500 mx-auto animate-spin" />
            <div className="space-y-2">
              <p className="text-sm font-medium">Uploading...</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-orange-500 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <div className="space-y-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="border-orange-200 text-orange-600 hover:bg-orange-50"
                onClick={(e) => {
                  e.stopPropagation()
                  openFileDialog()
                }}
              >
                <Upload className="h-4 w-4 mr-2" />
                {placeholder}
              </Button>
              <p className="text-sm text-gray-500">PNG, JPG up to {defaultMaxSize}MB</p>
              <p className="text-xs text-gray-400">Or drag and drop your image here</p>
            </div>
          </>
        )}
      </div>

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInput} className="hidden" />
    </div>
  )
}