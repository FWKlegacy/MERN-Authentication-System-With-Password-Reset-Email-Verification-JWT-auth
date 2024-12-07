import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import transporter from "../config/nodeMailer.js";

//user signup controller function
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.json({ success: false, message: "Missing details" });
  }
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already Exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    //creating new user
    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();

    //generating token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production " ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    //sending welcome email
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to GreatStack",
      text: `Welcome to GreatStack website. Your account has successfully been created with email id :${email}`,
    };
    await transporter.sendMail(mailOptions);

    return res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

///user login controller function
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ success: false, message: "email and password required" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "invalid email" });
    }

    //compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "invalid password" });
    }

    //generating token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production " ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

///user logout controller function

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production " ? "none" : "strict",
    });
    return res.json({ success: true, message: "logged out" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//sending verification OTP controller function
export const sendVerifyOtp = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await userModel.findById(userId);
    if (user.IsAccountVerified) {
      return res.json({ success: true, message: "Account already Verified!" });
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.verifyOtp = otp;
    user.verifyOtpExpiredAt = Date.now() + 24 * 60 * 60 * 1000;
    await user.save();
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account Verification OTP",
      text: `Your OTP is ${otp}. Verify your account using this OTP. The OTP expires in 24 hours`,
    };

    await transporter.sendMail(mailOptions);
    return res.json({
      success: true,
      message: "Verification OTP sent on Email",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//user verify user email eaccount controller function
export const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;
  if (!userId || otp) {
    return res.json({ success: false, message: "Missing details" });
  }
  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "user not found" });
    }
    if (user.verifyOtp === "" || user.verifyOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }
    if (user.verifyOtpExpiredAt < Date.now()) {
      return res.json({ success: false, message: "OTP Expired" });
    }
    user.IsAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpiredAt = 0;
    await user.save();
    return res.json({ success: true, message: "email created successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//checking if user is authenticated
export const isAuthenticated = async (req, res) => {
  try {
    return res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//send password reset OTP
export const sendResetOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.json({ success: false, message: "email is required" });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "user not found !" });
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.resetOtp = otp;
    user.resetOtpExpiredAt = Date.now() + 15 * 60 * 1000;
    await user.save();
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Password Reset OTP",
      text: `Your OTP for resetting password is ${otp}. Use this OTP to proceed resetting your password`,
    };

    await transporter.sendMail(mailOptions);
    return res.json({
      success: true,
      message: "OTP sent to Email",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//reset user password
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return res.json({
      success: false,
      message: "email,otp and newPassword required",
    });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "user not found" });
    }
    if (user.resetOtp === "" || user.resetOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }
    if (user.resetOtpExpiredAt < Date.now()) {
      return res.json({ success: false, message: "OTP is expires" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpiredAt = 0;
    await user.save();
    return res.json({
      success: true,
      message: "password has successfully been reset",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
