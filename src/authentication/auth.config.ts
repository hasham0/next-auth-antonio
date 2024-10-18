import bcryptjs from "bcryptjs";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/database/schemas";
import type { NextAuthConfig } from "next-auth";
import { getUserByEmail } from "@/database/data/user";

export default {
  providers: [
    Credentials({
      name: "Credentials",
      async authorize(credentials) {
        // Validate the input fields using your schema
        const validateFields = await LoginSchema.safeParseAsync(credentials);

        // Check if validation succeeded
        if (validateFields.success) {
          const email = validateFields.data.email as string;
          const password = validateFields.data.password as string;

          // Fetch user by email
          const user = await getUserByEmail(email);

          // If no user found or user has no password, return null
          if (!user || !user.password) {
            return null;
          }

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
              username: user.username,
              image: user.image ?? null,
            };
          }
        }

        // Return null if validation or authentication fails
        return null;
      },
    }),
    GitHub,
    Google,
  ],
} satisfies NextAuthConfig;
