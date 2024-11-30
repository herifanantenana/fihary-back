import { Admin } from "@prisma/client";

declare global {
	namespace Express {
		interface Request {
			user?: any;
			admin?: Admin
		}
	}
}
