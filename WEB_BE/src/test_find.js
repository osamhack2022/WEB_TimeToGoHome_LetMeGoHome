import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const todo = await prisma.todolist.findMany({
  where: {
    userId: 1n,
  },
});

console.log(todo[0]);
