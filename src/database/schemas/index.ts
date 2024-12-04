import { UserRole } from "@prisma/client";
import * as z from "zod";

//TODO: login schema
const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().min(6)),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) return false;
      if (data.newPassword && !data.password) return false;
      return true;
    },
    {
      message: "New Password is required",
      path: ["newPassword"],
    },
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) return false;
      if (data.password && !data.newPassword) return false;
      return true;
    },
    {
      message: "Password is required",
      path: ["password"],
    },
  );
type SettingsSchemaTS = z.infer<typeof SettingsSchema>;

//TODO: login schema
const LoginSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Must be a string",
    })
    .email({
      message: "Email is required",
    }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});
type LoginSchemaTS = z.infer<typeof LoginSchema>;

//TODO: register schema
const RegisterSchema = z.object({
  username: z.string().min(3, {
    message: "username is required",
  }),
  email: z
    .string({
      invalid_type_error: "Must be a string",
    })
    .email({
      message: "Email is required",
    }),
  password: z.string().min(6, {
    message: "Minimum 6 character required",
  }),
});
type RegisterSchemaTS = z.infer<typeof RegisterSchema>;

// TODO:reset schema
const ResetSchema = RegisterSchema.pick({ email: true });
type ResetSchemaTS = z.infer<typeof ResetSchema>;

// TODO:new password schema
const NewPasswordSchema = RegisterSchema.pick({ password: true });
type NewPasswordSchemaTS = z.infer<typeof NewPasswordSchema>;

//! Export:
export {
  LoginSchema,
  RegisterSchema,
  ResetSchema,
  NewPasswordSchema,
  SettingsSchema,
};
export type {
  LoginSchemaTS,
  RegisterSchemaTS,
  ResetSchemaTS,
  NewPasswordSchemaTS,
  SettingsSchemaTS,
};
