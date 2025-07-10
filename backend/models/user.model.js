import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: true,
        trim: true,
        minLength: 5,
    },
    email: {
        type: String,
        required: true,
        minLength: 5,
        trim: true,
        lowercase: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
    }

}, { timestamps: true });

export const User = mongoose.model('User', userSchema);