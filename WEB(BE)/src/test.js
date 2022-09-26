import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const user = await prisma.categories.findMany({
  where: {
    name: "Alice",
  },
});

console.log(user);
