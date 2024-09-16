import dotenv from 'dotenv';
import { transporter } from './EmailConfig.js';
import { PASSWORD_RESET_SUCCESS_TEMPLATE } from './EmailTemplate.js';
dotenv.config();

export const SendResetSuccessEmail = async (name, email) => {
    const htmlContent = PASSWORD_RESET_SUCCESS_TEMPLATE
        .replace("{name}", name);

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