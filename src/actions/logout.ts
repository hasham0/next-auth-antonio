"use server";

import { signOut } from "@/authentication/auth";
const logoutAction = async () => {
  await signOut({
    redirect: true,
    redirectTo: "/login",
  });
};

export { logoutAction };
