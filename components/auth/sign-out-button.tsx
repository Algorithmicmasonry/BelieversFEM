"use client";


import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

const SignOutButton = () => {
  const router = useRouter();

  const handleClick = async () => {
    await signOut();
  };
  return (
    <div
      onClick={handleClick}
      className="flex items-center justify-between w-18 cursor-pointer"
    >
      <LogOut />
      Log Out
    </div>
  );
};

export default SignOutButton;
