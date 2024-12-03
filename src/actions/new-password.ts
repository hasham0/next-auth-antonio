"use server";

import bcryptjs from "bcryptjs";
import prismaDB from "@/database/db";
import { getPasswordResetTokenByToken } from "@/database/db_queries/reset-password-token";
import { getUserByEmail } from "@/database/db_queries/user";
import { NewPasswordSchema, NewPasswordSchemaTS } from "@/database/schemas";
import { ResponseTS } from "@/types";
import { AuthError } from "next-auth";

type newPasswordTS = {
  value: NewPasswordSchemaTS;
  token: string | null;
};

const newPasswordAction = async ({
  value,
  token,
}: newPasswordTS): Promise<ResponseTS> => {
  if (!token) {
    return { success: null, error: "Token is missing" };
  }
  try {
    // TODO: validate field
    const validateFields = await NewPasswordSchema.safeParseAsync({
      password: value.password,
    });
    if (!validateFields.success) {
      return { success: null, error: "Invalid Fields" };
    }
    const { password } = validateFields.data;

    //TODO: check if token exist and has expired or not
    const isExistingToken = await getPasswordResetTokenByToken(token);
    if (!isExistingToken) {
      return { success: null, error: "Invalid token!" };
    }
    const hasExpired = new Date(isExistingToken.expired) < new Date();
    if (hasExpired) {
      return { success: null, error: "Token has expired!" };
    }

    //TODO: check if user exist or not
    const isExistingUser = await getUserByEmail(isExistingToken.email);
    if (!isExistingUser) {
      return { success: null, error: "Email does not exist!" };
    }

    //TODO: generate new salt and hashed password
    const salt = await bcryptjs.genSalt(
      parseInt(process.env.SALT_ROUND as string),
    );
    const newHashedPassword = await bcryptjs.hash(password, salt);

    //TODO: update password and delete reset token
    await prismaDB.user.update({
      where: { id: isExistingUser.id },
      data: { password: newHashedPassword },
    });
    await prismaDB.resetPasswordToken.delete({
      where: { id: isExistingToken.id },
    });

    return { success: "Password Updated", error: null };
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

export { newPasswordAction };
