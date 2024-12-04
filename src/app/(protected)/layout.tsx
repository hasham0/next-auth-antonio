import React, { ReactNode } from "react";
import Navbar from "@/app/(protected)/_components/navbar";

type Props = { children: ReactNode };

export default function ProtectedLayout({ children }: Props) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-y-10 bg-sky-500">
      <Navbar />
      {children}
    </div>
  );
}
