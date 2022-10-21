import express from "express";
const router = express.Router();
import auth from "./auth/auth.js";
import user from "./user/user.js";

router.use("/auth", auth);

router.use("/user", user);

export default router;
