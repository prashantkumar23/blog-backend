import mongoose, { Schema } from 'mongoose'


export interface User {
    name: string;
    email: string;
    image: string;
    emailVerfied: boolean;
    bio: string;
}

const UserSchema = new mongoose.Schema<User>(
    {
        name: {
            type: String,
            required: true,
            unique: false,
        },
        image: {
            type: String,
            required: false,
            default: ''
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        emailVerfied: {
            type: Schema.Types.Boolean,
            required: false,
            default: false
        },
        bio: {
            type: String,
            required: false,
            default: ''
        },
    },
    {
        timestamps: true,
    }
);


const UserModel = mongoose.model('User', UserSchema);
export default UserModel
