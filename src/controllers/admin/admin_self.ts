import { hashSync } from 'bcrypt';
import { Request, Response } from "express";
import { prisma } from '../..';
import { genRef } from '../../helpers/jwtToken';
import { getUrlFile } from '../../helpers/multer';
import { CreateStockAdminSchema } from '../../schemas/admin/admin_self';


export const createStockAdmin = async (req: Request, res: Response) => {
	console.log(req.body);

	let vd = CreateStockAdminSchema.parse({ ...req.body, profile: req.file });

	const image_id = genRef(vd.email);
	const name_file = req.file!.filename.split('-')[1];
	req.file!.filename = image_id + '-' + name_file;
	const image_url = getUrlFile(req, req.file);
	delete (vd as any).profile;
	const admin = await prisma.$transaction(async (tx) => {
		const ad = await tx.admin.create({
			data: {
				...vd,
				ref: image_id,
				password: hashSync(vd.password, 10),
				image_url,
				image_id: image_id.toString(),
				image_name: req.file!.filename,
				role: "STOCK_ADMIN",
				stock_id: vd.stock_id
			},
		})
		res.locals.next();
		return ad;
	})
	res.json(admin)
}
