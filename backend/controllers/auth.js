import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import { GenerateTokenandSetCookie } from "../Utils/GenerateTokenandSetCookie.js";
import { body, validationResult } from 'express-validator';
import { SendVerificationEmail } from "../Email/SendVerificationEmail.js";

export const signup = [

    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),


    async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {

            const userAlreadyExists = await User.findOne({ email });
            if (userAlreadyExists) {
                throw new Error('User already exists');
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();
            console.log(verificationToken);
            const user = new User({
                name,
                email,
                password: hashedPassword,
                verificationToken,
                verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
            });

            await user.save();

            GenerateTokenandSetCookie(res, user._id);
            SendVerificationEmail(user.name,user.email, verificationToken);

            res.status(201).json({
                success: true,
                message: 'User created successfully',
                user: { ...user._doc, password: undefined }
            });

        } catch (error) {
            res.status(500).json({ success: false, message: 'Server error', error: error.message });
        }
    }]


export const verifyemail = async (req, res) => {

    const { email, verificationToken } = req.body;
    try {
        const user = await User.findOne({ email, verificationToken, verificationTokenExpiresAt: { $gt: Date.now() } });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid or expired verification token' });
        }
        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();
        res.status(200).json({ 
            success: true, 
            message: 'Email verified successfully',
            user: { ...user._doc, password: undefined }
         });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }


}

export const login = async (req, res) => {
    res.send('Login');
}

export const logout = async (req, res) => {
    res.send('Logout');
}