import express from "express";
import {
  login,
  register,
  logout,
  sendVerifyOtp,
  verifyEmail,
} from "../controllers/authController.js";
import authentication from "../middleware/userAuth.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout", logout);
authRouter.post("/send-verify-otp", authentication, sendVerifyOtp);
authRouter.post("/verify-account", authentication, verifyEmail);

export default authRouter;
