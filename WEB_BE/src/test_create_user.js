import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const user = await prisma.User.create({
  data: {
    name: "David",
    email: "David@prisma.io",
    password: "5678",
    army_type: "육군",
    army_rank: "일병",
    enlistment_date: new Date("2022-10-07"),
    discharge_date: new Date("2024-05-21"),
  },
});

console.log(user);
