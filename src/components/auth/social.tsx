"use client";
import React, { FC } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes/routes";

type Props = {};

const Social: FC<Props> = ({}) => {
  const handleSocialLogin = async (provider: "google" | "github") => {
    const dd = await signIn(provider, {
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    console.log("🚀 ~ handleSocialLogin ~ dd:", dd);
  };
  return (
    <div className="flex w-full items-center gap-x-2">
      <Button
        size={"lg"}
        variant={"outline"}
        className="w-full"
        onClick={() => handleSocialLogin("google")}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        size={"lg"}
        variant={"outline"}
        className="w-full"
        onClick={() => handleSocialLogin("github")}
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default Social;
