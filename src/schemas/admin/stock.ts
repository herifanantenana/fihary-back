import z from "zod";

export const CreateStockSchema = z.object({
	name: z.string(),
	city_id: z.number(),
	place_id: z.number()
})
