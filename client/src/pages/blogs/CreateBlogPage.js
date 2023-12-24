import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { useValidateUserQuery } from "../../store/api/validationApi";
import { HOME_PAGE_URL, ROOT_URL } from "../../routes";
import BlogInputForm from "../../components/BlogInputForm";
import { useCreateNewBlogMutation } from "../../store/api/blogsApi";

const CreateBlogPage = () => {
  const [createBlog, { isLoading }] = useCreateNewBlogMutation();
  const { error: validationError } = useValidateUserQuery();
  const navigate = useNavigate();

  useEffect(() => {
    isLoading ? toast.loading("Creating Blog") : toast.dismiss();
  }, [isLoading]);

  useEffect(() => {
    if (validationError) {
      toast.error(validationError);
      navigate(ROOT_URL);
    }
  }, [navigate, validationError]);

  const handelFormSubmit = async (data) => {
    const res = createBlog(data);
    if (res.error) toast.error(res.error);
    else {
      toast.success("Blog Created");
      navigate(HOME_PAGE_URL);
    }
  };

  return (
    <div className="pt-28 w-[80vw] mx-auto text-customColor1">
      <h1 className="text-4xl font-bold mx-auto my-3">Create Blog</h1>
      <BlogInputForm onSubmit={handelFormSubmit} />
    </div>
  );
};

export default CreateBlogPage;
