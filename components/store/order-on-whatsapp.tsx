// components/WhatsappOrderButton.tsx
"use client"; // Mark as a Client Component if you're using App Router

import React from 'react';
import { Button } from "@/components/ui/button"; // Your UI Button component
import { MessageCircle } from "lucide-react"; // A WhatsApp-like icon

// Define the props for your WhatsApp button component
interface WhatsappOrderButtonProps {
  productName: string;
  productPrice: number;
  productDescription?: string | null; // Optional, based on your schema
  businessWhatsappNumber: string; // The WhatsApp number of the business
}

export default function WhatsappOrderButton({
  productName,
  productPrice,
  productDescription,
  businessWhatsappNumber,
}: WhatsappOrderButtonProps) {

  // Function to generate the pre-filled WhatsApp message URL
  const handleOrderClick = () => {
    // Format the price for the message
    const formattedPrice = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(productPrice);

    // Construct the message
    let message = `Hello! I'm interested in "${productName}".`;
    message += `\nPrice: ${formattedPrice}.`;
    if (productDescription) {
      message += `\nDescription: ${productDescription}.`;
    }
    message += `\nCould you please provide more details or help me with the order?`;

    // Encode the message for the URL
    const encodedMessage = encodeURIComponent(message);

    // Construct the WhatsApp URL
    const whatsappUrl = `https://wa.me/${businessWhatsappNumber}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
  };

  return (
    <Button
      size="sm"
      onClick={handleOrderClick}
      className="bg-green-500 hover:bg-green-600 text-white" // Optional: make it green for WhatsApp
    >
      <MessageCircle className="h-4 w-4 mr-2" /> {/* WhatsApp icon */}
      Order on WhatsApp
    </Button>
  );
}