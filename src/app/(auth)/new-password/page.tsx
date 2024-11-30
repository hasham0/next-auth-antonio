import NewPasswordForm from "@/components/auth/new-password-form";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "New Password",
};

type Props = {};

export default function NewPassword({}: Props) {
  return <NewPasswordForm />;
}
