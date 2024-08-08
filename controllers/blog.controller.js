import { Blog } from "../models/blog.model.js";

export const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find();

    if (!blogs) return res.status(404).json({ message: "No Blogs Found!!" });

    return res.status(200).json({ blogs });
  } catch (error) {
    console.log("GET-ALL-BLOGS: ", error.message);
  }
};

export const addBlog = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const image = req.file.path;

    const newBlog = await Blog.create({
      title,
      description,
      image,
      user: req.user._id,
    });
    res
      .status(201)
      .json({ newBlog, message: "New Blog Created Successfully!!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getBlogsById = async (req, res, next) => {
  try {
    const userId = req.user._id;

    if (!userId)
      return res
        .status(404)
        .json({ message: "Unauthorized access, Kindly login first!!" });

    const blogs = await Blog.find({ user: userId });

    if (!blogs)
      return res.status(402).json({ message: "OOPS Something went wrong" });

    return res
      .status(200)
      .json({ blogs, message: "Blogs fetched Successfully" });
  } catch (error) {
    console.log("BLOG-BY-ID: ", error.message);
  }
};

export const updateBlogs = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { blogId } = req.params;

    if (!userId || !blogId)
      return res
        .status(404)
        .json({ message: "Unauthorized access, Kindly login first!!" });

    const { title, description } = req.body;

    const updatedBlog = await Blog.findOneAndUpdate(
      {
        $and: [{ user: userId }, { _id: blogId }],
      },
      {
        title,
        description,
      },
      {
        new: true,
      }
    );

    if (!updatedBlog)
      return res.status(404).json({
        message: "OOPS Something went wrong while updating the blog!!",
      });

    return res
      .status(200)
      .json({ updatedBlog, message: "Blog Updated Successfully!!" });
  } catch (error) {
    console.log("UPDATE-BLOG: ", error.message);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { id } = req.params;

    if (!userId)
      return res
        .status(404)
        .json({ message: "Unauthorized access, Kindly login first!!" });

    const deleteBLog = await Blog.findOneAndDelete({
      $and: [{ user: userId }, { user: id }],
    });

    if (!deleteBlog)
      return res
        .status(400)
        .json({ message: "OOPS Something went wrong, Unable to delete!!" });

    const blogs = await Blog.find({ userId });

    return res
      .status(200)
      .json({ blogs, message: "Blog Deleted Successfully!!" });
  } catch (error) {}
};
