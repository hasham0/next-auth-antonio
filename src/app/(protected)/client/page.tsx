"use client";

import React from "react";
import UserInfo from "../_components/user-info";
import useCurrentUser from "@/hooks/use-current-user";
import { Laptop } from "lucide-react";

type Props = {};

export default function ClientPage({}: Props) {
  const user = useCurrentUser();
  return <UserInfo label="Client Component" user={user} Icon={Laptop} />;
}
