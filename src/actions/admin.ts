"use server";

import { ResponseTS } from "@/types";
import { UserRole } from "@prisma/client";
import currentRole from "@/lib/current-role";

const adminAction = async (): Promise<ResponseTS> => {
  const role = await currentRole();
  if (role === UserRole.ADMIN) {
    return { success: "Allowed!", error: null };
  }
  return { success: null, error: "Forbidden!" };
};

export { adminAction };
