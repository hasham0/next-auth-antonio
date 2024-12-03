import LoginButton from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";
import { Poppins } from "next/font/google";

const fontPoppins = Poppins({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-geist-pops",
});
export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-sky-600">
      <div className="space-y-6 text-center">
        <h1
          className={cn(
            "flex items-center gap-2 text-6xl font-semibold text-white drop-shadow-md",
            fontPoppins.className,
          )}
        >
          <Lock size={50} />
          <span>Auth</span>
        </h1>
        <p className="text-lg text-white">A simple authentication service</p>
        <div>
          <LoginButton>
            <Button size={"lg"} variant={"secondary"}>
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
