import express from "express";
const router = express.Router();
import auth from "./auth/auth.js";

router.use("/auth", auth);

export default router;