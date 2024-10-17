"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { FC, ReactNode } from "react";
import Header from "@/components/auth/header";
import Social from "@/components/auth/social";
import BackButtonn from "@/components/auth/back-button";

type Props = {
  children: ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
};

const CardWrapper: FC<Props> = ({
  children,
  backButtonLabel,
  backButtonHref,
  headerLabel,
  showSocial = false,
}) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter className="">
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButtonn label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  );
};

export default CardWrapper;
