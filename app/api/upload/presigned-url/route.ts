// app/api/upload/presigned-url/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'

const s3Client = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const session = await auth.api.getSession({
      headers: await headers()
    })

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { fileName, fileType, fileSize } = await request.json()

    // Validate file type
    if (!fileType.startsWith('image/')) {
      return NextResponse.json(
        { error: 'Only image files are allowed' },
        { status: 400 }
      )
    }

    // Validate file size (2MB limit)
    const maxSize = 2 * 1024 * 1024 // 2MB in bytes
    if (fileSize > maxSize) {
      return NextResponse.json(
        { error: 'File size too large' },
        { status: 400 }
      )
    }

    // Generate unique file name
    const timestamp = Date.now()
    const randomId = Math.random().toString(36).substring(2)
    const fileExtension = fileName.split('.').pop()
    const uniqueFileName = `${session.user.id}/${timestamp}-${randomId}.${fileExtension}`

    const bucketName = process.env.AWS_S3_BUCKET_NAME!
    
    // Create presigned URL for PUT operation
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: uniqueFileName,
      ContentType: fileType,
      Metadata: {
        userId: session.user.id,
        originalName: fileName,
      },
    })

    const uploadUrl = await getSignedUrl(s3Client, command, { 
      expiresIn: 300 // 5 minutes
    })

    // Construct the public URL for the uploaded file
    const fileUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${uniqueFileName}`

    return NextResponse.json({
      uploadUrl,
      fileUrl,
      fileName: uniqueFileName,
    })

  } catch (error) {
    console.error('Error generating presigned URL:', error)
    return NextResponse.json(
      { error: 'Failed to generate upload URL' },
      { status: 500 }
    )
  }
}