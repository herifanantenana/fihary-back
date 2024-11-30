import { Admin } from "@prisma/client";
import { compareSync, hashSync } from "bcrypt";
import { Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import { NotFoundException } from '../../exceptions/internals';
import { ErrorCode } from '../../exceptions/root';
import { genRef } from "../../helpers/jwtToken";
import { prisma } from '../../index';
import { CreateSuperAdminSchema, LoginAdminFacialSchema, LoginAdminPasswordSchema } from '../../schemas/admin/auth';
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


export const loginAdminPassword = async (req: Request, res: Response) => {
	let vd = LoginAdminPasswordSchema.parse(req.body);
	let admin: Admin;
	try {
		admin = await prisma.admin.findFirstOrThrow({
			where: {
				ref: vd.ref, email: vd.email
			}
		})
	} catch (error) {
		throw new NotFoundException("User not found!", ErrorCode.USER_NOT_FOUND, error);
	}
	if (!compareSync(vd.password, admin.password)) {
		throw new NotFoundException("User not found!", ErrorCode.USER_NOT_FOUND);
	}
	const token = jwt.sign({ userId: admin.id, stock_id: admin.stock_id, role: admin.role }, JWT_SECRET_KEY, { expiresIn: "356d" });
	res.json({ token });
}


export const loginAdminFacial = async (req: Request, res: Response) => {
	let vd = LoginAdminFacialSchema.parse(req.body);
	let admin: Admin;
	try {
		admin = await prisma.admin.findFirstOrThrow({
			where: {
				ref: vd.image
			}
		})
	} catch (error) {
		throw new NotFoundException("User not found!", ErrorCode.USER_NOT_FOUND, error);
	}
	const token = jwt.sign({ userId: admin.id, stock_id: admin.stock_id, role: admin.role }, JWT_SECRET_KEY, { expiresIn: "356d" });
	res.json({ token });
}
