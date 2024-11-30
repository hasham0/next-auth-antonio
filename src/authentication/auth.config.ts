import bcryptjs from "bcryptjs";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/database/schemas";
import type { NextAuthConfig } from "next-auth";
import { getUserByEmail } from "@/database/db_queries/user";
import { UserTS } from "@/types";

export default {
  providers: [
    Credentials({
      name: "Credentials",
      async authorize(credentials): Promise<UserTS> {
        // Validate the input fields using your schema
        const validateFields = await LoginSchema.safeParseAsync(credentials);

        // Check if validation succeeded
        if (validateFields.success) {
          const email = validateFields.data.email as string;
          const password = validateFields.data.password as string;

          // Fetch user by email
          const user: UserTS = await getUserByEmail(email);

          // If no user found or user has no password, return null
          if (!user || !user.password) return null;

          // Compare the provided password with the stored hash
          const isPasswordMatch = await bcryptjs.compare(
            password,
            user.password,
          );

          // If passwords match, return the user object
          if (isPasswordMatch) {
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              image: user.image ?? null,
            } as UserTS;
          }
        }
        // Return null if validation or authentication fails
        return null;
      },
    }),
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
  ],
} satisfies NextAuthConfig;
