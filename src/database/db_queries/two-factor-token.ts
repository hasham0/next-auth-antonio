import prismaDB from "@/database/db";
import { TwoFactorTokenTS } from "@/types";

const getTwoFactorTokenByToken = async (
  token: string,
): Promise<TwoFactorTokenTS> => {
  try {
    const towFactorToken = await prismaDB.twoFactorToken.findUnique({
      where: {
        token,
      },
    });
    return towFactorToken;
  } catch (error) {
    console.error("🚀 ~ Two factor token ~ error:", error);
    return null;
  }
};

const getTwoFactorTokenByEmail = async (
  email: string,
): Promise<TwoFactorTokenTS> => {
  try {
    const towFactorTokenEmail = await prismaDB.twoFactorToken.findFirst({
      where: {
        email,
      },
    });
    return towFactorTokenEmail;
  } catch (error) {
    console.error("🚀 ~ Two factor token email ~ error:", error);
    return null;
  }
};

export { getTwoFactorTokenByToken, getTwoFactorTokenByEmail };
