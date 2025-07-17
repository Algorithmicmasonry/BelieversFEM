"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, X, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface ImageUploadProps {
  value?: string
  onChange: (value: string) => void
  maxSize?: number | undefined; // in MB
  className?: string
  placeholder?: string
  uploadType: 'product' | 'logo' | 'general';
}

export function ImageUploadNormal({
  value,
  onChange,
  maxSize,
  className,
  uploadType = 'general', 
  placeholder = "Upload Image",
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const defaultMaxSize = maxSize ||  (uploadType === 'product' ? 15  : uploadType === "logo" ? 8 : 10)

  const handleFileSelect = (file: File) => {
    // Check file size
    if (file.size > defaultMaxSize * 1024 * 1024) {
      alert(`File size must be less than ${maxSize}MB`)
      return
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file")
      return
    }

    // Create preview URL
    const reader = new FileReader()
    reader.onload = (e) => {
      onChange(e.target?.result as string)
    }
    reader.readAsDataURL(file)
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
    fileInputRef.current?.click()
  }

  if (value) {
    return (
      <div className={cn("relative inline-block", className)}>
        <Image
          src={value || "/placeholder.svg"}
          alt="Uploaded preview"
          className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
          width={100}
          height={100}
        />
        <Button
          onClick={removeImage}
          variant="outline"
          size="sm"
          className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 bg-red-500 text-white hover:bg-red-600 border-red-500"
          type="button"
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
          "border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer",
          isDragging ? "border-orange-400 bg-orange-50" : "border-gray-300 hover:border-orange-300",
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={openFileDialog}
      >
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
          <p className="text-sm text-gray-500">PNG, JPG up to {maxSize}MB</p>
          <p className="text-xs text-gray-400">Or drag and drop your image here</p>
        </div>
      </div>

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInput} className="hidden" />
    </div>
  )
}
