import prismaDB from "@/database/db";
import { TwoFactorConfirmationTS } from "@/types";

const getTwoFactorConfirmationByUserId = async (
  userId: string,
): Promise<TwoFactorConfirmationTS> => {
  try {
    const twoFactorConfirmation =
      await prismaDB.twoFactorConfirmation.findUnique({
        where: {
          userId: userId,
        },
      });
    return twoFactorConfirmation;
  } catch (error) {
    console.error("🚀 ~ Two factor token ~ error:", error);
    return null;
  }
};

export { getTwoFactorConfirmationByUserId };
