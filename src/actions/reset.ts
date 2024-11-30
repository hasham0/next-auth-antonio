"use server";
import { generatePasswordResetToken } from "@/services/tokens";
import { sendPasswordResetEmail } from "@/services/mail";
import { ResetSchema, ResetSchemaTS } from "@/database/schemas";
import { getUserByEmail } from "@/database/db_queries/user";
import { ResponseTS, UserTS } from "@/types";
import { AuthError } from "next-auth";

const resetPasswordAction = async (
  value: ResetSchemaTS,
): Promise<ResponseTS> => {
  try {
    const validateFields = await ResetSchema.safeParseAsync(value);

    if (!validateFields.success) {
      return { success: null, error: "Invalid Email Fields" };
    }
    const { email } = validateFields.data;

    const isUserExisted: UserTS = await getUserByEmail(email);
    if (!isUserExisted) {
      return { success: null, error: "Email not found" };
    }

    // TODO: generate token and send email
    const passwordResetToken = await generatePasswordResetToken(email);
    await sendPasswordResetEmail(
      passwordResetToken?.email as string,
      passwordResetToken?.token as string,
    );

    return { success: "Reset email sent!", error: null };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "EmailSignInError":
          return { success: null, error: "Invalid Crdentials" };
        case "SessionTokenError":
          return { success: null, error: "token expired!" };
        default:
          return {
            success: null,
            error: "Something Went Wrong in Registration",
          };
      }
    }
    throw error;
  }
};
export { resetPasswordAction };
