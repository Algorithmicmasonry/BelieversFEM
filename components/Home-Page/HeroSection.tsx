import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="w-full">
      <div className="p-2 sm:p-4">
        <div
          className="flex min-h-[400px] sm:min-h-[480px] md:min-h-[500px] flex-col gap-4 sm:gap-6 md:gap-8 bg-cover bg-center bg-no-repeat rounded-lg sm:rounded-xl items-center justify-center p-4 sm:p-6 md:p-8"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.4) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCsKUf3FjOF1sPfu4hSdGRyoc_ZibmXG_rcfG8qLdRL3cyQQGo_7rAluLZGwHDQaOHus7wjTOKJjWp_KYHLQLCQcoRC3a3lDTSfJBh0pMS9LDsHCmnE80SCWvscDJAzw7ZY4_B1O0GN7x74BtY9e2LiZItg9TOqTKgp1lNTz3yBjNhwHVcf6_dllkkKgFJLYk2WQHGEIMD1a99buZbJ34BHRnCJzXU2tpHqM0LCWvQ6-SQmY0tg5IEisrkvBJdTb2PzyvjZcg4HRPI")',
          }}
        >
          <div className="flex flex-col gap-2 sm:gap-3 text-center max-w-4xl mx-auto px-2">
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-[-0.033em]">
              Welcome to BIBLE FAITH EVANGELICAL MINISTRIES
            </h1>
            <h2 className="text-white text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-3xl mx-auto mt-3">
              Making disciples of all nations. To passionately proclaim the
              gospel of Jesus Christ globally, making disciples and building
              vibrant communities of faith.
            </h2>
          </div>
          <Button className="flex w-full max-w-[150px] md:max-w-[300px] cursor-pointer items-center justify-center overflow-hidden rounded-md bg-primary text-primary-foreground text-sm sm:text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary-foreground hover:text-primary transition-colors py-4 px-6 border-2" 
          
          size="lg">
            Explore
            <ExternalLink />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
