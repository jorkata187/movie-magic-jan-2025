import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || 'BASICSECRET';

export default {
    async register(userData) {
        // Check if password match rePassword
        // if (userData.password !== userData.rePassword) {
        //     throw new Error('Password mismatch!');
        // }

        // Validate if email exists
        const userCount = await User.countDocuments({email: userData.email});
        if (userCount > 0) {
            throw new Error('This email alredy exists!');
        }
        return User.create(userData);
    },
    async login(email, password) {
        const user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            throw new Error('Invalid email or password!');
        }

        // Check if password is corect
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new Error('Invalid email or password!');
        }

        // Generate token
        const payload = {
            id: user.id,
            email: user.email,
        }
        // TODO: Use async option
        const token = jwt.sign(payload, SECRET, { expiresIn: '2h' });

        return token;
    },
};