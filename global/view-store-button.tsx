"use client";

import { Button } from "@/components/ui/button";
import { ExternalLink, Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const ViewStoreButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Link href="/store" target="_blank">
      <Button
        className="bg-sidebar-primary text-sidebar-primary-foreground w-full shadow-none"
        size="sm"
        onClick={() => setIsLoading(true)}
      >
        {isLoading ? <Loader2 className="animate-spin" /> : "View Store"}
        <ExternalLink />
      </Button>
    </Link>
  );
};

export default ViewStoreButton;
