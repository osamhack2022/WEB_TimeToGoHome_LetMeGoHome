import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const share = await prisma.share.create({
  data: {
    todoId: 6,
    writerId: 1,
    title: "테스트",
    description: "테스트",
    image: "https://i.imgur.com/1Q9ZQYj.png",
    hit: 1000,
    hashtag: "큰고양이 짱귀여워",
  },
});

console.log(share);
