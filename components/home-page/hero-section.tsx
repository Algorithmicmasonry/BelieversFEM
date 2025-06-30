import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SmallTitle from "./small-title";
import Link from "next/link";
import { CustomLinkButton } from "@/global/CustomLinkButton";
import StarRating from "@/global/StarRating";
import { AnimatedAvatars } from "@/global/avatar-circles";


export default async function HeroSection() {

  return (
    <section className="relative min-h-[100vh] w-full flex items-center justify-center bg-background text-foreground">
      <div className="container max-w-6xl mx-auto px-4 md:px-6 flex flex-col items-center text-center space-y-8">
        <SmallTitle title=" Welcome to Ekki Store (v1)🛍️" />
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl max-w-3xl mx-auto">
          Launch Your Online Store<span className="text-primary"> in Minutes</span>  
        </h1>

        <p className="mx-auto max-w-[700px] text-muted-foreground text-sm sm:text-lg">
         Forget the stress of manually selling your products on whatsapp. Easily create a professional e-commerce store with Whatsapp integration. No tech skills required. Start selling online today with your own custom subdomain
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button
            asChild
            size="lg"
            className="rounded-full h-12 px-6 text-base"
          >
            <Link href="/register">
              Create Your Own Store
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <CustomLinkButton title="Login" href="/login" />
          {/* <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 px-6 text-base"
          >
            <Link href="/pages">
              {" "}
              Explore Page sections
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button> */}
        </div>
        <div className="pt-8 pb-4 flex items-center  justify-center gap-8">
          <div className="">
            <AnimatedAvatars />
          </div>
          <div className="">
            <StarRating count={5} />
            <p className="dark:text-slate-900">Business owners use it.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
