import { Router } from "express";
// import { createAdmin, loginAdminFacial, loginAdminPassword } from '../controllers/admin/auth';
import { errorHandlerThis as err_hdl } from "../middlewares/errors";
// import { singleFileUpload, uploadMiddleware } from '../middlewares/multer';
import { loginBoxUser, signUpUser } from '../controllers/auth/auth_box_user';

const authRouter: Router = Router();

// authRouter.post("/admin/create", [singleFileUpload("profile"), err_hdl(uploadMiddleware)], err_hdl(createAdmin));
// authRouter.post("/admin/login-facial", err_hdl(loginAdminFacial));
// authRouter.post("/admin/login-password", err_hdl(loginAdminPassword));

authRouter.post("/signup", err_hdl(signUpUser));
authRouter.post("/login", err_hdl(loginBoxUser));

export default authRouter;
