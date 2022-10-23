import express from "express";
const router = express.Router();
import auth from "./auth/auth.js";
import user from "./user/user.js";
import todoRouter from "./todo/todo.js";

router.use("/auth", auth);
router.use("/user", user);
router.use("/todo", todoRouter);
router.use("/share", share);

export default router;
