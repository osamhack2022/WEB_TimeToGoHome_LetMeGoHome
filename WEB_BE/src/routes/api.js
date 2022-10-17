import express from "express";
const router = express.Router();
import todoRouter from "./todo/todo.js";

router.use("/todo", todoRouter);

router.get("/hello", (req, res) => {
  res.send("연결 완료");
  console.log("11");
});

router.post("/login", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

export default router;
