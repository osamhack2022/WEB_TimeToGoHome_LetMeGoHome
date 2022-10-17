import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const todo = await prisma.user.findMany({
  where: {
    id: 1n,
  },
});

console.log(todo[0]);
