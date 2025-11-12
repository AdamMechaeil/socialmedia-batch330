import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import colors from "colors";
import fs from "fs";
import OTP from "../models/otp.js";
import { sendOTP } from "../utils/nodemailerUtil.js";

export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
      const validPass = await bcrypt.compare(password, user.password);
      if (validPass) {
        const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
          expiresIn: "2hr",
        });
        res.send({ token, msg: "Authenticated!" });
      } else {
        res.status(401).send("Authentication failed");
      }
    } else {
      res.status(404).send("Not Found!");
    }
  } catch (error) {
    console.log(error.red.bold);
  }
};

export const signup = async (req, res) => {
  try {
    const { name, password, email, phone } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const toBeCreatedUser = new User({
      name,
      password: hashPassword,
      email,
      phone,
      profilePicture: req.file.filename,
    });
    await toBeCreatedUser.save();
    const session = await sendOTP(email);
    res.status(201).send({ session, msg: "Created User" });
  } catch (error) {
    console.log(error);
    await User.deleteOne({
      email: req.body.email,
    });
    fs.unlink(`public/profilePic/${req.file.filename}`, (err) => {
      if (err) throw err;
      console.log("File deleted!");
    });
    res.status(451).send("Try Again!");
  }
};

export const verifyOtp = async (req, res) => {
  try {
    let { otp, sessionId, email } = req.body;
    let otpData = await OTP.findOne({ sessionId: sessionId });
    let attempts = otpData.attempts;
    if (otp == otpData.otp) {
      await OTP.findByIdAndDelete(otpData._id);
      const user = await User.findOne({ email: email });
      const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
        expiresIn: "2hr",
      });
      res.send({ token, msg: "Authenticated!" });
    } else {
      attempts -= 1;
      if (attempts == 0) {
        await OTP.findByIdAndDelete(otpData._id);
        res.status(400).send("Resend OTP");
      } else {
        await OTP.findByIdAndUpdate(otpData._id, {
          attempts,
        });
      }
      res
        .status(401)
        .send(
          `Wrong OTP! ${attempts} ${
            attempts > 1 ? "attempts" : "attempt"
          } remaining`
        );
    }
  } catch (error) {
    console.log(error);
  }
};

export const sendOTPController = async (req, res) => {
  try {
    let { email } = req.body;
    const session = await sendOTP(email);
    res.status(201).send({ session, msg: "Created OTP" });
  } catch (error) {
    console.log(error);
  }
};

export const checkLogin = async (req, res) => {
  try {
    const { token } = req.body;
    jwt.verify(token, process.env.SECRET);
    res.send({ msg: "Token Valid" });
  } catch (error) {
    console.log(error);
    res.status(401).send({ msg: "Signin again" });
  }
};
