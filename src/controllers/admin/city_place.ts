import { Request, Response } from "express";
import { prisma } from "../..";
import { AddCitiesSchema, AddCityPlacesSchema } from '../../schemas/admin/city_place';

export const addCities = async (req: Request, res: Response) => {
	let validateData = AddCitiesSchema.parse(req.body);

	const cities = await prisma.city.createMany({
		data: validateData.cities.map(city => ({ name: city }))
	});
	res.json(cities);
}

export const addCityPlaces = async (req: Request, res: Response) => {
	let validateData = AddCityPlacesSchema.parse(req.body);

	const places = await prisma.place.createMany({
		data: validateData.places.map(place => ({
			name: place,
			city_id: validateData.city_id
		}))
	})
	res.json(places);
}
