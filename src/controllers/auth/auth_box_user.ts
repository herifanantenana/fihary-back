import { LoginBoxStockSchema } from '../../schemas/auth/auth_box_user';
import { Box, User } from "@prisma/client";
import { compareSync, hashSync } from "bcrypt";
import { Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import { BadRequestsException, NotFoundException } from '../../exceptions/internals';
import { ErrorCode } from '../../exceptions/root';
import { genRef } from '../../helpers/jwtToken';
import { prisma } from '../../index';
import { SignUpUserSchema } from '../../schemas/auth/auth_box_user';
import { JWT_SECRET_KEY } from '../../secrets';

export const signUpUser = async (req: Request, res: Response) => {
	let vd = SignUpUserSchema.parse({ ...req.body });
	let user = await prisma.user.findFirst({ where: { email: vd.email } });
	if (user) {
		throw new BadRequestsException("User already exists!", ErrorCode.USER_ALREADY_EXIST)
	}
	user = await prisma.user.create({
		data: {
			...vd,
			ref: genRef(vd.email),
			password: hashSync(vd.password, 10)
		},
	})
	const token = jwt.sign({ userId: user.id, stock_id: null, role: user.role }, JWT_SECRET_KEY, { expiresIn: "356d" });
	res.json({ token });
}

export const loginBoxUser = async (req: Request, res: Response) => {
	let vd = LoginBoxStockSchema.parse(req.body);
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	let user: User | Box;
	let token: string;
	if (emailRegex.test(vd.email)) {
		try {
			user = await prisma.user.findFirstOrThrow({ where: { email: vd.email } });
		} catch (error) {
			throw new NotFoundException("User not found!", ErrorCode.USER_NOT_FOUND, error);
		}
		if (!compareSync(vd.password, user.password))
			throw new BadRequestsException("User password incorrect!", ErrorCode.INCORRECT_PASSWORD)
		token = jwt.sign({ userId: user.id, stock_id: null, role: user.role }, JWT_SECRET_KEY, { expiresIn: "356d" });
	} else {
		try {
			user = await prisma.box.findFirstOrThrow({ where: { ref: vd.email } });
		} catch (error) {
			throw new NotFoundException("User not found!", ErrorCode.USER_NOT_FOUND, error);
		}
		if (!compareSync(vd.password, user.password))
			throw new BadRequestsException("User password incorrect!", ErrorCode.INCORRECT_PASSWORD)
		token = jwt.sign({ userId: user.id, stock_id: user.stock_id, role: user.role }, JWT_SECRET_KEY, { expiresIn: "356d" });
	}
	res.json({ token });
}
