// components/ViewStoreButton.tsx (or wherever it's located)
"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink, Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

// Define the props interface for clarity and type safety
interface ViewStoreButtonProps {
  subdomain: string | null; // The subdomain for the user's business, could be null if not onboarded
}

const ViewStoreButton = ({ subdomain }: ViewStoreButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  // Get the root domain from environment variable (client-side access)
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localhost:3000";
  const protocol = process.env.NODE_ENV === "production" ? "https" : "http"; // Match your lib/utils.ts logic

  // Construct the full store URL
  const storeUrl = subdomain ? `${protocol}://${subdomain}.${rootDomain}` : "#"; // Use '#' if subdomain is null

  // Disable the button if no subdomain is available
  const isDisabled = !subdomain;

  return (
    <Link href={storeUrl} target="_blank" passHref>
      <Button
        className="bg-sidebar-primary text-sidebar-primary-foreground w-full shadow-none"
        size="sm"
        onClick={() => setIsLoading(true)}
        disabled={isDisabled} // Disable when loading or no subdomain
      >
        View Store
        {!isLoading && <ExternalLink className="ml-2 h-4 w-4" />}{" "}
        {/* Show icon only when not loading */}
      </Button>
    </Link>
  );
};

export default ViewStoreButton;
