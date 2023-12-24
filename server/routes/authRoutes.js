import { login, register, logout } from "../controllers/Auth.js";

import express from "express";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export default router;
