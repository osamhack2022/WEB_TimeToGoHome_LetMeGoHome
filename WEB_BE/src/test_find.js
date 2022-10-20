import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const user = await prisma.user.findUnique({
  where: {
    email: "kim.af@naver.com",
  },
});
console.log(user);

const todo = await prisma.todo.findUnique({
  where: {
    id: 1,
  },
});
console.log(todo);

const task = await prisma.task.findMany({
  where: {
    todoId: 1,
  },
});
console.log(task);
