import { connection } from "../app.js";

export const getTotalNumberOfBlogs = async () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT COUNT(*) AS total FROM blogs", (error, result) => {
      if (error) return reject(error);
      return resolve(result[0].total);
    });
  });
};

export const getBlogsDataForHomePage = async (pageNumber) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT blogs.id ,blogs.title, SUBSTR(blogs.content,1,1000) AS content,users.name as author , blogs.read_time FROM blogs JOIN users ON blogs.writter_id = users.id ORDER BY blogs.last_updated DESC LIMIT ? , 10 ",
      [pageNumber * 10],
      (error, result) => {
        if (error) return reject(error);
        return resolve(JSON.stringify(result));
      }
    );
  });
};

export const getTotalNumberOfBlogsForCurrentUser = async (userId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT COUNT(*) AS total FROM blogs WHERE writter_id = ?",
      [userId],
      (error, result) => {
        if (error) return reject(error);
        return resolve(result[0].total);
      }
    );
  });
};

export const getBlogsDataForCurrentUser = async (userId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT blogs.id ,blogs.title, SUBSTR(blogs.content,1,1000) AS content,users.name as author , blogs.read_time FROM blogs JOIN users ON blogs.writter_id = users.id WHERE blogs.writter_id = ? ORDER BY blogs.last_updated DESC LIMIT 10",
      [userId],
      (error, result) => {
        if (error) return reject(error);
        return resolve(JSON.stringify(result));
      }
    );
  });
};

export const getBlogDataById = async (id) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT blogs.id ,blogs.title, blogs.content,users.name as author , blogs.read_time , blogs.last_updated , blogs.writter_id FROM blogs JOIN users ON blogs.writter_id = users.id WHERE blogs.id = ?",
      [id],
      (error, result) => {
        if (error) return reject(error);
        return resolve(JSON.stringify(result[0]));
      }
    );
  });
};

export const getBlogAuthorByBlogId = async (blogId) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT writter_id FROM blogs WHERE id = ?",
      [blogId],
      (error, result) => {
        if (error) return reject(error);
        return resolve(result[0].writter_id);
      }
    );
  });
};

export const createBlogInDatabase = async (blog) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO blogs (id,title,content,written_at,last_updated,read_time, writter_id) VALUES (?, ?, ?, ?, ? ,? ,?)",
      [
        blog.id,
        blog.title,
        blog.content,
        blog.writtenAt,
        blog.lastUpdated,
        blog.readTime,
        blog.writterId,
      ],
      (error) => {
        if (error) return reject(error);
        return resolve(true);
      }
    );
  });
};

export const deleteBlogFromDatabase = async (blogId) => {
  return new Promise((resolve, reject) => {
    connection.query("DELETE FROM blogs WHERE id = ?", [blogId], (error) => {
      if (error) return reject(error);
      return resolve(true);
    });
  });
};

export const updateBlogInDatabase = async (blog) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "UPDATE blogs SET title = ?, content = ?, last_updated = ?, read_time = ? WHERE id = ?",
      [blog.title, blog.content, blog.lastUpdated, blog.readTime, blog.id],
      (error) => {
        if (error) return reject(error);
        return resolve(true);
      }
    );
  });
};

export const getTotalNumberOfBlogsForSearchQuery = async (searchQuery) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT COUNT(*) AS total FROM blogs WHERE title LIKE ?",
      [`%${searchQuery}%`],
      (error, result) => {
        if (error) return reject(error);
        return resolve(result[0].total);
      }
    );
  });
};

export const searchBlogsInDatabase = async (searchQuery, pageNumber) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT blogs.id ,blogs.title, SUBSTR(blogs.content,1,1000) AS content,users.name as author , blogs.read_time FROM blogs JOIN users ON blogs.writter_id = users.id WHERE blogs.title LIKE ? ORDER BY blogs.last_updated DESC LIMIT ? , 10",
      [`%${searchQuery}%`, pageNumber * 10],
      (error, result) => {
        if (error) return reject(error);
        return resolve(JSON.stringify(result));
      }
    );
  });
};
