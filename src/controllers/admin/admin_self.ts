import { hashSync } from 'bcrypt';
import { Request, Response } from "express";
import { prisma } from '../..';
import { genRef } from '../../helpers/jwtToken';
import { CreateStockAdminSchema } from '../../schemas/admin/admin_self';


export const createStockAdmin = async (req: Request, res: Response) => {

	let vd = CreateStockAdminSchema.parse({ ...req.body });
	delete (vd as any).profile;
	const admin = await prisma.$transaction(async (tx) => {
		const ad = await tx.admin.create({
			data: {
				...vd,
				ref: genRef(vd.email),
				password: hashSync(vd.password, 10),
				role: "STOCK_ADMIN",
				stock_id: vd.stock_id
			},
		})
		return ad;
	})
	res.json(admin)
}

