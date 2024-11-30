import { RoleAdmin } from "@prisma/client";
import z from "zod";

export const CreateSuperAdminSchema = z.object({
	fullname: z.string().trim(),
	email: z.string().email().trim(),
	phone_number: z.string().regex(/^03\d{8}$/),
	password: z.string().trim().min(8),
	role: z.nativeEnum(RoleAdmin).default(RoleAdmin.SUPER_ADMIN),
	stock_id: z.number(),
	profile: z.custom<Express.Multer.File>((value) => {
		return (
			value &&
			typeof value === "object" &&
			"originalname" in value &&
			"buffer" in value &&
			"mimetype" in value
		);
	}, {
		message: "Invalid file. Expected an Express.Multer.File.",
	})
})

export const LoginAdminPasswordSchema = z.object({
	ref: z.string().trim(),
	email: z.string().trim().email(),
	password: z.string().trim().min(8)
})

export const LoginAdminFacialSchema = z.object({
	image: z.string().trim(),
})
