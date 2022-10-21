import express from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { verifyToken } from "../../verifyToken.js";

const prisma = new PrismaClient();
const router = express.Router();

router.get("/me", verifyToken, async (req, res) => {
  const data = await prisma.user.findFirst({
    where: { id: req.decoded.id },
  });
  res.status(200).json({ data });
});

export default router;
