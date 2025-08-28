import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import colors from "colors";
export const signin = async (req, res) => {
    try {
        const {email,password}=req.body;
        const user=await User.findOne({email:email})
        if(user){
            const validPass=await bcrypt.compare(password,user.password);
            if(validPass){
                const token = jwt.sign({ userId:user._id }, process.env.SECRET, {
                    expiresIn: "1hr",
                  });
                  res.send({token,msg:"Authenticated!"})
            }else{
                res.status(401).send("Authentication failed");
            }
        }else{
            res.status(404).send("Not Found!")
        }
    } catch (error) {
    console.log(error.red.bold);
    }
};

export const signup = async (req, res) => {
  try {
    const { name, password, email, phone } =
      req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const toBeCreatedUser = new User({
      name,
      password: hashPassword,
      email,
      phone
    });
    const user = await toBeCreatedUser.save();
    const token = jwt.sign({  userId:user._id  }, process.env.SECRET, {
      expiresIn: "1hr",
    });
    res.send({ token, msg: "Created User" });
  } catch (error) {
    console.log(error);
    res.send(error)
  }
};


export const checkLogin=async(req,res)=>{
  try {
    const {token}=req.body;
    const verified=await jwt.verify(token,process.env.SECRET);
    res.send({msg:"Token Valid"})
  } catch (error) {
    console.log(error);
    res.status(401).send({msg:"Signin again"})
  }
}