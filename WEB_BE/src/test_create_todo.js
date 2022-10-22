import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const todo = await prisma.todo.create({
  data: {
    userId: 1,
    goal: "큰고양이 키우기",
    duration: 5,
    start: new Date("2023-08-01"),
    end: new Date("2023-08-31"),
  },
});

console.log(todo);
