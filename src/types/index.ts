import {
  ResetPasswordToken,
  User,
  VerificationToken,
  TwoFactorToken,
  TwoFactorConfirmation,
  Account,
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
type NavTS = { label: string; href: string };
type UserTS = User | null;
type VerificationTokenTS = VerificationToken | null;
type AccountTS = Account | null;
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
  NavTS,
  AccountTS,
};
