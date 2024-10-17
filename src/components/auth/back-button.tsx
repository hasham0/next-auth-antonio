import React, { FC } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type Props = {
  label: string;
  href: string;
};

const BackButton: FC<Props> = ({ href, label }) => {
  return (
    <Button className="w-full font-normal" variant={"link"} size={"sm"} asChild>
      <Link href={href}>{label}</Link>
    </Button>
  );
};

export default BackButton;
