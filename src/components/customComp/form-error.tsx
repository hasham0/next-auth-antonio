import React, { FC } from "react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

type Props = {
  message?: string;
};

const FormError: FC<Props> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="flex items-center gap-x-2 rounded-md bg-destructive/15 p-3 text-sm text-destructive">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};

export default FormError;
