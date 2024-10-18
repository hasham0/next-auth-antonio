import React, { FC } from "react";
import { CheckCircledIcon } from "@radix-ui/react-icons";

type Props = {
  message?: string;
};

const FormSuccess: FC<Props> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="flex items-center gap-x-2 rounded-md bg-emerald-500/15 p-3 text-sm text-emerald-500">
      <CheckCircledIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};

export default FormSuccess;