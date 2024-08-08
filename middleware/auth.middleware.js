import jwt from "jsonwebtoken";
import  { User } from "../models/user.model.js";

export const authenticateUser = async(req, res, next) => {
    try {
        const token = req.cookies.token || req.header('Authorization')?.replace('Bearer ', '');

        if(!token)
            return res.status(401).json({ message: "The User is not Authenticated!!" });

        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        const user = await User.findOne({ _id: decoded._id });

        if(!user)
            return res.status(401).json({ message: "User Not found, please login or register" });

        req.user = user;

        next();
    } catch (error) {
        console.log("MIDDLEWARE: ", error.message);
    }
}