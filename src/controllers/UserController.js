
export class UserController {

    async signUp(req, res, next) {
        console.log('UserController.signUp() called');
    }

    async signIn(req, res, next) {
        console.log('UserController.signIn() called');
    }

    async secret(req, res, next) {
        console.log('UserController.secret() called');
    }
}
