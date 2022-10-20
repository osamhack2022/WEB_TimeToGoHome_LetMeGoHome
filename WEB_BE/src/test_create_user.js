import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const user = await prisma.User.create({
  data: {
    name: "김공군",
    email: "kim.af@naver.com",
    password: "test1234",
    image: "https://put_image_url.here",
    armyType: "공군",
    armyRank: "상병",
    enlistment: new Date("2022-01-10"),
    discharge: new Date("2023-10-09"),
  },
});

console.log(user);
