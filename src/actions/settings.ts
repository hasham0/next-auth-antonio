"use server";

import bcryptjs from "bcryptjs";
import { ResponseTS } from "@/types";
import prismaDB from "@/database/db";
import currentUser from "@/lib/current-user";
import { SettingsSchemaTS } from "@/database/schemas";
import { getUserByEmail, getUserByID } from "@/database/db_queries/user";
import { generateVerificationToken } from "@/services/tokens";
import { sendVerificationEmail } from "@/services/mail";

const settingsAction = async (
  values: SettingsSchemaTS,
): Promise<ResponseTS> => {
  const user = await currentUser();
  if (!user) {
    return { success: null, error: "Unauthorized" };
  }
  const dbUser = await getUserByID(user?.id as string);
  if (!dbUser) {
    return { success: null, error: "Unauthorized" };
  }
  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const isUserExist = await getUserByEmail(values.email);
    if (isUserExist && isUserExist.id !== user.id) {
      return { success: null, error: "Email already in use!" };
    }

    const verificationToken = await generateVerificationToken(
      values.email as string,
    );
    await sendVerificationEmail(
      verificationToken?.email as string,
      verificationToken?.token as string,
    );
    return { success: "Verification email sent!", error: null };
  }
  if (values.password && values.newPassword && dbUser.password) {
    const isPasswordMatch = await bcryptjs.compare(
      values.password,
      dbUser.password,
    );
    if (!isPasswordMatch) {
      return { success: null, error: "Incorrect Password" };
    }
    const salt = await bcryptjs.genSalt(
      parseInt(process.env.SALT_ROUND as string),
    );
    const hashedPassword = await bcryptjs.hash(values.newPassword, salt);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }
  await prismaDB.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });
  return { success: "Settings Updated", error: null };
};

export { settingsAction };
