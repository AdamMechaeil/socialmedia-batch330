import express from "express";
const app = express();
import dotenv from "dotenv"
import cors from "cors";
import { connectDb } from "./config/db.js";
import postRouter from "./routes/post.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";

dotenv.config({ path: './config/config.env' });
connectDb();
app.use(cors());
app.use(
  express.json({
    limit: "100mb",
    extended: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use("/posts",postRouter);
app.use("/auth",authRouter);
app.use("/user",userRouter);
const port = process.env.PORT
app.listen(port, () => {
  console.log(`server is runing at localhost:${port}`);
});
