import express from "express";
const router = express.Router();
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const todoId = Number(req.query.id);
  try {
    const todo = await prisma.todo.findUnique({
      where: {
        id: todoId,
      },
    });
    if (!todo) {
      return res.status(404).json({
        code: 404,
        message: "해당 ToDoList를 찾을 수 없습니다.",
      });
    }
    return res.json({
      code: 200,
      payload: todo,
    });
  } catch (error) {
    console.error(error);
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
    if (todos.length === 0) {
      return res.status(404).json({
        code: 404,
        message: "해당 유저의 ToDoList를 찾을 수 없습니다.",
      });
    }
    return res.json({
      code: 200,
      payload: todos,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "Error",
    });
  }
});

router.post("/create", async (req, res) => {
  const { goal } = req.body;
  let start, end, duration;
  if (req.body.start && req.body.end) {
    start = new Date(req.body.start);
    end = new Date(req.body.end);
    const day = 1000 * 60 * 60 * 24;
    duration = new Date(
      (end.getTime() - start.getTime() + day) / (7 * day)
    ).getTime();
  } else if (req.body.start || req.body.end) {
    return res.status(400).json({
      code: 400,
      message: "start와 end를 모두 포함하여 요청바랍니다.",
    });
  }
  try {
    const todo = await prisma.todo.create({
      data: {
        userId: 1, // TODO: 인증 기능 추가되면 수정할 것!
        goal,
        duration,
        start,
        end,
      },
    });
    if (!todo) {
      return res.status(202).json({
        code: 202,
        message: "ToDoList를 생성할 수 없습니다.",
      });
    }
    return res.json({
      code: 201,
      payload: todo,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "Error",
    });
  }
});

router.post("/update", async (req, res) => {
  const { id: todoId, goal, is_done, is_share } = req.body;
  let start, end, duration;
  if (req.body.start && req.body.end) {
    start = new Date(req.body.start);
    end = new Date(req.body.end);
    const day = 1000 * 60 * 60 * 24;
    duration = new Date(
      (end.getTime() - start.getTime() + day) / (7 * day)
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
    is_done,
    is_share,
  };
  for (let key in data) {
    if (data[key] === undefined || data[key] === NaN) {
      delete data[key];
    }
  }
  try {
    const todo = await prisma.todo.update({
      where: {
        id: todoId,
      },
      data,
    });
    if (!todo) {
      return res.status(202).json({
        code: 202,
        message: "ToDoList를 수정할 수 없습니다.",
      });
    }
    return res.json({
      code: 200,
      payload: todo,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "Error",
    });
  }
});

router.post("/delete", async (req, res) => {
  const { id: todoId } = req.body;
  try {
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
    if (error.code === "P2025") {
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
