"use client";

import Link from "next/link";
import { NavTS } from "@/types";
import React, { FC } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import UserButton from "@/components/auth/user-button";

type Props = {};

const navItems: Array<NavTS> = [
  { label: "Server", href: "/server" },
  { label: "Client", href: "/client" },
  { label: "Admin", href: "/admin" },
  { label: "Settings", href: "/settings" },
];

const Navbar: FC<Props> = ({}) => {
  const pathname = usePathname();

  return (
    <nav className="flex w-[600px] items-center justify-between rounded-xl bg-secondary p-4 shadow-sm">
      <div className="flex gap-x-2">
        {navItems.map((item: NavTS, index: number) => (
          <Button
            key={index}
            asChild
            variant={pathname === item.href ? "default" : "outline"}
          >
            <Link href={item.href}>{item.label}</Link>
          </Button>
        ))}
      </div>
      <UserButton />
    </nav>
  );
};

export default Navbar;
