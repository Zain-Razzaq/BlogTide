import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

import BlogInputForm from "../../components/BlogInputForm";
import {
  useGetBlogByIdQuery,
  useUpdateBlogMutation,
} from "../../store/api/blogsApi";
import { getBlogByIdURL } from "../../serverApiEndpoints";
import Loader from "../../lib/Loader";

const EditBlogPage = () => {
  const [updateBlog, { isLoading: updateBlogIsLoading }] =
    useUpdateBlogMutation();
  const { blogId } = useParams();
  const {
    data,
    error: blogError,
    isLoading: blogIsLoading,
  } = useGetBlogByIdQuery(getBlogByIdURL(blogId));

  useEffect(() => {
    updateBlogIsLoading ? toast.loading("Updating Blog") : toast.dismiss();
  }, [updateBlogIsLoading]);

  const handelFormSubmit = async (data) => {
    const res = await updateBlog({ blogId, data });
    res.error
      ? toast.error(res.error)
      : toast.success("Blog Updated Successfully");
  };

  return (
    <div className="pt-28 w-[80vw] mx-auto text-customColor1">
      <h1 className="text-4xl font-bold mx-auto my-3">Edit Blog</h1>
      {blogIsLoading ? (
        <div className="w-full flex justify-center">
          <Loader />
        </div>
      ) : (
        <>
          {blogError ? (
            <div className="text-xl text-customColor1 ">{blogError}</div>
          ) : (
            <BlogInputForm
              data={data}
              onSubmit={handelFormSubmit}
              isLoading={updateBlogIsLoading}
            />
          )}
        </>
      )}
    </div>
  );
};

export default EditBlogPage;
