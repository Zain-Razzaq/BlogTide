import { tokenValidation } from "./userTokenValidation.js";
import {
  getRecentBlogs,
  getBlogsDataForCurrentUser,
  getBlogDataById,
  searchBlogsInDatabase,
  createBlogInDatabase,
  getBlogAuthorByBlogId,
  updateBlogInDatabase,
  deleteBlogFromDatabase,
} from "../database/blogs.js";

export const getBlogsForHomePage = async (req, res) => {
  try {
    const currentUser = tokenValidation(req,res);
    if (currentUser) {
      const currentPage = req.params.pageNumber || 0;
      const limit = req.params.limit || 10;
      const skip = currentPage * limit;

      const { blogs, totalBlogs } = await getRecentBlogs(skip, limit);

      const totalPages = Math.ceil(totalBlogs / limit);
      res.status(200).send({ blogs, currentPage, totalPages });
    } else res.status(401).send({ message: "Unauthorized Access" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const getBlogsForCurrentUser = async (req, res) => {
  try {
    const currentUser = tokenValidation(req,res);
    if (currentUser) {
      const currentPage = req.params.pageNumber || 0;
      const limit = req.params.limit || 10;
      const skip = currentPage * limit;

      const { blogs, totalBlogs } = await getBlogsDataForCurrentUser(
        currentUser.id,
        skip,
        limit
      );
      const totalPages = Math.ceil(totalBlogs / limit);
      res.status(200).send({ blogs, currentPage, totalPages });
    } else res.status(401).send({ message: "Unauthorized Access" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const currentUser = tokenValidation(req,res);
    if (currentUser) {
      const { blogId } = req.params;
      const blog = await getBlogDataById(blogId);
      if (blog) {
        res.status(200).send(blog);
      } else res.status(404).send({ message: "Blog not found" });
    } else
      res
        .status(401)
        .send({ message: "You are not authorized to view this blog" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const searchBlogs = async (req, res) => {
  try {
    const currentUser = tokenValidation(req,res);
    if (currentUser) {
      let { searchQuery, pageNumber, limit } = req.query;
      const currentPage = pageNumber || 0;
      limit = limit || 10;
      const skip = currentPage * limit;

      const { blogs, totalBlogs } = await searchBlogsInDatabase(
        searchQuery,
        skip,
        limit
      );
      const totalPages = Math.ceil(totalBlogs / limit) || 1;
      res.status(200).send({ blogs, currentPage, totalPages });
    } else res.status(401).send({ message: "Unauthorized Access" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

/// rfklf

export const createBlog = async (req, res) => {
  try {
    const currentUser = tokenValidation(req,res);
    if (currentUser) {
      const { title, content, readTime } = req.body;

      const isCreated = await createBlogInDatabase({
        title,
        content,
        readTime,
        writterId: currentUser.id,
      });
      if (isCreated)
        res.status(201).send({ message: "Blog created successfully" });
      else res.status(500).send({ message: "Unable to create blog" });
    } else res.status(401).send({ message: "Unauthorized Access" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const currentUser = tokenValidation(req,res);
    if (currentUser) {
      const { blogId } = req.params;
      const writterId = await getBlogAuthorByBlogId(blogId);
      if (writterId != currentUser.id && !currentUser.isAdmin)
        return res.status(401).send({ message: "Unauthorized Access" });
      if (await deleteBlogFromDatabase(blogId))
        res.status(200).send({ message: "Blog deleted successfully" });
      else res.status(500).send({ message: "Unable to delete blog" });
    } else res.status(401).send({ message: "Unauthorized Access" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const currentUser = tokenValidation(req,res);
    if (currentUser) {
      const { blogId } = req.params;
      const writterId = await getBlogAuthorByBlogId(blogId);
      if (writterId != currentUser.id && !currentUser.isAdmin)
        return res.status(401).send({ message: "Unauthorized Access" });
      const { title, content, readTime } = req.body;
      const blog = {
        id: blogId,
        title,
        content,
        readTime,
      };
      if (await updateBlogInDatabase(blog))
        res.status(200).send({ message: "Blog updated successfully" });
      else res.status(500).send({ message: "Unable to update blog" });
    } else res.status(401).send({ message: "Unauthorized Access" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
