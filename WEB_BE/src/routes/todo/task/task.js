import express from "express";
const router = express.Router();
import { Prisma, PrismaClient } from "@prisma/client";
import { verifyToken } from "../../../middleware/verifyToken.js";
const prisma = new PrismaClient();

const DAY = 1000 * 60 * 60 * 24;

router.get("/", verifyToken, async (req, res) => {
  try {
    const { date } = req.query;
    const todoId = Number(req.query.todoId);
    const tasks = await prisma.task.findMany({
      where: {
        todoId,
        datetime: {
          gte: new Date(date),
          lte: new Date(new Date(date).getTime() + DAY - 1),
        },
      },
    });
    return res.json({
      code: 200,
      payload: tasks,
    });
  } catch (error) {
    console.error(error);
    if (error.name === "RangeError" && error.message === "Invalid time value") {
      return res.status(400).json({
        code: 400,
        message: "올바르지 않은 date입니다.",
      });
    }
    if (error instanceof Prisma.PrismaClientValidationError) {
      return res.status(404).json({
        code: 404,
        message: "해당 TodoList의 Task를 찾을 수 없습니다.",
      });
    }
    return res.status(500).json({
      code: 500,
      message: "Error",
    });
  }
});

router.post("/create", verifyToken, async (req, res) => {
  try {
    const { todoId, content, datetime } = req.body;
    const task = await prisma.task.create({
      data: {
        todoId,
        content,
        datetime: new Date(datetime),
      },
    });
    return res.json({
      code: 201,
      payload: task,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return res.status(400).json({
        code: 400,
        message: "올바르지 않은 입력입니다.",
      });
    }
    if (error instanceof Prisma.PrismaClientValidationError) {
      return res.status(400).json({
        code: 400,
        message: "Task를 생성할 수 없습니다.",
      });
    }
    return res.status(500).json({
      code: 500,
      message: "Error",
    });
  }
});

router.post("/update", verifyToken, async (req, res) => {
  try {
    const { id: taskId, content, isDone } = req.body;
    let datetime;
    if (req.body.datetime) {
      datetime = new Date(req.body.datetime);
    }
    let data = {
      content,
      datetime,
      isDone,
    };
    for (let key in data) {
      if (data[key] === undefined || data[key] === NaN) {
        delete data[key];
      }
    }
    if (Object.keys(data).length === 0) {
      return res.status(400).json({
        code: 400,
        message: "수정할 내용이 없습니다.",
      });
    }
    const task = await prisma.task.update({
      where: {
        id: taskId,
      },
      data,
    });
    return res.status(200).json({
      code: 200,
      payload: task,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientValidationError) {
      return res.status(400).json({
        code: 400,
        message: "Task를 수정할 수 없습니다.",
      });
    }
    return res.status(500).json({
      code: 500,
      message: "Error",
    });
  }
});

router.post("/delete", verifyToken, async (req, res) => {
  try {
    const { id: taskId } = req.body;
    const task = await prisma.task.delete({
      where: {
        id: taskId,
      },
    });
    return res.json({
      code: 200,
      payload: task,
    });
  } catch (error) {
    console.error(error);
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return res.status(404).json({
        code: 404,
        message: "해당 Task를 찾을 수 없습니다.",
      });
    }
    return res.status(500).json({
      code: 500,
      message: "Error",
    });
  }
});

export default router;
