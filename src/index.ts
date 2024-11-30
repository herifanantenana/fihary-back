import { PrismaClient } from '@prisma/client';
import compression from 'compression';
import cors from "cors";
import express, { Express } from "express";
import helmet from 'helmet';
import { errorMiddleware } from './middlewares/errors';
import rootRouter from './routes';
import { HASHIDS_KEY, PORT } from "./secrets";
import Hashids from 'hashids';

const app: Express = express();
app.use(express.json());
app.use(cors());
// app.use(helmet());
// app.use(compression({
// 	threshold: 2 * 1024 * 1024
// }));

export const hashids = new Hashids(HASHIDS_KEY, 8);

export const prisma = new PrismaClient({
	log: ["query", "error", "warn", "info"]
})
app.use("/api", rootRouter);
app.use(errorMiddleware);

app.listen(PORT, () => console.log("Connected on port " + PORT));
