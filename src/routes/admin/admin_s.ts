import { Router } from "express";
import { createStockAdmin } from '../../controllers/admin/admin_self';
import { errorHandlerThis as err_hdl } from "../../middlewares/errors";

const selfRouter: Router = Router();

selfRouter.post("/create", err_hdl(createStockAdmin));

export default selfRouter;
