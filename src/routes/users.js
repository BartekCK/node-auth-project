import {UserController} from '../controllers/UserController';
import PromiseRouter from 'express-promise-router';
import {Schemas, validateBody} from '../helpers/routeHelpers'

export const userRoute = PromiseRouter();

const userController = new UserController();

userRoute.post('/signup', validateBody(Schemas.authSchema), userController.signUp);
userRoute.post('/signin', userController.signIn);
userRoute.get('/secret', userController.secret);
