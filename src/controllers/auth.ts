import { Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import { prisma } from '..';
import { getUrlFile } from '../helpers/multer';
import { CreateAdminSchema } from '../schemas/auth';
import { JWT_SECRET_KEY } from "../secrets";


export const createAdmin = async (req: Request, res: Response) => {
	let validateData = CreateAdminSchema.parse({ ...req.body, profile: req.file })

	const image_id = Date.now();
	const name_file = req.file!.filename.split('-')[1];
	req.file!.filename = image_id + '-' + name_file;
	const image_url = getUrlFile(req, req.file);
	delete (validateData as any).profile;
	const admin = await prisma.$transaction(async (tx) => {
		const admin = await tx.admin.create({
			data: {
				...validateData,
				image_url,
				image_id: image_id.toString(),
				image_name: req.file!.filename
			},
		})
		res.locals.next();
		return admin;
	});
	const token = jwt.sign({
		userId: admin.id,
		stockId: admin.stock_id,
		role: admin.role
	}, JWT_SECRET_KEY, { expiresIn: "365d" });
	res.json(token);
}

export const loginAdminFacial = async (req: Request, res: Response) => {
let validateData
}
