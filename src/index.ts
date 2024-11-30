import compression from 'compression';
import cors from "cors";
import express, { Express } from "express";
import helmet from 'helmet';
import { errorMiddleware } from './middlewares/errors';
import { PORT } from "./secrets";

const app: Express = express();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression({
	threshold: 2 * 1024 * 1024
}));

app.use(errorMiddleware);

app.listen(PORT, () => console.log("Connected on port " + PORT));
