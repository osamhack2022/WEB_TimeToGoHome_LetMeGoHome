import express from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import fs from "fs";
import downImage from "../../middleware/downImage.js";
import { uploadImage, imgTypes } from "../../controller/uploadImage.js";

const prisma = new PrismaClient();
const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const data = await prisma.user.findFirst({
    // email 찾기
    where: { email },
  });
  if (!data || data.status === "DELETED") {
    // 만약 존재하지 않거나 DELETED 상태면 error
    return res.status(400).json({
      code: 400,
      message: "이메일 혹은 비밀번호가 일치하지 않습니다.",
    });
  }
  // 존재하면 비밀번호 확인
  const result = await bcrypt.compare(password, data.password);
  if (!result) {
    // 비밀번호가 틀리면 error
    return res.status(400).json({
      code: 400,
      message: "이메일 혹은 비밀번호가 일치하지 않습니다.",
    });
  }
  const token = jwt.sign({ id: data.id }, process.env.JWT_SECRET, {
    expiresIn: "30m",
  });
  // 비밀번호가 맞으면 로그인 및 토큰 발급
  return res.status(200).json({
    code: 200,
    payload: { token },
    message: "로그인 되었습니다.",
  });
});

router.post("/register", downImage.single("profileImage"), async (req, res) => {
  let profileImageFile;
  try {
    const { name, email, armyType, armyRank, enlistment, discharge } = req.body;
    //password 암호화
    const salt = 10;
    const enpassword = await bcrypt.hashSync(req.body.password, salt);
    if (!req.file) {
      return res.status(500).json({
        code: 500,
        message: "프로필 이미지를 업로드할 수 없습니다.",
      });
    }
    profileImageFile = req.file;
    const profileImageUrl = await uploadImage(
      profileImageFile.path,
      imgTypes.PROFILE
    );
    const data = await prisma.user.create({
      data: {
        name,
        email,
        password: enpassword,
        armyType,
        armyRank,
        enlistment: new Date(enlistment),
        discharge: new Date(discharge),
        image: profileImageUrl,
      },
    });
    delete data["password"];
    return res
      .status(200)
      .json({ code: 200, payload: data, message: "회원가입되었습니다." });
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.error(error);
      if (error.code === "P2002") {
        const email = await prisma.user.findFirst({
          // email 찾기
          where: { email: req.body.email },
        });
        if (!email || email.status === "DELETED") {
          // 만약 존재하지 않거나 DELETED 상태면 패스
          return res
            .status(400)
            .json({ code: 400, message: "중복되는 ID 입니다." });
        } else {
          return res
            .status(400)
            .json({ code: 400, message: "중복되는 email 입니다." });
        }
      } else if (error.code === "P2000") {
        return res
          .status(400)
          .json({ code: 400, message: "너무 긴 입력 값이 있습니다." });
      }
    } else {
      return res.status(500).json({ code: 500, message: "Error" });
    }
  } finally {
    fs.unlink(profileImageFile.path, (error) => {
      if (error) {
        console.error(error);
      }
    });
  }
});

export default router;
