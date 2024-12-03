import { v4 as uuidV4 } from "uuid";
import crypto from "crypto";
import { getVerificationTokenByEmail } from "@/database/db_queries/verification-token";
import { getPasswordResetTokenByEmail } from "@/database/db_queries/reset-password-token";
import prismaDB from "@/database/db";
import {
  VerificationTokenTS,
  ResetPasswordTokenTS,
  TwoFactorTokenTS,
} from "@/types";
import { getTwoFactorTokenByEmail } from "@/database/db_queries/two-factor-token";

// TODO: generate verfication token
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
    const expired = new Date(Date.now() + 3600 * 1000); // Expires in 1 hour

    // Create and return the new verification token
    const newVerificationToken = await prismaDB.verificationToken.create({
      data: { email, token, expired },
    });
    return newVerificationToken;
  } catch (error) {
    console.error("Error generating verification token:", error);
    return null; // Return null or handle the error as needed
  }
};

// TODO: generate two factor token
const generateTwoFactorToken = async (
  email: string,
): Promise<TwoFactorTokenTS> => {
  try {
    const isExistingToken = await getTwoFactorTokenByEmail(email);
    if (isExistingToken) {
      await prismaDB.twoFactorToken.delete({
        where: {
          id: isExistingToken.id,
        },
      });
    }
    const token = crypto.randomInt(100_000, 1_000_000).toString();
    const expired = new Date(new Date().getTime() + 3600 * 1000);
    const twoFactorToken = await prismaDB.twoFactorToken.create({
      data: {
        email,
        token,
        expired,
      },
    });
    return twoFactorToken;
  } catch (error) {
    console.error("🚀 ~ generateTwoFactorToken ~ error:", error);
    return null;
  }
};

// TODO: generate password reset token
const generatePasswordResetToken = async (
  email: string,
): Promise<ResetPasswordTokenTS> => {
  try {
    const isTokenExists = await getPasswordResetTokenByEmail(email);

    // Delete existing token if found
    if (isTokenExists) {
      await prismaDB.verificationToken.delete({
        where: { token: isTokenExists.token },
      });
    }

    // Generate new token and expiration date
    const token = uuidV4();
    const expired = new Date(Date.now() + 3600 * 1000); // Expires in 1 hour

    const passwordResetToken = await prismaDB.resetPasswordToken.create({
      data: {
        email,
        token,
        expired,
      },
    });
    return passwordResetToken;
  } catch (error) {
    console.log("🚀 ~ error:", error);
    return null;
  }
};

export {
  generateVerificationToken,
  generateTwoFactorToken,
  generatePasswordResetToken,
};
