import prismaDB from "@/database/db";
import { UserTS } from "@/types";

// TODO: get user from db by email
const getUserByEmail = async (email: string): Promise<UserTS> => {
  try {
    const user: UserTS = await prismaDB.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

// TODO: get user from db by id
const getUserByID = async (id: string): Promise<UserTS> => {
  try {
    const user: UserTS = await prismaDB.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
};

//! Export_
export { getUserByEmail, getUserByID };
