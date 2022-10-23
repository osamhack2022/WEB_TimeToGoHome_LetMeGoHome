import express from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { verifyToken } from "../../verifyToken.js";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  const shareId = Number(req.query.id);
  const { tag } = req.query;
  if (tag) {
    const share = await prisma.share.findMany({
      orderBy: {
        hit: "desc",
      },
      where: {
        hashtag: {
          contains: tag,
        },
      },
    });
    return res.status(200).json({ code: 200, payload: share });
  } else if (shareId) {
    const data = await prisma.share.findFirst({
      where: { id: shareId },
    });
    return res.status(200).json({ code: 200, payload: data });
  } else {
    const share = await prisma.share.findMany({
      orderBy: {
        hit: "desc",
      },
    });
    return res.status(200).json({ code: 200, payload: share });
  }
});

router.post("/update", verifyToken, async (req, res) => {
  try {
    const { id: shareId, title, description, image, hashtag } = req.body;
    let data = {
      title,
      description,
      image,
      hashtag,
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
    const share = await prisma.share.update({
      where: {
        id: shareId,
      },
      data,
    });
    return res.status(200).json({
      code: 200,
      payload: share,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientValidationError) {
      return res.status(400).json({
        code: 400,
        message: "share를 수정할 수 없습니다.",
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
    const { id: shareId } = req.body;
    const share = await prisma.share.delete({
      where: {
        id: shareId,
      },
    });
    return res.status(200).json({
      code: 200,
      payload: share,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientValidationError) {
      return res.status(400).json({
        code: 400,
        message: "Share를 삭제할 수 없습니다.",
      });
    }
    return res.status(500).json({
      code: 500,
      message: "Error",
    });
  }
});

router.get("/tags", verifyToken, async (req, res) => {
  try {
    const tags = await prisma.share.findMany({
      select: {
        hashtag: true,
      },
    });
    let tagList = [];
    tags.forEach((tag) => {
      tagList = tagList.concat(tag.hashtag.split(" ")); //띄어쓰기로 구분된 태그들을 배열로 만들어줌
    });
    tagList = [...new Set(tagList)];
    return res.status(200).json({ code: 200, payload: tagList });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: "Error",
    });
  }
});

export default router;
