import OTP from "../models/otp.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";

export async function sendOTP(email) {
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL, // your Gmail
        pass: process.env.PASSWORD, // use an App Password (not your Gmail password)
      },
    });

    const handlebarOptions = {
      viewEngine: {
        extname: ".hbs",
        partialsDir: path.resolve("./views/"),
        defaultLayout: false,
      },
      viewPath: path.resolve("./views/"),
      extName: ".hbs",
    };

    transporter.use("compile", hbs(handlebarOptions));
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    let mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "OTP for Verification",
      template: "otp",
      context: {
        otp: otp,
      },
    };
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        throw err;
      }
    });
    const date = new Date();
    const miliseconds = date.getMilliseconds();
    const salt = bcrypt.genSaltSync(10);
    const session = await bcrypt.hash(`${miliseconds}${email}`, salt);
    await OTP.create({ otp, sessionId: session });
    return session;
  } catch (error) {
    console.log(error);
  }
}
