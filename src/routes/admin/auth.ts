import { Router } from "express";
import { createSuperAdmin, loginAdminFacial, loginAdminPassword } from '../../controllers/admin/auth';
import { errorHandlerThis as err_hdl } from "../../middlewares/errors";

const authRouter: Router = Router();

authRouter.post("/super/signup", err_hdl(createSuperAdmin));
authRouter.post("/login-pass", err_hdl(loginAdminPassword));
authRouter.post("/login-facial", err_hdl(loginAdminFacial));

export default authRouter;
