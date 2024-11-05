import prismaDB from "@/database/db";
import { VerificationTokenTS } from "@/types";

export const getVerificationTokenByToken = async (
  token: string,
): Promise<VerificationTokenTS> => {
  try {
    const verificationToken = await prismaDB.verificationToken.findUnique({
      where: { token: token },
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};

export const getVerificationTokenByEmail = async (
  email: string,
): Promise<VerificationTokenTS> => {
  try {
    const verificationToken = await prismaDB.verificationToken.findFirst({
      where: {
        email,
      },
    });
    return verificationToken;
  } catch (error) {
    return null;
  }
};
