import BlogModel from "../models/Blogs.js";

export const createBlogInDatabase = async ({
  title,
  content = "",
  readTime = "1 min read",
  writterId,
}) => {
  return await BlogModel.create({
    title,
    content,
    readTime,
    author: writterId,
  });
};

export const deleteBlogFromDatabase = async (blogId) => {
  return await BlogModel.deleteOne({ _id: blogId });
};

export const updateBlogInDatabase = async (blog) => {
  return await BlogModel.updateOne(
    { _id: blog.id },
    {
      $set: {
        title: blog.title,
        content: blog.content,
        readTime: blog.readTime,
      },
    }
  );
};

export const getRecentBlogs = async (skip, limit) => {
  const blogs = await BlogModel.find()
    .populate("author", "name")
    .sort({ updatedAt: -1 })
    .skip(skip)
    .limit(limit);
  const totalBlogs = await BlogModel.countDocuments();
  return { blogs, totalBlogs };
};

export const getBlogsDataForCurrentUser = async (userId) => {
  const blogs = await BlogModel.find({ author: userId })
    .populate("author", "name")
    .sort({
      updatedAt: -1,
    });
  const totalBlogs = await BlogModel.countDocuments({ author: userId });
  return { blogs, totalBlogs };
};

export const getBlogDataById = async (id) => {
  return BlogModel.findOne({ _id: id }).populate("author", "name");
};

export const getBlogAuthorByBlogId = async (blogId) => {
  const author = await BlogModel.findOne({ _id: blogId }).select("author");
  return author.author;
};

export const searchBlogsInDatabase = async (searchQuery, skip, limit) => {
  const blogs = await BlogModel.find({
    title: { $regex: searchQuery, $options: "i" },
  })
    .populate("author", "name")
    .sort({ updatedAt: -1 })
    .skip(skip)
    .limit(limit);
  const totalBlogs = await BlogModel.countDocuments({
    title: { $regex: searchQuery, $options: "i" },
  });
  return { blogs, totalBlogs };
};
