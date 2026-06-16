import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import otpModel from "../models/otp.model.js";
import transporter from "../config/nodemailer.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// SEND OTP
const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email address" });
    }

    // check if email already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "Email already registered" });
    }

    // generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // delete any existing OTP for this email
    await otpModel.deleteMany({ email });

    // save new OTP
    await otpModel.create({ email, otp });

    // send email
    await transporter.sendMail({
      from: `"Fardo Beauty" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Fardo Verification Code",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 40px 20px;">
          <h1 style="font-size: 32px; font-weight: 900; color: #12124a; margin: 0 0 8px;">FARDO.</h1>
          <p style="color: #4a4a6a; font-size: 14px; margin: 0 0 32px;">Premium Cosmetics</p>
          
          <h2 style="font-size: 20px; font-weight: 700; color: #12124a; margin: 0 0 12px;">Verify Your Email</h2>
          <p style="color: #4a4a6a; font-size: 14px; line-height: 1.6; margin: 0 0 32px;">
            Use the code below to verify your email address. This code expires in 5 minutes.
          </p>
          
          <div style="background: #f0effe; border-radius: 12px; padding: 24px; text-align: center; margin: 0 0 32px;">
            <p style="font-size: 40px; font-weight: 900; letter-spacing: 12px; color: #6c5ce7; margin: 0;">
              ${otp}
            </p>
          </div>
          
          <p style="color: #4a4a6a; font-size: 12px; margin: 0;">
            If you didn't request this, please ignore this email.
          </p>
        </div>
      `,
    });

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// VERIFY OTP
const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const record = await otpModel.findOne({ email });

    if (!record) {
      return res.json({
        success: false,
        message: "OTP expired. Please request a new one.",
      });
    }

    if (record.otp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    // OTP is valid - delete it
    await otpModel.deleteMany({ email });

    res.json({ success: true, message: "Email verified successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({ name, email, password: hashedPassword });
    const user = await newUser.save();

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ADMIN LOGIN
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign({ email, password }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      return res.json({ success: true, token });
    }

    res.json({ success: false, message: "Invalid admin credentials" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// GET USER PROFILE
const getUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userModel.findById(userId).select("-password");
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// UPDATE USER PROFILE
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { phone } = req.body;

    await userModel.findByIdAndUpdate(userId, { phone });
    res.json({ success: true, message: "Profile updated successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export {
  loginUser,
  registerUser,
  adminLogin,
  getUserProfile,
  updateUserProfile,
  sendOTP,
  verifyOTP,
};
