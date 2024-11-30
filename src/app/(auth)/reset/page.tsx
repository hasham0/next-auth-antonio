import ResetForm from "@/components/auth/reset-form";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Forget Password",
};

type Props = {};

export default function Reset({}: Props) {
  return <ResetForm />;
}
