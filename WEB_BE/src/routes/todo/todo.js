import express from "express";
const router = express.Router();
import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import taskRouter from "./task/task.js";

const DAY = 1000 * 60 * 60 * 24;

router.use("/task", taskRouter);

router.get("/", async (req, res) => {
  try {
    const { id: todoId } = req.query;
    const todo = await prisma.todo.findUnique({
      where: {
        id: todoId,
      },
    });
    return res.json({
      code: 200,
      payload: todo,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientValidationError) {
      return res.status(404).json({
        code: 404,
        message: "해당 ToDoList를 찾을 수 없습니다.",
      });
    }
    return res.status(500).json({
      code: 500,
      message: "Error",
    });
  }
});

router.get("/me", async (req, res) => {
  try {
    const todos = await prisma.todo.findMany({
      where: {
        userId: 1, // TODO: 인증 기능 추가되면 수정할 것!
      },
    });
    return res.json({
      code: 200,
      payload: todos,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientValidationError) {
      return res.status(404).json({
        code: 404,
        message: "해당 유저의 ToDoList를 찾을 수 없습니다.",
      });
    }
    return res.status(500).json({
      code: 500,
      message: "Error",
    });
  }
});

router.post("/create", async (req, res) => {
  try {
    const { goal } = req.body;
    let start, end, duration;
    if (req.body.start && req.body.end) {
      start = new Date(req.body.start);
      end = new Date(req.body.end);
      duration = new Date(
        (end.getTime() - start.getTime() + DAY) / (7 * DAY)
      ).getTime();
    } else if (req.body.start || req.body.end) {
      return res.status(400).json({
        code: 400,
        message: "start와 end를 모두 포함하여 요청바랍니다.",
      });
    }
    const todo = await prisma.todo.create({
      data: {
        userId: 1, // TODO: 인증 기능 추가되면 수정할 것!
        goal,
        duration,
        start,
        end,
      },
    });
    return res.json({
      code: 201,
      payload: todo,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientValidationError) {
      return res.status(400).json({
        code: 400,
        message: "ToDoList를 생성할 수 없습니다.",
      });
    }
    return res.status(500).json({
      code: 500,
      message: "Error",
    });
  }
});

router.post("/update", async (req, res) => {
  try {
    const { id: todoId, goal, isDone, isShared } = req.body;
    let start, end, duration;
    if (req.body.start && req.body.end) {
      start = new Date(req.body.start);
      end = new Date(req.body.end);
      duration = new Date(
        (end.getTime() - start.getTime() + DAY) / (7 * DAY)
      ).getTime();
    } else if (req.body.start || req.body.end) {
      return res.status(400).json({
        code: 400,
        message: "start와 end를 모두 포함하여 요청바랍니다.",
      });
    }
    let data = {
      goal,
      duration,
      start,
      end,
      isDone,
      isShared,
    };
    for (let key in data) {
      if (data[key] === undefined || data[key] === NaN) {
        delete data[key];
      }
    }
    const todo = await prisma.todo.update({
      where: {
        id: todoId,
      },
      data,
    });
    return res.status(200).json({
      code: 200,
      payload: todo,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientValidationError) {
      return res.status(400).json({
        code: 400,
        message: "ToDoList를 수정할 수 없습니다.",
      });
    }
    return res.status(500).json({
      code: 500,
      message: "Error",
    });
  }
});

router.post("/delete", async (req, res) => {
  try {
    const { id: todoId } = req.body;
    const todo = await prisma.todo.delete({
      where: {
        id: todoId,
      },
    });
    return res.json({
      code: 200,
      payload: todo,
    });
  } catch (error) {
    console.error(error);
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2025"
    ) {
      return res.status(404).json({
        code: 404,
        message: "해당 ToDoList를 찾을 수 없습니다.",
      });
    }
    return res.status(500).json({
      code: 500,
      message: "Error",
    });
  }
});

export default router;
