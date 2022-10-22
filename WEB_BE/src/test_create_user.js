import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const user = await prisma.user.create({
  data: {
    name: "이승우",
    email: "Yee@gmail.com",
    password: "1234",
    enlistment: new Date("2021-08-01"),
    discharge: new Date("2023-08-31"),
    armyRank: "병장",
    armyType: "육군",
    image: "https://i.imgur.com/1Q9ZQYj.png",
  },
});

console.log(user);
