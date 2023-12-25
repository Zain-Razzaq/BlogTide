import UserModel from "../models/Users.js";

export const addUser = async ({ name, email, hashedPassword, role }) => {
  const user = await UserModel.create({
    name,
    email,
    hashedPassword,
    role,
  });
  return user;
};

export const findUser = async (email) => {
  const user = await UserModel.findOne({ email });
  return user;
};
