import RegisterForm from "@/components/auth/register-form";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Registration",
};

type Props = {};

export default function RegisterPage({}: Props) {
  return <RegisterForm />;
}
