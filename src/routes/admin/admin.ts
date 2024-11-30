import { Router } from "express";
import cityPlaceRouter from "./city_place";
import authRouter from "./auth";
import stockRouter from "./stock";
import selfRouter from "./admin_s"

const adminRouter: Router = Router();

adminRouter.use("/admin", selfRouter);
adminRouter.use("/city", cityPlaceRouter)
adminRouter.use("/auth", authRouter);
adminRouter.use("/stock", stockRouter)

export default adminRouter;
