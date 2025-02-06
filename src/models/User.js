import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true, // This is not a validator, is a index
        lowercase: true, // Sanitizer
        match: /@[a-zA-Z]+.[a-zA-Z]+$/,
        minLength: 10,
    },
    password: {
        type: String,
        match: /^\w+$/,
        minLength: [6, 'Password shoud be at least 6 characters!'],
        trim: true // Sanitizer
    },
});

// Virtual property
userSchema.virtual('rePassword')
.set(function(rePassword) {
    if (rePassword !== this.password) {
        throw new Error('Password mismatch!');
    }
});

userSchema.pre('save', async function() {
    this.password = await bcrypt.hash(this.password, 10);
});

const User = model('User', userSchema);

export default User;