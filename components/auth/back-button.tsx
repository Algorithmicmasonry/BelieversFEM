"use client"
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

// Method 1: Simple Router Back Button
export const BackButton = () => {
  const router = useRouter()

  return (
    <Button 
      onClick={() => router.back()}
      variant="ghost"
      size="sm"
      className="flex items-center gap-2"
    >
      <ArrowLeft className="h-4 w-4" />
      Back
    </Button>
  )
}
