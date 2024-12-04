"use client";
import { logoutAction } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import useCurrentUser from "@/hooks/use-current-user";

type Props = {};

export default function SettingsPage({}: Props) {
  const session = useCurrentUser();
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
