import express from "express";
import { checkLogin, sendOTPController, signin, signup, verifyOtp} from "../controllers/auth.js";
import multer from "multer";
const authRouter=express.Router();

 // Configure Multer for file storage
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "public/profilePic"); // Specify the directory to store uploaded files
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname); // Define the filename
        }
    });
    const upload = multer({ storage: storage });

authRouter.post("/signin",signin);
authRouter.post("/signup",upload.single("profilePicture"),signup);
authRouter.post("/verifyOtp",verifyOtp)
authRouter.post("/resendOtp",sendOTPController)
authRouter.post("/checkLogin",checkLogin);

export default authRouter;