import { nanoid } from "nanoid";
import camelcaseKeys from "camelcase-keys";

import {
  getTotalNumberOfBlogs,
  getBlogsDataForHomePage,
  getTotalNumberOfBlogsForCurrentUser,
  getBlogsDataForCurrentUser,
  getBlogDataById,
  createBlogInDatabase,
  deleteBlogFromDatabase,
  updateBlogInDatabase,
  getBlogAuthorByBlogId,
  getTotalNumberOfBlogsForSearchQuery,
  searchBlogsInDatabase,
} from "../database/blogsData.js";
import { tokenValidation } from "./userTokenValidation.js";

export const getBlogsForHomePage = async (req, res) => {
  try {
    const currentUser = tokenValidation(req.cookies?.userToken);
    if (currentUser) {
      const totalBlogs = await getTotalNumberOfBlogs();
      if (totalBlogs) {
        const blogs = await getBlogsDataForHomePage(req.params.pageNumber);
        res
          .status(200)
          .send({ blogs: camelcaseKeys(JSON.parse(blogs)), totalBlogs });
      } else res.status(404).send({ message: "No blogs found" });
    } else res.status(401).send({ message: "Unauthorized Access" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const getBlogsForCurrentUser = async (req, res) => {
  try {
    const currentUser = tokenValidation(req.cookies?.userToken);
    if (currentUser) {
      const totalBlogs = await getTotalNumberOfBlogsForCurrentUser(
        currentUser.id
      );
      if (totalBlogs) {
        const blogs = await getBlogsDataForCurrentUser(currentUser.id);
        res
          .status(200)
          .send({ blogs: camelcaseKeys(JSON.parse(blogs)), totalBlogs });
      } else res.status(404).send({ message: "No blogs found" });
    } else res.status(401).send({ message: "Unauthorized Access" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const getBlogById = async (req, res) => {
  try {
    const currentUser = tokenValidation(req.cookies?.userToken);
    if (currentUser) {
      const { blogId } = req.params;
      const blog = await getBlogDataById(blogId);
      if (blog) {
        res.status(200).send(camelcaseKeys(JSON.parse(blog)));
      } else res.status(404).send({ message: "Blog not found" });
    } else
      res
        .status(401)
        .send({ message: "You are not authorized to view this blog" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const createBlog = async (req, res) => {
  try {
    const currentUser = tokenValidation(req.cookies?.userToken);
    if (currentUser) {
      const { title, content, readTime } = req.body;
      const blog = {
        id: nanoid(),
        title,
        content,
        readTime,
        writtenAt: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        writterId: currentUser.id,
      };
      const isCreated = await createBlogInDatabase(blog);
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
    const currentUser = tokenValidation(req.cookies?.userToken);
    if (currentUser) {
      const { blogId } = req.params;
      const writterId = await getBlogAuthorByBlogId(blogId);
      if (writterId !== currentUser.id && currentUser.role !== "admin")
        return res.status(401).send({ message: "Unauthorized Access" });
      const isDeleted = await deleteBlogFromDatabase(blogId);
      if (isDeleted)
        res.status(200).send({ message: "Blog deleted successfully" });
      else res.status(500).send({ message: "Unable to delete blog" });
    } else res.status(401).send({ message: "Unauthorized Access" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const currentUser = tokenValidation(req.cookies?.userToken);
    if (currentUser) {
      const { blogId } = req.params;
      const writterId = await getBlogAuthorByBlogId(blogId);
      if (writterId !== currentUser.id && currentUser.role !== "admin")
        return res.status(401).send({ message: "Unauthorized Access" });
      const { title, content, readTime } = req.body;
      const blog = {
        id: blogId,
        title,
        content,
        readTime,
        lastUpdated: new Date().toISOString(),
        writter_id: currentUser.id,
      };
      const isUpdated = await updateBlogInDatabase(blog);
      if (isUpdated)
        res.status(200).send({ message: "Blog updated successfully" });
      else res.status(500).send({ message: "Unable to update blog" });
    } else res.status(401).send({ message: "Unauthorized Access" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const searchBlogs = async (req, res) => {
  try {
    const currentUser = tokenValidation(req.cookies?.userToken);
    if (currentUser) {
      const { searchQuery, pageNumber } = req.query;
      const totalBlogs = await getTotalNumberOfBlogsForSearchQuery(searchQuery);
      if (totalBlogs) {
        const searchedBlogs = await searchBlogsInDatabase(
          searchQuery,
          pageNumber
        );
        if (searchedBlogs) {
          res.status(200).send({
            blogs: camelcaseKeys(JSON.parse(searchedBlogs)),
            totalBlogs,
          });
        } else res.status(404).send({ message: "Unable to load Blogs" });
      } else res.status(404).send({ message: "No blogs found" });
    } else res.status(401).send({ message: "Unauthorized Access" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
