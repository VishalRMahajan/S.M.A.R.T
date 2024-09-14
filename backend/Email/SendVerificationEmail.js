import dotenv from 'dotenv';
import { transporter } from './EmailConfig.js';
import { VERIFICATION_EMAIL_TEMPLATE } from './EmailTemplate.js';
dotenv.config();

export const SendVerificationEmail = async (name, email, verificationToken) => {
    const htmlContent = VERIFICATION_EMAIL_TEMPLATE
        .replace("{name}", name)
        .replace("{verificationCode}", verificationToken);

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Verify Your Email",
        html: htmlContent
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
    } catch (error) {
        console.error("Error sending email:", error.message);
    }
};

/*
const email = "vism06@gmail.com";
const verificationToken = "123456"; 
const name = "Vishal"
SendVerificationEmail(name,email, verificationToken);
*/