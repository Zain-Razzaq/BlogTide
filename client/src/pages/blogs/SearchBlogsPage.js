import { useEffect, useState } from "react";
import { useParams, useNavigate, generatePath } from "react-router-dom";

import { useLazySearchBlogsQuery } from "../../store/api/blogsApi";
import { HOME_PAGE_URL, SEARCH_BLOGS_URL } from "../../routes";
import SearchBar from "../../components/SearchBar";
import BlogCard from "../../components/BlogCard";
import PageNavigator from "../../components/PageNavigator";
import { homeSvg } from "../../assets/svg";
import Loader from "../../lib/Loader";

const SearchBlogsPage = () => {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(0);
  const { searchQuery } = useParams();
  const [trigger, { data: { blogs, totalPages } = {}, error, isLoading }] =
    useLazySearchBlogsQuery({});

  useEffect(() => {
    trigger({ searchQuery, pageNumber });
  }, [pageNumber, searchQuery, trigger]);

  const handelSearchFormSubmit = ({ searchQuery }) =>
    navigate(generatePath(SEARCH_BLOGS_URL, { searchQuery }));

  return (
    <div className="pt-32">
      <div className="w-[85vw] mx-auto py-20 px-24 z-20 bg-customColor3 text-customColor1">
        <div className="flex items-center my-5">
          <div onClick={() => navigate(HOME_PAGE_URL)}>{homeSvg()}</div>
          <div className="w-full">
            <SearchBar
              defaultValue={searchQuery}
              handelFormSubmit={handelSearchFormSubmit}
            />
          </div>
        </div>
        {isLoading ? (
          <div className="flex justify-center">
            <Loader />
          </div>
        ) : error ? (
          <div className="text-xl flex justify-center">{error}</div>
        ) : (
          <>
            {blogs?.map(({ _id, title, content, author, readTime }) => (
              <BlogCard
                key={_id}
                id={_id}
                title={title}
                content={content}
                author={author.name}
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
    </div>
  );
};

export default SearchBlogsPage;
