import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { useRegisterNewUserMutation } from "../../store/api/authApi";
import FormInput from "../../lib/FormInput";
import { HOME_PAGE_URL, LOGIN_URL } from "../../routes.js";
import { Button1 } from "../../lib/SubmitButtons";
import { useEffect } from "react";

const SignupPage = () => {
  const [registerNewUser, { isLoading }] = useRegisterNewUserMutation();
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
    const res = await registerNewUser(userData);
    if (res.error) {
      toast.error(res.error);
      reset();
    } else {
      toast.success("Successfuly Registered");
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      navigate(HOME_PAGE_URL);
    }
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <div className="border-2 border-customColor1 text-customColor1 rounded-lg px-5 py-14 mt-20 w-96 flex flex-col items-center">
        <div className="font-bold my-2 text-2xl font-orbitron cursor-pointer">
          BlogTide
        </div>
        <h2 className="text-2xl">Signup</h2>
        <p className="m-3">Create Your Account</p>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col mt-5 w-full"
        >
          <FormInput
            inputProp={{
              ...register("name", {
                required: true,
              }),
            }}
            placeholder={"Name"}
            error={errors.name}
          />
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
            textType="password"
            error={errors.password}
          />
          <div className="flex justify-between items-center mt-10">
            <span
              onClick={() => navigate(LOGIN_URL)}
              className=" text-blue-500 font-semibold text-sm cursor-pointer"
            >
              Already have an Account?
            </span>
            <Button1 buttonContent={"Create Account"} disabled={isLoading} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
