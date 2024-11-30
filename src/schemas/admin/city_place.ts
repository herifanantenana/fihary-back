import { z } from "zod";

export const capitalizeWords = (str: string) => {
	return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export const AddCitiesSchema = z.object({
	cities: z.array(z.string().transform(capitalizeWords))
});

export const AddCityPlacesSchema = z.object({
	city_id: z.number(),
	places: z.array(z.string().transform(capitalizeWords))
});
