import * as z from "zod";

const LoginSchema = z.object({
  emai: z.string().email(),
  password: z.string(),
});
type LoginSchemaTS = z.infer<typeof LoginSchema>;

export { LoginSchema };
export type { LoginSchemaTS };
