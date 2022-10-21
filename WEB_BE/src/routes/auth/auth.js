import express from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const router = express.Router();

router.post("/login", async (req, res) => {
  const data = await prisma.user.findFirst({
    // email 찾기
    where: { email: req.body.email },
  });
  if (!data || data.status === "DELETED") {
    // 만약 존재하지 않거나 DELETED 상태면 error
    res.status(400).json({ message: "invalid email" });
  }
  // 존재하면 비밀번호 확인

  const result = await bcrypt.compare(req.body.password, data.password);
  if (!result) {
    // 비밀번호가 틀리면 error
    res.status(400).json({ message: "invalid password" });
  }
  const token = jwt.sign(
    {
      id: data.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
  // 비밀번호가 맞으면 로그인 및 토큰 발급
  res.status(200).json({
    token,
    message: "login success",
  });
});

router.post("/register", async (req, res) => {
  //password 암호화
  const salt = 10;
  const enpassword = await bcrypt.hash(req.body.password, salt);

  try {
    const data = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
        password: enpassword,
        armyType: req.body.armyType,
        armyRank: req.body.armyRank,
        enlistment: new Date(req.body.enlistment),
        discharge: new Date(req.body.discharge),
        image: "https://i.imgur.com/3ZQ3Z0x.png", // sample image
      },
    });
    res.status(200).json({ data });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      if (error.code === "P2002") {
        const email = await prisma.user.findFirst({
          // email 찾기
          where: { email: req.body.email },
        });

        if (!email || email.status === "DELETED") {
          // 만약 존재하지 않거나 DELETED 상태면 패스
          res.status(400).json({ message: "중복되는 ID 입니다." });
        } else {
          res.status(400).json({ message: "중복되는 email 입니다." });
        }
      } else if (error.code === "P2000") {
        res.status(400).json({ message: "너무 긴 입력 값이 있습니다." });
      }
    }
  }
});

//token 검증
router.get("/check", async (req, res) => {
  const token = req.headers["x-access-token"] || req.query.token;
  if (!token) {
    return res.status(403).json({
      success: false,
      message: "not logged in",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded) {
      const data = await prisma.user.findFirst({
        where: { id: decoded.id },
      });
      if (!data || data.status === "DELETED") {
        return res.status(403).json({
          success: false,
          message: "not logged in",
        });
      }
      return res.status(200).json({
        success: true,
        info: data,
      });
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      // 유효기간 초과
      return res.status(419).json({
        success: false,
        message: "token expired",
      });
    }
    return res.status(401).json({
      success: false,
      message: "invalid token",
    });
  }
});

export default router;
