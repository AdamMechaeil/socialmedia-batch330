import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import path from "path"
import { connectDb } from "./config/db.js";
import postRouter from "./routes/post.js";
import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import { fileURLToPath } from "url";

// Recreate __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
dotenv.config({ path: './config/config.env' });
connectDb();
app.use(cors({
 origin:["http://localhost:3000"]
}));
app.use(express.static(path.join(__dirname, "public")));
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
  console.log(`server is running at localhost:${port}`.underline.bold.cyan);
});
