import { Router } from "express";
// import { createAdmin, loginAdminFacial, loginAdminPassword } from '../controllers/admin/auth';
import { errorHandlerThis as err_hdl } from "../../middlewares/errors";
// import { singleFileUpload, uploadMiddleware } from '../middlewares/multer';
import { addCities, addCityPlaces } from '../../controllers/admin/city_place';

const cityPlaceRouter: Router = Router();

cityPlaceRouter.post("/add", err_hdl(addCities));
cityPlaceRouter.post("/place-add", err_hdl(addCityPlaces))

export default cityPlaceRouter;
