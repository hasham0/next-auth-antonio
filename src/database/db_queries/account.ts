import prismaDB from "@/database/db";
import { AccountTS } from "@/types";

const getAccountByUserId = async (userId: string): Promise<AccountTS> => {
  try {
    const account = await prismaDB.account.findFirst({
      where: { userId: userId },
    });
    return account;
  } catch (error) {
    console.error("🚀 ~ getAccountByUserId ~ error:", error);
    return null;
  }
};

export { getAccountByUserId };
