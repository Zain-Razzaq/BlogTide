import { useEffect, useState } from "react";
import { useParams, useNavigate, generatePath } from "react-router-dom";
import { toast } from "react-hot-toast";

import {
  useGetBlogByIdQuery,
  useDeleteBlogMutation,
} from "../../store/api/blogsApi";
import { getBlogByIdURL } from "../../serverApiEndpoints";
import Loader from "../../lib/Loader";
import { editSvg, threeDotsSvg, deleteSvg } from "../../assets/svg";
import MenuListItem from "../../lib/MenuListItem";
import { EDIT_BLOG_URL, HOME_PAGE_URL } from "../../routes";

const BlogPage = () => {
  const [deleteBlog, { isLoading: deletingBlog }] = useDeleteBlogMutation();
  const { blogId } = useParams();
  const navigate = useNavigate();
  const {
    data,
    error: blogError,
    isLoading: blogIsLoading,
  } = useGetBlogByIdQuery(getBlogByIdURL(blogId));
  const [isMenuButtonClicked, setIsMenuButtonClicked] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("userInfo"));

  const isEditable =
    currentUser?.userId === data?.author._id || currentUser?.isAdmin;

  useEffect(() => {
    deletingBlog ? toast.loading("Deleting Blog") : toast.dismiss();
  }, [deletingBlog]);

  const handelDelete = async () => {
    const res = await deleteBlog(blogId);
    if (res.error) toast.error(res.error);
    else {
      toast.success("Blog Deleted");
      navigate(HOME_PAGE_URL);
    }
  };

  const handelEdit = () => navigate(generatePath(EDIT_BLOG_URL, { blogId }));

  return (
    <div className=" bg-customColor2 pt-24">
      {blogIsLoading ? (
        <div className="w-screen mt-5 flex justify-center">
          <Loader />
        </div>
      ) : (
        <div className=" bg-customColor3 px-[8%]  md:w-10/12 my-10 mx-auto flex flex-col items-center">
          {blogError ? (
            <div className=" text-xl text-customColor1 ">{blogError}</div>
          ) : (
            <div className="  text-customColor1 my-[8%] w-full relative">
              {isEditable && (
                <div
                  className="absolute -top-5 -right-5 group cursor-pointer"
                  tabIndex="0"
                  onClick={() => setIsMenuButtonClicked(!isMenuButtonClicked)}
                  onBlur={() => setIsMenuButtonClicked(false)}
                >
                  {threeDotsSvg()}
                  <div
                    className={` bg-customColor2 z-10 text-customColor1 p-2 absolute top-10 right-0 divide-y divide-customColor1 ${
                      isMenuButtonClicked ? "visible" : "invisible"
                    }`}
                  >
                    <MenuListItem
                      content="Edit"
                      icon={editSvg()}
                      eventHandler={handelEdit}
                    />
                    <MenuListItem
                      content="Delete"
                      icon={deleteSvg()}
                      eventHandler={handelDelete}
                    />
                  </div>
                </div>
              )}
              <div className="h-[150px] flex items-center  relative">
                <span className="text-[10rem] md:text-[14rem] ml-1 opacity-40 leading-[8rem] absolute top-0 -left-10 select-none">
                  {data.title && data?.title[0]}
                </span>
                <h2 className="text-2xl md:text-4xl font-lora font-semibold overflow-hidden select-none">
                  {data?.title}
                </h2>
              </div>
              <div className="text-md font-lora mt-3 flex justify-between flex-wrap">
                <p>
                  By {data?.author.name} • {data?.readTime} Min read
                </p>
                <p>Last update : {data.updatedAt}</p>
              </div>
              <p className="mt-3 text-lg font-serif text-justify whitespace-pre-line">
                {data?.content}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogPage;
