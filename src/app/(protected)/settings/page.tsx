"use client";

import { logoutAction } from "@/actions/logout";
import { Button } from "@/components/ui/button";

type Props = {};

export default function SettingsPage({}: Props) {
  const handleClick = () => {
    logoutAction();
  };

  return (
    <div className="rounded-xl bg-white p-10">
      <Button type="button" variant={"secondary"} onClick={handleClick}>
        sign out
      </Button>
    </div>
  );
}
