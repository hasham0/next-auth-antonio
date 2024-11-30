"use server";
import prismaDB from "@/database/db";
import { NewPasswordSchema } from "@/database/schemas";
import { ResponseTS } from "@/types";
import { AuthError } from "next-auth";
const newPassword = async (
  value: string,
  token: string,
): Promise<ResponseTS> => {
  try {
    if (!token) {
      return { success: null, error: "Token is missing" };
    }
    const validateFields = await NewPasswordSchema.safeParseAsync(value);

    if (!validateFields.success) {
      return { success: null, error: "Invalid Email Fields" };
    }
    const { password } = validateFields.data;
    console.log("🚀 ~ password:", password);

    return { success: "23", error: "" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "Verification":
          return { success: null, error: "email not verified" };
        default:
          return {
            success: null,
            error: "Something Went Wrong in email verification",
          };
      }
    }
    throw error;
  }
};

export { newPassword };
