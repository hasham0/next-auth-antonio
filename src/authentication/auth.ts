import { PrismaAdapter } from "@auth/prisma-adapter";
import prismaDB from "@/database/db";
import authConfig from "./auth.config";
import { getUserByID } from "@/database/data/user";
import NextAuth from "next-auth";
import { UserRole } from "@prisma/client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prismaDB),
  session: {
    strategy: "jwt",
  },
  events: {
    async linkAccount({ user }) {
      await prismaDB.user.update({
        where: {
          id: user.id,
        },
        data: { emailVerified: new Date() },
      });
    },
  },
  pages: {
    signIn: "/login",
    error: "/error",
  },
  callbacks: {
    // async signIn({ user }) {
    //   const isUserExist = await getUserByID(user.id as string);
    //   if (!isUserExist || !isUserExist.emailVerified) {
    //     return false;
    //   }

    //   return true;
    // },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (!token.sub) return token;
      const isUserExist = await getUserByID(token.sub);
      if (!isUserExist) return token;
      token.role = isUserExist.role;
      return token;
    },
  },
  secret: process.env.AUTH_SECRET,
  ...authConfig,
});
