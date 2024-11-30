import dotenv from "dotenv";

dotenv.config({ path: ".env" });

export const PORT = process.env.PORT;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY!;
export const HASHIDS_KEY = process.env.HASHIDS_KEY!;
