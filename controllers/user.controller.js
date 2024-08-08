import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    if (!users) return res.status(404).json({ message: "No Users found!!" });

    return res.status(200).json({ users });
  } catch (error) {
    console.log("GET-ALL-USERS: ", error.message);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { username, name, email, password } = req.body;

    const existingUser = await User.findOne({
      $or: [
        { email },
        { username },
      ],
    });

    if (existingUser) {
      return res.status(401).json({ message: 'Username or Email Already exists!!' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      name,
      email,
      password: hashedPass,
    });

    if (!newUser) {
      return res.status(500).json({ message: 'OOPS Something went wrong!!' });
    }

    return res.status(200).json({ message: 'User Created Successfully. Please log in.' });

  } catch (error) {
    console.log('CREATE-USER: ', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};


export const LoginUser = async (req, res, next) => {
  try {
    const { username, password, confirmPassword } = req.body;

    if (password !== confirmPassword)
      return res.status(401).json({ message: "Password does not match!!" });

    const user = await User.findOne({ username });

    if (!user)
      return res.status(404).json({ message: "User Does not exist!!" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(402).json({ message: "Invalid Credentials!!" });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN, {
      expiresIn: "1h",
    });

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .status(200)
      .json({ user, message: "User Logged In Successfully!!" });

  } catch (error) {
    console.log("LOGIN-USER: ", error.message);
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: 'Logout successful' });
};
