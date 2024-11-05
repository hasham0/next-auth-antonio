import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};
declare global {
  var prismaGlobal: ReturnType<typeof prismaClientSingleton> | undefined;
}

const prismaDB = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prismaDB;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prismaDB;
