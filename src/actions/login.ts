"use server";

import { signIn } from "@/authentication/auth";
import { getUserByEmail } from "@/database/db_queries/user";
import { LoginSchema, LoginSchemaTS } from "@/database/schemas";
import {
  generateVerificationToken,
  generateTwoFactorToken,
} from "@/services/tokens";
import {
  sendVerificationEmail,
  sendTwoFactorTokenEmail,
} from "@/services/mail";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes/routes";
import { ResponseTS, TwoFactorTS, UserTS } from "@/types";
import { AuthError } from "next-auth";
import { getTwoFactorTokenByEmail } from "@/database/db_queries/two-factor-token";
import prismaDB from "@/database/db";
import { getTwoFactorConfirmationByUserId } from "@/database/db_queries/two-factor-confirmation";

const loginAction = async (
  value: LoginSchemaTS,
): Promise<ResponseTS | TwoFactorTS> => {
  const validateFields = await LoginSchema.safeParseAsync(value);
  if (!validateFields.success) {
    return {
      success: null,
      error: "Invalid Crdentials",
    };
  }
  const { email, password, code } = validateFields.data;

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
  if (isUserExisted.isTwoFactorEnabled && isUserExisted.email) {
    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(
        isUserExisted.email,
      );
      if (!twoFactorToken) {
        return { success: null, error: "Invalid code!" };
      }
      if (twoFactorToken.token !== code) {
        return { success: null, error: "Invalid code!" };
      }

      const hasExpired = new Date(twoFactorToken.expired) < new Date();
      if (hasExpired) {
        return { success: null, error: "Code expired!" };
      }
      await prismaDB.twoFactorToken.delete({
        where: {
          id: twoFactorToken.id,
        },
      });
      const isExistingConfirmation = await getTwoFactorConfirmationByUserId(
        isUserExisted.id,
      );
      if (isExistingConfirmation) {
        await prismaDB.twoFactorConfirmation.delete({
          where: {
            id: isUserExisted.id,
          },
        });
      }
      await prismaDB.twoFactorConfirmation.create({
        data: {
          userId: isUserExisted.id,
        },
      });
    } else {
      const twoFactotToken = await generateTwoFactorToken(isUserExisted.email);
      await sendTwoFactorTokenEmail(
        twoFactotToken?.email as string,
        twoFactotToken?.token as string,
      );
      return { twoFactor: true, message: "2FA token send" };
    }
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
