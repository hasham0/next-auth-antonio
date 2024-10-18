"use server";

import { LoginSchema, LoginSchemaTS } from "@/db/schemas";

const loginAction = async (value: LoginSchemaTS) => {
  const validateFields = await LoginSchema.safeParseAsync(value);
  if (!validateFields.success) {
    return { error: "Invalid Crdentials" };
  }
  return { success: "Email Sent!" };
};

export { loginAction };
