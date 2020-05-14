import {UserModel} from "../models/User";
import * as JWT from 'jsonwebtoken';
import {JWT_SECRET} from "../configuration/secrets";

const signToken = user => {
    return JWT.sign({
        iss: 'Bartek',
        sub: user.id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, JWT_SECRET)
}

export class UserController {

    async signUp(req, res, next) {
        console.log('UserController.signUp() called');
        const {email, password} = req.value.body;
        const user = new UserModel({email, password});
        try {
            await user.save();
        } catch (e) {
            return res.status(400).json(e.message);
        }

        const token = signToken(user);
        res.status(200).json({token});
    }

    async signIn(req, res, next) {
        const token = signToken(req.user);
        return res.status(200).json({message: 'Good login', token});
    }

    async secret(req, res, next) {
        console.log('UserController.secret() called');
        return res.status(200).json({message: "GOOD"});
    }
}
