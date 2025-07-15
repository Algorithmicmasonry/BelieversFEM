"use client";

import React from "react";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";

export default function SignInSocial({
  children,
}: {
  provider:
    | "github"
    | "apple"
    | "discord"
    | "facebook"
    | "google"
    | "microsoft"
    | "spotify"
    | "twitch"
    | "twitter"
    | "dropbox"
    | "linkedin"
    | "gitlab"
    | "tiktok"
    | "reddit"
    | "roblox"
    | "vk"
    | "kick";
  children: React.ReactNode;
}) {
  return (
    <Button asChild
        onClick={() => signIn("google")}
    >
      {children}
    </Button>
  );
}