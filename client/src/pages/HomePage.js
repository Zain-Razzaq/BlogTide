import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { useValidateUserQuery } from "../store/api/validationApi";
import BlogsContainer from "../components/BlogsContainer";
import { compassSvg, blogSvg, animatedSvg } from "../assets/svg";
import { CREATE_BLOG_URL, ROOT_URL } from "../routes";
import { Button2 } from "../lib/SubmitButtons";

const HomePage = () => {
  const { error } = useValidateUserQuery();
  const navigate = useNavigate();
  const [isExplore, setIsExplore] = useState(true);

  useEffect(() => {
    if (error) {
      toast.error(error);
      navigate(ROOT_URL);
    }
  }, [error, navigate]);

  return (
    <div className="flex">
      <div className="bg-customColor1 mt-20 h-[75vh] w-screen fixed z-10 flex flex-col justify-center items-center">
        <div className=" h-48 font-josefin relative flex items-end select-none">
          <div className="text-[18rem]  text-customColor2 opacity-40 -z-10 leading-[13rem] absolute top-0">
            Y
          </div>
          <div className="w-[935px]  z-10 text-6xl text-center  text-customColor2">
            Your gateway to
            <span>{animatedSvg("BLOGTIDE")}</span>
            <br />
            Explore, Learn, and Engage
          </div>
        </div>
        <div className="pt-5" onClick={() => navigate(CREATE_BLOG_URL)}>
          <Button2 buttonContent={"Start Writing Now"} />
        </div>
      </div>
      <div className=" bg-customColor2 w-screen mt-[95vh] z-20">
        <div className="-mt-36 mb-36 w-[80vw] mx-auto py-20 z-20 bg-customColor3">
          <div className="text-3xl mt-5 text-center text-customColor1 font-serif">
            <button
              className={`mx-8 transition-all border-b-4  ${
                isExplore ? " border-customColor1" : "border-customColor2"
              }`}
              onClick={() => setIsExplore(true)}
            >
              {compassSvg()}
              Explore
            </button>
            <button
              className={`mx-8 transition-all border-b-4  ${
                isExplore ? " border-customColor2" : "border-customColor1"
              }`}
              onClick={() => setIsExplore(false)}
            >
              {blogSvg()}
              My Blogs
            </button>
          </div>
          <BlogsContainer isExplore={isExplore} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
