import { Router } from "express";
import { createAdmin } from '../controllers/auth';
import { errorHandlerThis as err_hdl } from "../middlewares/errors";
import { singleFileUpload, uploadMiddleware } from '../middlewares/multer';

const authRouter: Router = Router();

authRouter.post("/create-admin",[singleFileUpload("profile"), err_hdl(uploadMiddleware)], err_hdl(createAdmin));

export default authRouter;
