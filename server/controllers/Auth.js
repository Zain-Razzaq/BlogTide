import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import { addUser, findUser } from "../database/usersData.js";
dotenv.config();

// Register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user exists
    const oldUser = await findUser(email);
    if (oldUser)
      return res.status(409).send({ message: "User already exists" });

    // Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);
    // Create new user
    const user = {
      name,
      email,
      hashedPassword: encryptedPassword,
    };

    // Save user in the database
    await addUser(user);

    // Create token
    const JWTToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("userToken", JWTToken, {
      httpOnly: true,
      maxAge: 3600000,
    });

    res.status(200).send({
      userId: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.role === "admin",
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if the user exists
    let user = await findUser(email);

    if (!user) return res.status(404).send({ message: "User doesn't exist" });

    // Validate password
    if (!(await bcrypt.compare(password, user.hashedPassword)))
      return res.status(400).send({ message: "Invalid credentials" });

    // Create token
    const JWTToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("userToken", JWTToken, {
      httpOnly: true,
      maxAge: 3600000,
    });
    res.status(200).json({
      userId: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.role === "admin",
    });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

// logout
export const logout = (req, res) => {
  try {
    res.cookie("userToken", "", { maxAge: 1 });
    res.status(200).send({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
