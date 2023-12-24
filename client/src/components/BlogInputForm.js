import { useForm } from "react-hook-form";

import FormInput from "../lib/FormInput";
import { Button1 } from "../lib/SubmitButtons";

const BlogInputForm = ({
  onSubmit,
  isLoading,
  data: {
    title: editBlogTitle,
    content: editBlogContent,
    readTime: editBlogReadTime,
  } = {},
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <div className=" flex flex-wrap gap-2 w-full [&>*]:flex-1 [&>*]:min-w-max">
        <FormInput
          inputProp={{
            ...register("title", { required: "true", minLength: 5 }),
          }}
          value={editBlogTitle}
          placeholder={"Title"}
          error={errors.title}
        />
        <FormInput
          inputProp={{
            ...register("readTime", {
              required: "true",
              min: 1,
              pattern: /^[0-9]*$/,
            }),
          }}
          value={editBlogReadTime}
          placeholder={"Read Time"}
          error={errors.readTime}
        />
      </div>
      <div className="w-full flex">
        <textarea
          {...register("content", { required: true })}
          defaultValue={editBlogContent}
          placeholder="Write your blog here..."
          className=" flex-1 border-2 outline-none rounded-md h-[60vh] my-2 p-2 focus:border-customColor1"
        ></textarea>
      </div>
      <Button1 buttonContent={"Submit"} disabled={isLoading} />
    </form>
  );
};

export default BlogInputForm;
