import NewVerificationForm from "@/components/auth/new-verification-form";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "verification",
};

type Props = {};

export default function NewVerification({}: Props) {
  return <NewVerificationForm />;
}
