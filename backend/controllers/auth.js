import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";


import { GenerateTokenandSetCookie } from "../Utils/GenerateTokenandSetCookie.js";
import { body, validationResult } from 'express-validator';
import { SendVerificationEmail } from "../Email/SendVerificationEmail.js";
import { SendForgotPasswordEmail } from "../Email/SendForgotPasswordEmail.js"
import { SendResetSuccessEmail } from "../Email/SendResetSuccessEmail.js";

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
                return res.status(400).json({ success: false, message: 'User already exists' });
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
            SendVerificationEmail(user.name, user.email, verificationToken);

            res.status(201).json({
                success: true,
                message: 'User created successfully',
                user: { ...user._doc, password: undefined }
            });

        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
]


export const verifyemail = async (req, res) => {

    const { verificationToken } = req.body;
    try {
        const user = await User.findOne({ verificationToken, verificationTokenExpiresAt: { $gt: Date.now() } });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid or OTP Expired' });
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
        res.status(500).json({ success: false, message: error.message });
    }


}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ success: false, message: 'User is not registered' });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ success: false, message: 'Invalid password' });
            return;
        }

        GenerateTokenandSetCookie(res, user._id);
        
        user.lastLogin = new Date();
        user.save();

        res.status(200).json({
            success: true,
            message: 'Logged in successfully',
            user: { ...user._doc, password: undefined }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }

}

export const logout = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ success: true, message: 'Logged out successfully' });
}


export const forgotpassword = async (req,res) =>{
    const { email } = req.body;
    try {
        
        const user = await User.findOne({email});

        if (!user) {
            res.status(400).json({ success: false, message: 'User not Found' });
        }

        const resetToken = crypto.randomBytes(20).toString('hex');
        const resetTokenExpiresAt = Date.now() + 1 * 60 * 60 * 1000;

        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiresAt = resetTokenExpiresAt;

        await user.save();

        SendForgotPasswordEmail(user.name, user.email, `${process.env.CLIENT_URL}/resetpassword/${resetToken}`);

        res.status(200).json({ success: true, message: 'Password reset email sent successfully' });

        

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const resetpassword = async (req,res) =>{
    try {
        const { token } = req.params;
        const { password } = req.body;

        const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpiresAt: { $gt: Date.now() } });   

        if (!user) {
            res.status(400).json({ success: false, message: 'Invalid or expired reset token' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetToken = undefined;

        await user.save();

        SendResetSuccessEmail(user.name, user.email);

        res.status(200).json({ success: true, message: 'Password reset successfully' });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

export const checkAuth = async (req,res) =>{
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            res.status(400).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, user: { ...user._doc, password: undefined } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}

export const checkRole = async (req,res) =>{
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            res.status(400).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, user: { role:user.role, password: undefined } });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}

