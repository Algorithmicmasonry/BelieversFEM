"use client"

import { Button } from "@/components/ui/button"

interface NewsletterProps {
  number: string
}

export default function Newsletter({number}: NewsletterProps) {

   const handleOrderClick = () => {
   
    // Construct the message
    let message = `Hello! I saw your store online and i'm  interested in .......`;

    message += `\nCould you please provide more details or help me with the order?`;

    // Encode the message for the URL
    const encodedMessage = encodeURIComponent(message);

    // Construct the WhatsApp URL
    const whatsappUrl = `https://wa.me/${number}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');
  };
  
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Have A Question</h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          Send us a message on whatsapp for enquiries on any of our products or services
        </p>

        <div className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Button className="bg-blue-600 hover:bg-blue-700"  onClick={handleOrderClick}>Message us on Whatsapp</Button>
          </div>
          <p className="text-sm text-gray-400 mt-4">You are important to us. We&apos;ll reply your message as fast as possible</p>
        </div>
      </div>
    </section>
  )
}
