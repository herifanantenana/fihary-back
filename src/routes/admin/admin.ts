import { Router } from "express";
import cityPlaceRouter from "./city_place";
import authRouter from "./auth";
import stockRouter from "./stock";
import selfRouter from "./admin_self"

const adminRouter: Router = Router();

adminRouter.use("/city", cityPlaceRouter)
adminRouter.use("/auth", authRouter);
adminRouter.use("/stock", stockRouter)
adminRouter.use("/admin", selfRouter);

export default adminRouter;
