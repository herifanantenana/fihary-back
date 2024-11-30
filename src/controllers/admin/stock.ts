import { CreateStockSchema } from './../../schemas/admin/stock';

import { Request, Response } from "express";
import { genRef } from '../../helpers/jwtToken';
import { prisma } from '../../index';

export const createStock = async (req: Request, res: Response) => {
	let vd = CreateStockSchema.parse(req.body);

	const stock = await prisma.stock.create({
		data: {
			name: vd.name,
			ref: genRef(vd.name),
			city: {
				connect: { id: vd.city_id }
			},
			place: {
				connect: { id: vd.place_id }
			}
		}
	})
	res.json(stock);
}
