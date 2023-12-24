import UserModel from "../models/Users.js";

const addUser = async ({ name, email, hashedPassword, role }) => {
  const user = await UserModel.create({
    name,
    email,
    hashedPassword,
    role,
  });
  return user;
};

const findUser = async (email) => {
  const user = await UserModel.findOne({ email });
  return user;
};

export { addUser, findUser };
