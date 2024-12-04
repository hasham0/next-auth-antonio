import currentUser from "@/lib/current-user";
import React from "react";
import UserInfo from "../_components/user-info";

type Props = {};

export default async function ServerPage({}: Props) {
  const user = await currentUser();
  return <UserInfo label="Server Component" user={user} />;
}
