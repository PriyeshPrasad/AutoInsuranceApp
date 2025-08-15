import express from "express"
import { isAuthenticated, login, logout, register, resetPassword, sendResetOtp, sendVerifyOtp, verifyEmail } from "../controllers/authController.js";
import userAuth from "../middleware/userAuth.js";

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.post('/sendverifyotp', userAuth, sendVerifyOtp);
authRouter.post('/verifyaccount', userAuth, verifyEmail);
authRouter.get('/isauth', userAuth, isAuthenticated);
authRouter.post('/sendresetotp', sendResetOtp);
authRouter.post('/resetpassword', resetPassword);

export default authRouter;