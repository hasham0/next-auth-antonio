import { auth, signOut } from "@/authentication/auth";
import { Button } from "@/components/ui/button";
import React from "react";

type Props = {};

export default async function SettingsPage({}: Props) {
  const session = await auth();
  console.log("🚀 ~ SettingsPage ~ session:", session?.user.role);
  return (
    <div>
      <h1>Settings Page</h1>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type="submit">Sign Out</Button>
      </form>
    </div>
  );
}
