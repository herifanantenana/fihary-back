import { hashSync } from "bcrypt";
import { Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import { genRef } from "../../helpers/jwtToken";
import { prisma } from '../../index';
import { CreateSuperAdminSchema } from '../../schemas/admin/auth';
import { JWT_SECRET_KEY } from '../../secrets';
import { getUrlFile } from './../../helpers/multer';

export const createSuperAdmin = async (req: Request, res: Response) => {
	let vd = CreateSuperAdminSchema.parse({ ...req.body, profile: req.file });

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
				role: "SUPER_ADMIN",
			}
		})
		res.locals.next();
		return ad;
	})
	const token = jwt.sign({
		userId: admin.id,
		stockId: null,
		role: admin.role
	}, JWT_SECRET_KEY, { expiresIn: "365d" });
	res.json(token);
}

