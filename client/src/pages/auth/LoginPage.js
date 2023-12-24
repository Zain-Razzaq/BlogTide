import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import FormInput from "../../lib/FormInput";
import { HOME_PAGE_URL, SIGNUP_URL } from "../../routes";
import { Button1 } from "../../lib/SubmitButtons";
import { useUserLoginMutation } from "../../store/api/authApi";

const LoginPage = () => {
  const [loginUser, { isLoading }] = useUserLoginMutation();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    isLoading ? toast.loading("Loading") : toast.dismiss();
  }, [isLoading]);

  const handleFormSubmit = async (userData) => {
    const res = await loginUser(userData);
    if (res.error) {
      toast.error(res.error);
      reset();
    } else {
      toast.success("Login Successful");
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      navigate(HOME_PAGE_URL);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="border-2 border-customColor1 rounded-lg text-customColor1 px-5 py-14 mt-20 w-96 flex flex-col items-center">
        <div className="font-bold my-2 text-2xl font-orbitron cursor-pointer">
          BlogTide
        </div>
        <h2 className="text-2xl">Sign in</h2>
        <p className="m-3">Use your Google Account</p>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col mt-5 w-full"
        >
          <FormInput
            inputProp={{
              ...register("email", {
                required: true,
                pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              }),
            }}
            placeholder={"Email"}
            error={errors.email}
          />
          <FormInput
            inputProp={{
              ...register("password", {
                required: true,
                pattern: /^((?!.*[\s])(?=.*[A-Z])(?=.*\d).{8,15})/,
              }),
            }}
            placeholder={"Password"}
            error={errors.password}
          />
          <span className=" text-blue-700 font-bold text-sm cursor-pointer">
            Forgot Password?
          </span>
          <div className="flex justify-between items-center mt-10">
            <span
              onClick={() => navigate(SIGNUP_URL)}
              className=" text-blue-500 font-semibold text-sm cursor-pointer"
            >
              Create Account
            </span>
            <Button1 buttonContent={`Login`} disabled={isLoading} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
