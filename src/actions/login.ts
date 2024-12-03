"use server";

import { signIn } from "@/authentication/auth";
import { getUserByEmail } from "@/database/db_queries/user";
import { LoginSchema, LoginSchemaTS } from "@/database/schemas";
import { generateVerificationToken } from "@/services/tokens";
import { sendVerificationEmail } from "@/services/mail";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes/routes";
import { ResponseTS, UserTS } from "@/types";
import { AuthError } from "next-auth";

const loginAction = async (value: LoginSchemaTS): Promise<ResponseTS> => {
  const validateFields = await LoginSchema.safeParseAsync(value);
  if (!validateFields.success) {
    return {
      success: null,
      error: "Invalid Crdentials",
    };
  }
  const { email, password } = validateFields.data;

  // TODO: check if user existed
  const isUserExisted: UserTS = await getUserByEmail(email);
  if (!isUserExisted || !isUserExisted.email || !isUserExisted.password) {
    return { success: null, error: "Email does not Exit" };
  }

  if (!isUserExisted.emailVerified) {
    const verificationToken = await generateVerificationToken(
      isUserExisted.email,
    );
    await sendVerificationEmail(
      verificationToken?.email as string,
      verificationToken?.token as string,
    );
    return { success: "Confirmation email sent", error: null };
  }

  try {
    const currentUser = await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    return currentUser;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: null, error: "Invalid Crdentials" };
        case "OAuthAccountNotLinked":
          return { success: null, error: "Email already in use!" };
        default:
          return { success: null, error: "Something Went Wrong in Login" };
      }
    }
    throw error;
  }
};

export { loginAction };
