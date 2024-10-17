import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Credentials({}), Google, GitHub],
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET as string,
});
