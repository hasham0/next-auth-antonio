import { auth } from "@/authentication/auth";
import React from "react";

type Props = {};

export default async function SettingsPage({}: Props) {
  const session = await auth();
  console.log("🚀 ~ SettingsPage ~ session:", session);
  return <div>page</div>;
}
