"use server";

import { RegisterSchema, RegisterSchemaTS } from "@/db/schemas";

const RegisterAction = async (value: RegisterSchemaTS) => {
  const validateFields = await RegisterSchema.safeParseAsync(value);
  if (!validateFields.success) {
    return { error: "Invalid Fields" };
  }
  return { success: "Email Sent!" };
};

export { RegisterAction };
