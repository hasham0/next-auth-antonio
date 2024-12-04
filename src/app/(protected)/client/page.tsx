"use client";

import useCurrentUser from "@/hooks/use-current-user";
import React from "react";
import UserInfo from "../_components/user-info";

type Props = {};

export default function ClientPage({}: Props) {
  const user = useCurrentUser();
  return <UserInfo label="Client Component" user={user} />;
}
