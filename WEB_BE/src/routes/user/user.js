import express from "express";
import bcrypt from "bcrypt";
import { Prisma, PrismaClient } from "@prisma/client";
import { verifyToken } from "../../middleware/verifyToken.js";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/me", verifyToken, async (req, res) => {
  const userId = req.decoded.id;
  const data = await prisma.user.findFirst({
    where: { id: userId },
  });
  return res.status(200).json({ code: 200, payload: data });
});

// 유저 정보 수정
router.post("/update", verifyToken, async (req, res) => {
  try {
    const { name, email, password, image } = req.body;
    let data = {
      name,
      email,
      password,
      image,
    };
    for (let key in data) {
      if (data[key] === undefined || data[key] === NaN) {
        delete data[key];
      } else if (key === "password") {
        data[key] = await bcrypt.hash(data[key], 10);
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
        id: userId,
      },
      data,
    });
    delete user["password"];
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

router.get("/delete", verifyToken, async (req, res) => {
  try {
    const userId = req.decoded.id;
    const user = await prisma.task.delete({
      where: {
        id: userId,
      },
    });
    delete user["password"];
    return res.status(200).json({
      code: 200,
      payload: user,
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
router.get("/:id", verifyToken, async (req, res) => {
  const userId = Number(req.params.id);
  const data = await prisma.user.findUnique({
    where: { id: userId },
  });
  // 유저가 없을 경우
  if (!data || data.status === "DELETED") {
    // 만약 존재하지 않거나 DELETED 상태면 error
    return res.status(400).json({ code: 400, message: "invalid email" });
  }
  delete data["email"];
  delete data["password"];
  return res.status(200).json({ code: 200, payload: data });
});

export default router;
