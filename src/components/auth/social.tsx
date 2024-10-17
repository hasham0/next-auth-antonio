"use client";
import React, { FC } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";

type Props = {};

const Social: FC<Props> = ({}) => {
  return (
    <div className="flex w-full items-center gap-x-2">
      <Button
        size={"lg"}
        variant={"outline"}
        className="w-full"
        onClick={() => {
          console.log("google login");
        }}
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        size={"lg"}
        variant={"outline"}
        className="w-full"
        onClick={() => {
          console.log("github login");
        }}
      >
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default Social;
