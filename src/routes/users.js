import {UserController} from '../controllers/UserController';
import PromiseRouter from 'express-promise-router';
import {Schemas, validateBody} from '../helpers/routeHelpers'
import passport from '../auth/passport';

export const userRoute = PromiseRouter();
const userController = new UserController();
const passportSignIn = passport.authenticate('local', {session: false});
const passportJwt = passport.authenticate('jwt', {session: false});

userRoute.post('/signup', validateBody(Schemas.authSchema), userController.signUp);
userRoute.post('/signin', validateBody(Schemas.authSchema), passportSignIn, userController.signIn);
userRoute.get('/secret',
    passportJwt,
    userController.secret);
