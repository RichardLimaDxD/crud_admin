import z from "zod";

const productSchema = z.object({
  id: z.number().positive().int(),
  name: z.string().max(20),
  email: z.string().email().max(100),
  password: z.string().max(120),
  admin: z.boolean().optional().default(false),
  active: z.boolean(),
});

const userCreateSchema = productSchema.omit({ id: true, active: true });
const passwordCreateSchema = productSchema.omit({ password: true });

const editSchema = productSchema.partial();

const loginSchema = z.object({
  id: z.number().positive().int(),
  email: z.string().email().max(100),
  password: z.string().max(120),
  active: z.boolean().default(true),
});

const returnLoginSchema = loginSchema.omit({ id: true, active: true });
const notReturnPassWord = loginSchema.omit({ password: true });
const updateUserSchema = productSchema
  .omit({
    id: true,
    admin: true,
    active: true,
  })
  .partial();

export {
  productSchema,
  userCreateSchema,
  passwordCreateSchema,
  returnLoginSchema,
  notReturnPassWord,
  editSchema,
  updateUserSchema,
};
