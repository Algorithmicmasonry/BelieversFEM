import { cn } from "@/lib/utils";
import { GraduationCap, Store } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Logo({
  variant = "light",
  size = "md",
}: {
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
}) {
  if (variant === "light") {
    return (
      <Link href="/">
        <Image
          src="/ivie1.png"
          alt="ivie_logo"
          width="100"
          height="50"
          className="cursor-pointer"
        />
      </Link>

      // <Link href="/">
      // <div className="flex items-center space-x cursor-pointer">
      //   <div className="bg-white rounded-full p-1">
      //     <span className="font-bold text-xl text-white">
      //       <Store className="h-8 w-8 text-orange-500" />
      //     </span>
      //   </div>
      //   <span className={cn(" font-bold text-xl", size === "lg" && "text-4xl")}>
      //     <span className="text-primary">Ekii</span>
      //   </span>
      // </div>
      // </Link>
    );
  } else {
    return (
      <Link href={"/"} className="flex items-center space-x-2">
        <div className="bg-white rounded-full p-1">
          <span className="text-blue-800 font-bold text-xl">
            <GraduationCap />
          </span>
        </div>
        <span className="font-bold text-xl">
          School <span className="text-blue-100">Pro</span>
        </span>
      </Link>
    );
  }
}
