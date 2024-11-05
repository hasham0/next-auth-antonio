"use server";
import bcryptjs from "bcryptjs";
import prismaDB from "@/database/db";
import { getUserByEmail } from "@/database/data/user";
import { RegisterSchema, RegisterSchemaTS } from "@/database/schemas";
import { ResponseTS, UserTS } from "@/types";
import { AuthError } from "next-auth";

const RegisterAction = async (value: RegisterSchemaTS): Promise<ResponseTS> => {
  const validateFields = await RegisterSchema.safeParseAsync(value);

  if (!validateFields.success) {
    return { success: null, error: "Invalid Fields" };
  }
  const { username, email, password } = validateFields.data;
  const salt = await bcryptjs.genSalt(
    parseInt(process.env.SALT_ROUND as string),
  );
  const hashedPassword = await bcryptjs.hash(password, salt);

  // TODO: check if user existed
  const isUserExisted: UserTS = await getUserByEmail(email);
  if (isUserExisted) {
    console.log("🚀 ~ RegisterAction ~ isUserExisted:", isUserExisted);
    return { success: null, error: "Email already in use!" };
  }

  try {
    // TODO: create new user
    await prismaDB.user.create({
      data: {
        name: username,
        email,
        password: hashedPassword,
      },
    });

    // TODO: send verification token email

    return { success: "User Created Successfully!", error: null };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "EmailSignInError":
          return { success: null, error: "Invalid Crdentials" };
        case "OAuthAccountNotLinked":
          return { success: null, error: "Email already in use!" };
        default:
          return {
            success: null,
            error: "Something Went Wrong in Registration",
          };
      }
    }
    throw error;
  }
};

export { RegisterAction };
