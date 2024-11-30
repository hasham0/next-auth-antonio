import { v4 as uuidV4 } from "uuid";
import { getVerificationTokenByEmail } from "@/database/db_queries/verification-token";
import { getPasswordResetTokenByEmail } from "@/database/db_queries/reset-password-token";
import prismaDB from "@/database/db";
import { VerificationTokenTS, ResetPasswordTokenTS } from "@/types";

const generateVerificationToken = async (
  email: string,
): Promise<VerificationTokenTS> => {
  try {
    const isTokenExists = await getVerificationTokenByEmail(email);

    // Delete existing token if found
    if (isTokenExists) {
      await prismaDB.verificationToken.delete({
        where: { id: isTokenExists.id },
      });
    }

    // Generate new token and expiration date
    const token = uuidV4();
    const expires = new Date(Date.now() + 3600 * 1000); // Expires in 1 hour

    // Create and return the new verification token
    const newVerificationToken = await prismaDB.verificationToken.create({
      data: { email, token, expires },
    });
    return newVerificationToken;
  } catch (error) {
    console.error("Error generating verification token:", error);
    return null; // Return null or handle the error as needed
  }
};

const generatePasswordResetToken = async (
  email: string,
): Promise<ResetPasswordTokenTS> => {
  try {
    const isTokenExists = await getPasswordResetTokenByEmail(email);
    // Delete existing token if found
    if (isTokenExists) {
      await prismaDB.verificationToken.delete({
        where: { id: isTokenExists.id },
      });
    }

    // Generate new token and expiration date
    const token = uuidV4();
    const expires = new Date(Date.now() + 3600 * 1000); // Expires in 1 hour

    const passwordResetToken = await prismaDB.resetPasswordToken.create({
      data: {
        email,
        token,
        expires,
      },
    });
    return passwordResetToken;
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return null;
  }
};

export { generateVerificationToken, generatePasswordResetToken };
