import { RoleAdmin } from "@prisma/client";
import z from "zod";

export const CreateAdminSchema = z.object({
	fullname: z.string().trim().min(1, "Fullname is required"),
	email: z.string().email().trim(),
	phone_number: z.string().regex(/^03\d{8}$/, "Phone number must be a 10-digit number starting with 03"),
	role: z.nativeEnum(RoleAdmin).default(RoleAdmin.SUPER_ADMIN),
	stock_id: z.number().optional(),
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
	}),
})
