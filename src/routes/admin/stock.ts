import { Router } from "express";
import { createStock } from '../../controllers/admin/stock';
import { errorHandlerThis as err_hdl } from "../../middlewares/errors";

const stockRouter: Router = Router();

stockRouter.post("/create", err_hdl(createStock));

export default stockRouter;
