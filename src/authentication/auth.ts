import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prismaDB from "@/db/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prismaDB),
  providers: [Credentials({}), Google, GitHub],
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET as string,
});
