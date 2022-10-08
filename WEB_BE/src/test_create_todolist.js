import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const user = await prisma.user.update({
  where: { id: 1n },
  data: {
    todolists: {
      create: {
        goal: "90kg 찌우기",
        duration: 60,
        end_date: new Date("2040-12-12"),
      },
    },
  },
});

console.log(user);
