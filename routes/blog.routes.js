import express from "express";
import {
  addBlog,
  deleteBlog,
  getAllBlogs,
  getBlogsById,
  updateBlogs,
} from "../controllers/blog.controller.js";
import upload from "../utils/multer.config.js";
import { authenticateUser } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", getAllBlogs);
router.post("/add", authenticateUser, upload.single("image"), addBlog);
router.get("/myblogs", authenticateUser, getBlogsById);
router.post("/update/:blogId", authenticateUser, updateBlogs);
router.delete("/delete/:blogId", authenticateUser, deleteBlog);

export default router;
