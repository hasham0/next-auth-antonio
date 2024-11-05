import { auth, signOut } from "@/authentication/auth";
import { Button } from "@/components/ui/button";
import React from "react";

type Props = {};

export default async function SettingsPage({}: Props) {
  const session = await auth();
  console.log("🚀 ~ SettingsPage ~ session => ", session?.user.role);
  return (
    <div>
      <h1>Settings Page</h1>
      <p>{JSON.stringify(session)}</p>
      <form
        action={async () => {
          "use server";
          await signOut({
            redirect: true,
            redirectTo: "/login",
          });
        }}
      >
        <Button type="submit">Sign Out</Button>
      </form>
    </div>
  );
}
