import React from "react";

type Props = { children: React.ReactNode };

export default function AuthLayout({ children }: Props) {
  return (
    <section className="flex h-full items-center justify-center bg-sky-600">
      {children}
    </section>
  );
}
