import express from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { verifyToken } from "../../verifyToken.js";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/", verifyToken, async (req, res) => {
  if (req.query.tag) {
    const data = await prisma.share.findMany({
      orderBy: {
        hit: "desc",
      },
      where: {
        hashtag: {
          contains: req.query.tag,
        },
      },
    });
    res.status(200).json({ data });
  } else if (req.query.id) {
    const data = await prisma.share.findFirst({
      where: { id: Number(req.query.id) },
    });
    res.status(200).json({ data });
  } else {
    const share = await prisma.share.findMany({
      orderBy: {
        hit: "desc",
      },
    });
    res.status(200).json(share);
  }
});

router.post("/like", verifyToken, async (req, res) => {
  const { id } = req.body;
  const data = await prisma.share.update({
    where: { id },
    data: {
      like: {
        increment: 1,
      },
    },
  });
  res.status(200).json(data);
});

router.post("/hit", verifyToken, async (req, res) => {
  const { id } = req.body;
  const data = await prisma.share.update({
    where: { id },
    data: {
      hit: {
        increment: 1,
      },
    },
  });
  res.status(200).json(data);
});

router.post("/update", verifyToken, async (req, res) => {
  try {
    const { id, title, description, image, hashtag } = req.body;
    let data = {
      title,
      description,
      image,
      hashtag,
    };
    console.log(data);
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
        id: id,
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
    const { id } = req.body;
    const share = await prisma.share.delete({
      where: {
        id: id,
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
        message: "share를 삭제할 수 없습니다.",
      });
    }
    return res.status(500).json({
      code: 500,
      message: "Error",
    });
  }
});

router.get("/tags", async (req, res) => {
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
  res.status(200).json(tagList);
});

export default router;
