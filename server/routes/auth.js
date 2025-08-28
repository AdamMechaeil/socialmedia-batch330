import express from "express";
import { checkLogin, signin, signup} from "../controllers/auth.js";
const authRouter=express.Router();

authRouter.post("/signin",signin);
authRouter.post("/signup",signup);
authRouter.post("/checkLogin",checkLogin);

export default authRouter;