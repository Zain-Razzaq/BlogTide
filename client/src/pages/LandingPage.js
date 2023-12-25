import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Button2 } from "../lib/SubmitButtons";
import { userSvg, addUserSvg , animatedSvg } from "../assets/svg";
import { HOME_PAGE_URL, LOGIN_URL, SIGNUP_URL } from "../routes";

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userInfo")) navigate(HOME_PAGE_URL);
  }, [navigate]);

  return (
    <div className="bg-customColor1 h-screen w-screen -z-10 flex flex-col justify-center items-center">
      <div className=" h-48 font-josefin relative flex items-end select-none">
          <div className="text-[18rem] text-customColor2 opacity-40 -z-10 leading-[13rem] absolute top-0">
            Y
          </div>
          <div className="w-96 md:w-[550px] lg:w-[935px] z-10 text-4xl md:text-5xl lg:text-6xl text-center  text-customColor2">
            Your gateway to
            <span>{animatedSvg("BLOGTIDE")}</span>
            
            Explore, Learn, and Engage
          </div>
        </div>
      <div className=" mt-10 flex items-center space-x-16">
        <div onClick={() => navigate(LOGIN_URL)}>
          <Button2
            buttonContent={
              <>
                {userSvg()}
                <span>Login</span>
              </>
            }
          />
        </div>
        <div onClick={() => navigate(SIGNUP_URL)}>
          <Button2
            buttonContent={
              <>
                {addUserSvg()}
                <span>Signup</span>
              </>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
