import z from "zod";

export const SignUpUserSchema = z.object({
	fullname: z.string().trim(),
	email: z.string().trim().email(),
	phone_number: z.string().trim().regex(/^03\d{8}$/),
	password: z.string().trim().min(8)
})

export const LoginBoxStockSchema = z.object({
	email: z.string().trim(),
	password: z.string().trim().min(8)
})
