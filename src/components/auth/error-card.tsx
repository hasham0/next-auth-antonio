import React, { FC } from "react";
import Header from "@/components/auth/header";
import BackButton from "@/components/auth/back-button";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";

type Props = {};

const ErrorCard: FC<Props> = ({}) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <Header label="Something went Wrong!" />
      </CardHeader>
      <CardFooter>
        <BackButton label="back to login" href="/login" />
      </CardFooter>
    </Card>
  );
};

export default ErrorCard;
