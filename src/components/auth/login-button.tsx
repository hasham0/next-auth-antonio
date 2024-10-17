"use client";
import React, { FC } from "react";
import { useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
  mode?: "model" | "redirect";
  asChild?: boolean;
};

const LoginButton: FC<Props> = ({ children, asChild, mode = "redirect" }) => {
  const router = useRouter();
  const hanldeClick = () => {
    router.push("/login");
    console.log("handle Click");
  };

  if (mode === "model") {
    return <span>TODO: Implement model</span>;
  }

  return (
    <span onClick={hanldeClick} className="cursor-pointer">
      {children}
    </span>
  );
};

export default LoginButton;
