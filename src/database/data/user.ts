import prismaDB from "@/database/db";

// TODO: get user from db by email
const getUserByEmail = async (email: string) => {
  try {
    const user = await prismaDB.user.findUnique({
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
const getUserByID = async (id: string) => {
  try {
    const user = await prismaDB.user.findUnique({
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
