import { useEffect, useState } from "react";
import { generatePath, useNavigate } from "react-router-dom";

import BlogCard from "./BlogCard";
import Loader from "../lib/Loader";
import { useLazyGetBlogsQuery } from "../store/api/blogsApi";
import {
  getCurrentUserBlogsURL,
  getExploreBlogsURL,
} from "../serverApiEndpoints";
import { SEARCH_BLOGS_URL } from "../routes";
import PageNavigator from "./PageNavigator";
import SearchBar from "./SearchBar";

const BlogsContainer = ({ isExplore }) => {
  const navigate = useNavigate();
  const [trigger, { data: { blogs, totalBlogs } = {}, error, isLoading }] =
    useLazyGetBlogsQuery();
  const [pageNumber, setPageNumber] = useState(0);

  const blogURL = isExplore ? getExploreBlogsURL() : getCurrentUserBlogsURL();
  const totalPages = Math.ceil(totalBlogs / 10);

  useEffect(() => {
    trigger({ blogURL, pageNumber });
  }, [blogURL, isExplore, pageNumber, trigger]);

  useEffect(() => setPageNumber(0), [isExplore]);

  const handelSearchFormSubmit = ({ searchQuery }) =>
    navigate(generatePath(SEARCH_BLOGS_URL, { searchQuery }));

  return (
    <div className=" w-8/12 mt-5 mx-auto text-customColor1 flex flex-col items-center">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="w-full">
          {error ? (
            <div className="text-xl flex justify-center">{error}</div>
          ) : (
            <>
              <SearchBar handelFormSubmit={handelSearchFormSubmit} />
              {blogs?.map(({ id, title, content, author, readTime }) => (
                <BlogCard
                  key={id}
                  id={id}
                  title={title}
                  content={content}
                  author={author}
                  readTime={readTime}
                />
              ))}
              {blogs && (
                <PageNavigator
                  page={pageNumber}
                  setPage={setPageNumber}
                  maxPage={totalPages}
                />
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogsContainer;
