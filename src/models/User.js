import {model, Schema} from 'mongoose';
import bcrypt from 'bcryptjs'

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
}, {timestamp: true})

UserSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (e) {
        next(e)
    }
})

UserSchema.methods.isValidPassword = async function (newPassword) {
    try {
        return await bcrypt.compare(newPassword, this.password);
    } catch (e) {
        throw new Error(e);
    }
}
export const UserModel = model('users', UserSchema);
