import mongoose, { Schema, model, Model } from 'mongoose';
import { IUser } from '../interfaces';


const userSchema = new Schema({

    name:     { type: String, required: true  },
    lastname: { type: String, require: true, default: '' },
    email:    { type: String, required: true, unique: true },
    password: { type: String, required: true},
    country:  { type: String },
    document: { type: String },
    birth:    { type: String },
    role: {
        type: String,
        enum: {
            values: ['admin', 'client'],
            message: '{VALUE} is not a valid role',
            default: 'client',
            rquired: true
        }
    }


}, {
    timestamps: true,
});

const User: Model<IUser> = mongoose.models.User || model('User', userSchema);

export default User;