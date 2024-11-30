import { Router } from "express";
import { createSuperAdmin } from '../../controllers/admin/auth';
import { errorHandlerThis as err_hdl } from "../../middlewares/errors";

const authRouter: Router = Router();

authRouter.post("/super/signup", err_hdl(createSuperAdmin));

export default authRouter;
