"use server";
import { signIn } from "@/authentication/auth";
import { LoginSchema, LoginSchemaTS } from "@/database/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes/routes";
import { AuthError } from "next-auth";

const loginAction = async (value: LoginSchemaTS) => {
  const validateFields = await LoginSchema.safeParseAsync(value);
  if (!validateFields.success) {
    return { error: "Invalid Crdentials" };
  }
  const { email, password } = validateFields.data;
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Crdentials" };
        default:
          return { error: "Something Went Wrong" };
      }
    }
    throw error;
  }
};

export { loginAction };
