import RegisterForm from "@/components/Forms/RegisterForm";
import Image from "next/image";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "I.V.I.E - Register",
  description: "Put in your details to get started with I.V.I.E",
};


export default function RegisterPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <div className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md text-primary-foreground">
            </div>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegisterForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block border-left-2 border-orange-500">
        <Image
          width={400}
          height={400}
          src="/ekii_register_page.jpg" // Use your existing login image
          alt="Login Image"
          className="absolute inset-0 h-full w-full object-fit dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
