import {
  getBlogsForHomePage,
  getBlogsForCurrentUser,
  getBlogById,
  createBlog,
  deleteBlog,
  updateBlog,
  searchBlogs,
} from "../controllers/blogs.js";

import express from "express";

const router = express.Router();

router.get("/search-blogs", searchBlogs);
router.get("/explore-blogs/:pageNumber", getBlogsForHomePage);
router.get("/current-user-blogs", getBlogsForCurrentUser);
router.get("/:blogId", getBlogById);
router.post("/create-blog", createBlog);
router.delete("/delete-blog/:blogId", deleteBlog);
router.put("/update-blog/:blogId", updateBlog);

export default router;
