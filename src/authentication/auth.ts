import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prismaDB from "@/database/db";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prismaDB),
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET as string,
  ...authConfig,
});
