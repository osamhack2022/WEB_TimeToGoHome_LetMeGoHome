import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const todo = await prisma.user.findFirst({
  where: {
    email: "whyrano@letmegohome.com",
  },
});

console.log(todo);
