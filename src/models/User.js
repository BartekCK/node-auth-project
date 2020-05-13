import {Schema, model} from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: String
}, {timestamp: true})

export const UserModel = model('users', UserSchema);
