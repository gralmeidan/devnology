import { Router } from 'express';
import AddressController from '../controllers/address.controller';
import validateToken from '../middlewares/validateToken.middleware';
import cookieParser = require('cookie-parser');

const addressRouter = Router();
const controller = new AddressController();

addressRouter.use(cookieParser());
addressRouter.use(validateToken);
addressRouter.post('/', controller.insert);
addressRouter.get('/', controller.getByRequestingUser);

export default addressRouter;
