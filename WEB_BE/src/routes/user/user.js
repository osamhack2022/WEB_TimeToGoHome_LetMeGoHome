import express from "express";
import bcrypt from "bcrypt";
import { Prisma, PrismaClient } from "@prisma/client";
import { verifyToken } from "../../middleware/verifyToken.js";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/me", async (req, res) => {
  const token = req.headers["x-access-token"];
  const id = await verifyToken(token, res);
  const data = await prisma.user.findFirst({
    where: { id: id },
  });
  res.status(200).json({ data });
});

// 유저 정보 수정
router.post("/update", async (req, res) => {
  const token = req.headers["x-access-token"];
  const id = await verifyToken(token, res);
  try {
    const { name, email, password, image } = req.body;
    let data = {
      name,
      email,
      password,
      image,
    };
    console.log(data);
    for (let key in data) {
      if (data[key] === undefined || data[key] === NaN) {
        delete data[key];
      } else {
        if (key === "password") {
          data[key] = await bcrypt.hash(data[key], 10);
        }
      }
    }
    if (Object.keys(data).length === 0) {
      return res.status(400).json({
        code: 400,
        message: "수정할 내용이 없습니다.",
      });
    }
    const user = await prisma.user.update({
      where: {
        id: id,
      },
      data,
    });
    return res.status(200).json({
      code: 200,
      payload: user,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientValidationError) {
      return res.status(400).json({
        code: 400,
        message: "User를 수정할 수 없습니다.",
      });
    }
    return res.status(500).json({
      code: 500,
      message: "Error",
    });
  }
});

router.get("/delete", async (req, res) => {
  const token = req.headers["x-access-token"];
  const id = await verifyToken(token, res);
  try {
    const User = await prisma.task.delete({
      where: {
        id: id,
      },
    });
    return res.status(200).json({
      code: 200,
      payload: User,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientValidationError) {
      return res.status(400).json({
        code: 400,
        message: "User를 삭제할 수 없습니다.",
      });
    }
    return res.status(500).json({
      code: 500,
      message: "Error",
    });
  }
});

//유저 찾기
router.get("/:id", async (req, res) => {
  const data = await prisma.user.findUnique({
    where: { id: Number(req.params.id) },
  });
  // 유저가 없을 경우
  if (!data || data.status === "DELETED") {
    // 만약 존재하지 않거나 DELETED 상태면 error
    res.status(400).json({ message: "invalid email" });
  }
  res.status(200).json({ data });
});

export default router;
