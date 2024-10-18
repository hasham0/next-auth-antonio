"use server";
import bcryptjs from "bcryptjs";
import prismaDB from "@/database/db";
import { getUserByEmail } from "@/database/data/user";
import { RegisterSchema, RegisterSchemaTS } from "@/database/schemas";

const RegisterAction = async (value: RegisterSchemaTS) => {
  const validateFields = await RegisterSchema.safeParseAsync(value);

  if (!validateFields.success) {
    return { error: "Invalid Fields" };
  }
  const { username, email, password } = validateFields.data;
  const salt = await bcryptjs.genSalt(
    parseInt(process.env.SALT_ROUND as string),
  );
  const hashedPassword = await bcryptjs.hash(password, salt);

  // TODO: check if user existed
  const isUserExisted = await getUserByEmail(email);
  if (isUserExisted) {
    return { error: "Email already in use!" };
  }

  // TODO: create new user
  await prismaDB.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  // TODO: send verification token email

  return { success: "User Created Successfully!" };
};

export { RegisterAction };
