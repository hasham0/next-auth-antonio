"use server";
import { signIn } from "@/authentication/auth";
import { LoginSchema, LoginSchemaTS } from "@/database/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes/routes";
import { ResponseTS } from "@/types";
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
  try {
    const ss = await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    console.log("🚀 ~ loginAction ~ ss:", ss);
    return ss;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: null, error: "Invalid Crdentials" };
        default:
          return { success: null, error: "Something Went Wrong in Login" };
      }
    }
    throw error;
  }
};

export { loginAction };
