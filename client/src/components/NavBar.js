import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import profileImage from "../assets/images/user.png";
import { logoutSvg } from "../assets/svg";
import { ROOT_URL, HOME_PAGE_URL } from "../routes";
import { useLogoutCurrentUserMutation } from "../store/api/authApi";
import MenuListItem from "../lib/MenuListItem";

const NavBar = () => {
  const [logoutCurrentUser, { isLoading }] = useLogoutCurrentUserMutation();
  const navigate = useNavigate();

  let currentUserData = localStorage.getItem("userInfo");
  if (currentUserData) currentUserData = JSON.parse(currentUserData);

  useEffect(() => {
    isLoading ? toast.loading("Loading") : toast.dismiss();
  }, [isLoading]);

  const handleLogout = async () => {
    const res = await logoutCurrentUser();
    if (res.error) toast.error(res.error);
    else {
      toast.success("Successfuly Loged OUT");
      localStorage.removeItem("userInfo");
      navigate(ROOT_URL);
    }
  };

  return (
    <nav className="h-20 z-30 w-screen flex justify-between items-center px-7 bg-customColor3 fixed">
      <div
        className="font-bold text-customColor1 text-2xl font-orbitron cursor-pointer"
        onClick={() => navigate(HOME_PAGE_URL)}
      >
        BlogTide
      </div>
      <div className="flex items-center">
        <div className="m-2 text-right">
          <p className="text-base text-customColor1 font-medium ">
            {currentUserData?.name}
          </p>
          <p className=" text-sm text-neutral-500 ">{currentUserData?.email}</p>
        </div>
        <div className=" flex flex-col justify-end relative group">
          <img className="w-10 h-10 image1" src={profileImage} alt="Profile" />
          {currentUserData && (
            <div className="invisible bg-customColor2 text-customColor1 p-2 absolute top-10 right-0 divide-y divide-customColor1 group-hover:visible">
              <MenuListItem
                content={"Logout"}
                icon={logoutSvg()}
                eventHandler={handleLogout}
              />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
