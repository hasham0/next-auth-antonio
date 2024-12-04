"use client";

import { UserRole } from "@prisma/client";
import React, { FC, ReactNode } from "react";
import useCurrentRole from "@/hooks/use-current-role";
import FormError from "@/components/customComp/form-error";

type Props = {
  children: ReactNode;
  allowRole: UserRole;
};

const RoleGate: FC<Props> = ({ allowRole, children }) => {
  const role = useCurrentRole();
  if (role !== allowRole) {
    return (
      <FormError message="You don't have permission to view this content" />
    );
  }
  return <div>{children}</div>;
};

export default RoleGate;
