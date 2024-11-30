import prismaDB from "@/database/db";
import { ResetPasswordTokenTS } from "@/types";

const getPasswordResetTokenByToken = async (
  token: string,
): Promise<ResetPasswordTokenTS> => {
  try {
    const passwordResetToken = await prismaDB.resetPasswordToken.findUnique({
      where: { token },
    });

    return passwordResetToken;
  } catch (error) {
    console.error("Error generating verification token:", error);
    return null; // Return null or handle the error as needed
  }
};

const getPasswordResetTokenByEmail = async (
  email: string,
): Promise<ResetPasswordTokenTS> => {
  try {
    const passwordResetToken = await prismaDB.resetPasswordToken.findUnique({
      where: { email },
    });

    return passwordResetToken;
  } catch (error) {
    console.error("Error generating verification token:", error);
    return null; // Return null or handle the error as needed
  }
};

export { getPasswordResetTokenByToken, getPasswordResetTokenByEmail };
