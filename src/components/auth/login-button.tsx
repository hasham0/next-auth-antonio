"use client";
import React, { FC } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LoginForm from "./login-form";
type Props = {
  children: React.ReactNode;
  mode?: "model" | "redirect";
  asChild?: boolean;
};

const LoginButton: FC<Props> = ({ children, asChild, mode = "redirect" }) => {
  const router = useRouter();
  const hanldeClick = () => {
    router.push("/login");
  };

  if (mode === "model") {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent className="w-auto border-none bg-transparent p-0">
          <LoginForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <span onClick={hanldeClick} className="cursor-pointer">
      {children}
    </span>
  );
};

export default LoginButton;
