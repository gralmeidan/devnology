import { Router } from 'express';
import OrderController from '../controllers/order.controller';
import validateToken from '../middlewares/validateToken.middleware';
import cookieParser = require('cookie-parser');

const orderRouter = Router();
const controller = new OrderController();

orderRouter.use(cookieParser());
orderRouter.use(validateToken);
orderRouter.post('/', controller.placeOrder);

export default orderRouter;
