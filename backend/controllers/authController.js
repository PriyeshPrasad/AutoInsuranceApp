import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";
import { EMAIL_VERIFY_TEMPLATE, PASSWORD_RESET_TEMPLATE } from "../config/emailTemplate.js";

// Register
export const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Missing details"
        })
    }
    try {
        const existingUser = await userModel.findOne({ email })

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })
        await user.save();

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        //Sending a welcome email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome to eCommerceApp",
            text: `Welcome to eCommerce application. Your account has been created with email id ${email}`
        }

        await transporter.sendMail(mailOptions);

        res.status(200).json({
            success: true,
            message: "User registered successdully"
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//Login
export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Email and Password are required"
        })
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email"
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid password"
            })
        }

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            success: true,
            message: "User logged in successfully"
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//Logout 
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
        })

        return res.status(200).json({
            success: true,
            message: "User logged out"
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const sendVerifyOtp = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await userModel.findById(userId)

        if (user.isAccountVerified) {
            return res.status(500).json({
                success: false,
                message: "Account already verified"
            })
        }

        const otp = new String(Math.floor(100000 + Math.random() * 900000));
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000;

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Account verification OTP",
            //text: `Your OTP is ${otp}. Verify your account using this OTP.`,
            html: EMAIL_VERIFY_TEMPLATE.replace("{{otp}}",otp).replace("{{email}}",user.email)
        }

        await transporter.sendMail(mailOptions);

        return res.status(200).json({
            success: true,
            message: "OTP sent successfully"
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const verifyEmail = async (req, res) => {
    const { otp } = req.body
    const userId = req.userId

    if (!userId || !otp) {
        return res.status(500).json({
            success: false,
            message: "Missing details"
        })
    }

    try {
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(500).json({
                success: false,
                message: "User not found"
            })
        }

        if (user.verifyOtp === '' || user.verifyOtp !== otp) {
            return res.status(500).json({
                success: false,
                message: "Invalid OTP"
            })
        }

        if (user.verifyOtpExpireAt < Date.now()) {
            return res.status(500).json({
                success: false,
                message: "OTP expired"
            })
        }

        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.resetOtpExipreAt = 0

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Email verified successfully"
        })
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// Check if user is authenticated
export const isAuthenticated = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Authentication successful"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

// Send Password Reset OTP

export const sendResetOtp = async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(500).json({
            success: false,
            message: "Email is required"
        })
    }
    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(500).json({
                success: false,
                message: "user not found"
            })
        }

        const otp = new String(Math.floor(100000 + Math.random() * 900000));
        user.resetOtp = otp;
        user.resetOtpExipreAt = Date.now() + 15 * 60 * 1000;

        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Password reset OTP",
            html: PASSWORD_RESET_TEMPLATE.replace("{{otp}}",otp).replace("{{email}}",user.email)
            //text: `Your OTP for resetting your password is ${otp}.`
        }

        await transporter.sendMail(mailOptions);

        return res.status(200).json({
            success: true,
            message: "OTP sent to your email"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

// Reset user Pssword

export const resetPassword = async (req, res) => {
    const { otp, email, newpassword } = req.body;
    if (!otp || !email || !newpassword) {
        return res.status(500).json({
            success: false,
            message: "Email, OTP and new password is required"
        })
    }
    try {
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(500).json({
                success: false,
                message: "Invalid User"
            })
        }

        if (user.resetOtp === "" || user.resetOtp !== otp) {
            return res.status(500).json({
                success: false,
                message: "Invalid OTP"
            })
        }

        if (user.resetOtpExipreAt < Date.now()) {
            return res.status(500).json({
                success: false,
                message: "OTP expired"
            })
        }

        const hashedPassword = await bcrypt.hash(newpassword, 10);

        user.password = hashedPassword;
        user.resetOtp = "";
        user.resetOtpExipreAt = 0;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "new password reset successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}