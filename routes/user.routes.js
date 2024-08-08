import express from "express";
import {
  createUser,
  getAllUsers,
  LoginUser,
  logoutUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/signup", createUser);
router.post("/signin", LoginUser);
router.post("/logout", logoutUser);

export default router;
