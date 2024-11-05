import { User } from "@prisma/client";

enum KEYS {
  success = "success",
  error = "error",
}

type ResponseTS<T extends string = keyof typeof KEYS> =
  | {
      [KEYS in T]: string | null;
    }
  | null;

type UserTS = User | null;
export type { ResponseTS, UserTS };
