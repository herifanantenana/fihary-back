import { Router } from "express";
import adminRouter from "./admin/admin";
import authRouter from "./auth";
import { createStockAdmin } from '../controllers/admin/admin_self';
import { errorHandlerThis as err_hdl } from "../middlewares/errors";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/admin", adminRouter);

export default rootRouter;
