import { Router } from 'express';
import UserController from '../controllers/user.controller';

const userRouter = Router();
const controller = new UserController();

userRouter.post('/signup', controller.signUp);
userRouter.post('/signin', controller.signIn);

export default userRouter;
