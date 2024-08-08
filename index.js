import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./utils/db.js";
import userRoutes from "./routes/user.routes.js";
import blogRoutes from "./routes/blog.routes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Server is Ready");
});

app.use("/users", userRoutes);
app.use("/blogs", blogRoutes);

connectDB();

app.listen(process.env.PORT || 4000, () => {
  console.log(
    `Server is successefully runnning on PORT ${process.env.PORT || 4000}`
  );
});
