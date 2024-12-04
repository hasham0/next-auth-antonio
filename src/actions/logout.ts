"use server";

import { signOut } from "@/authentication/auth";
const logoutAction = async () => {
  await signOut();
};

export { logoutAction };
