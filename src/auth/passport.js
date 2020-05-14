import passport from 'passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {JWT_SECRET} from "../configuration/secrets";
import {Strategy as LocalStrategy} from "passport-local"
import {UserModel} from "../models/User";

passport.use(new Strategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET
}, async (payload, done) => {
    try {
        const user = await UserModel.findOne({_id: payload.sub});
        if (!user)
            return done(null, false);
        done(null, user)
    } catch (e) {
        done(e, false);
    }
}))


passport.use(
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        try{
            const user = await UserModel.findOne({email: email});
            if (!user)
                return done(null, false);
            const isResultMatch = await user.isValidPassword(password);
            if(!isResultMatch)
                return done(null, false);
            done(null, user);
        }catch (e) {
            return done(e,false)
        }

    }))

export default passport;
