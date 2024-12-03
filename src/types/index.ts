import {
  ResetPasswordToken,
  User,
  VerificationToken,
  TwoFactorToken,
  TwoFactorConfirmation,
} from "@prisma/client";

enum KEYS {
  success = "success",
  error = "error",
}

type ResponseTS<T extends string = keyof typeof KEYS> =
  | {
      [KEYS in T]: string | null;
    }
  | null;
type TwoFactorTS = { twoFactor: boolean; message: string };
type UserTS = User | null;
type VerificationTokenTS = VerificationToken | null;
type ResetPasswordTokenTS = ResetPasswordToken | null;
type TwoFactorTokenTS = TwoFactorToken | null;
type TwoFactorConfirmationTS = TwoFactorConfirmation | null;

// !Export Types
export type {
  ResponseTS,
  UserTS,
  VerificationTokenTS,
  ResetPasswordTokenTS,
  TwoFactorTS,
  TwoFactorTokenTS,
  TwoFactorConfirmationTS,
};
