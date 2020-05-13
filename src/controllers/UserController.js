import {UserModel} from "../models/User";


export class UserController {

    async signUp(req, res, next) {
        console.log('UserController.signUp() called');
        const {email, password} = req.value.body;
        const user = new UserModel({email, password});
        try {
            await user.save();
        }catch (e) {
            return res.status(400).json(e.message);
        }
        res.json({user: 'created'});
    }

    async signIn(req, res, next) {
        console.log('UserController.signIn() called');
    }

    async secret(req, res, next) {
        console.log('UserController.secret() called');
    }
}
