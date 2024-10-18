import * as z from "zod";

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

//! Export:
export { LoginSchema, RegisterSchema };
export type { LoginSchemaTS, RegisterSchemaTS };
