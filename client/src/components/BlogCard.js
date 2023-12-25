import { useNavigate, generatePath } from "react-router-dom";

import { Button1 } from "../lib/SubmitButtons";
import { BLOG_PAGE_URL } from "../routes";

const BlogCard = ({ id, title, content, author, readTime }) => {
  const navigate = useNavigate();

  return (
    <div className="text-customColor1 lg:mx-10 my-10 lg:my-20">
      <div className="h-[150px] flex items-center  relative">
        <span className="text-[10rem] lg:text-[14rem] opacity-40 leading-[8rem] absolute top-0 -left-5 lg:-left-16">
          {title && title[0]}
        </span>
        <h2 className=" text-2xl md:text-3xl lg:text-5xl  font-lora font-semibold line-clamp-3">
          {title}
        </h2>
      </div>
      <p className="text-md  font-lora">
        By {author.name} • {readTime} Min read
      </p>
      <p className="mt-3 text-lg font-serif line-clamp-5">{content}</p>
      <div
        className="mt-2"
        onClick={() => navigate(generatePath(BLOG_PAGE_URL, { blogId: id }))}
      >
        <Button1 buttonContent="Read More →" />
      </div>
    </div>
  );
};

export default BlogCard;
