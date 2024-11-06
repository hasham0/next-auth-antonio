"use server";

import prismaDB from "@/database/db";
import { getUserByEmail } from "@/database/data/user";
import { getVerificationTokenByToken } from "@/database/data/verification-token";
import { ResponseTS } from "@/types";
import { AuthError } from "next-auth";

const newVerification = async (token: string): Promise<ResponseTS> => {
  try {
    const isExistingToken = await getVerificationTokenByToken(token);
    if (!isExistingToken) {
      return { success: null, error: "Token does not exist" };
    }
    const isTokenHasExpired = new Date(isExistingToken.expires) < new Date();
    if (isTokenHasExpired) {
      return { success: null, error: "Token has expired!" };
    }
    const isExistingUser = await getUserByEmail(isExistingToken.email);
    if (!isExistingUser) {
      return { success: null, error: "Email does not exist" };
    }
    await prismaDB.user.update({
      where: { id: isExistingUser.id },
      data: {
        emailVerified: new Date(),
        email: isExistingToken.email,
      },
    });
    // await prismaDB.verificationToken.delete({
    //   where: { id: isExistingToken.id },
    // });
    return { success: "Email Verified", error: null };
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

export { newVerification };
