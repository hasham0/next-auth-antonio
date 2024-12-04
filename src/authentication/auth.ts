import { PrismaAdapter } from "@auth/prisma-adapter";
import prismaDB from "@/database/db";
import authConfig from "@/authentication/auth.config";
import { getUserByID } from "@/database/db_queries/user";
import NextAuth from "next-auth";
import { UserRole } from "@prisma/client";
import { getTwoFactorConfirmationByUserId } from "@/database/db_queries/two-factor-confirmation";
import { getAccountByUserId } from "@/database/db_queries/account";

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
    async signIn({ user, account }) {
      // TODO: allow OAuth with out email verification
      if (account?.provider !== "credentials") return true;
      const isUserExist = await getUserByID(user.id as string);
      if (!isUserExist?.emailVerified) return false;
      if (isUserExist.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          isUserExist.id,
        );
        if (!twoFactorConfirmation) return false;
        await prismaDB.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }
      return true;
    },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }
      if (session.user) {
        session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
        session.user.email = token.email as string;
        session.user.isOAuth = token.isOAuth as boolean;
      }
      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;
      const isUserExist = await getUserByID(token.sub);
      if (!isUserExist) return token;
      const isAccountExist = await getAccountByUserId(isUserExist.id);
      token.isOAuth = !!isAccountExist;
      token.name = isUserExist.name;
      token.email = isUserExist.email;
      token.role = isUserExist.role;
      token.isTwoFactorEnabled = isUserExist.isTwoFactorEnabled;
      return token;
    },
  },
  secret: process.env.AUTH_SECRET,
  ...authConfig,
});
