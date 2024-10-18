import { cn } from "@/lib/utils";
import React, { FC } from "react";
import { Lock } from "lucide-react";
import { Poppins } from "next/font/google";

type Props = { label: string };

const fontPoppins = Poppins({
  subsets: ["latin"],
  weight: "600",
});

const Header: FC<Props> = ({ label }) => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4">
      <h1
        className={cn(
          "flex items-end gap-2 text-3xl font-semibold",
          fontPoppins.className,
        )}
      >
        <Lock size={50} />
        <span>Auth</span>
      </h1>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
};

export default Header;
