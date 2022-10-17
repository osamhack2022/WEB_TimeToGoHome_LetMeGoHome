import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const user = await prisma.User.create({
  data: {
    name: "Test",
    email: "Test@prisma.io",
    password: "12345678",
    army_type: "공군",
    army_rank: "일병",
    enlistment: new Date("2022-11-12"),
    discharge: new Date("2024-11-12"),
  },
});

console.log(user);
