import React, { FC, ReactNode } from "react";
import { logoutAction } from "@/actions/logout";

type Props = { children: ReactNode };

const LogoutButton: FC<Props> = ({ children }) => {
  const handleClick = () => {
    logoutAction();
  };
  return (
    <span onClick={handleClick} className="cursor-pointer">
      {children}
    </span>
  );
};

export default LogoutButton;
