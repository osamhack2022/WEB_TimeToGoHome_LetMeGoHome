import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const testData = await prisma.user.findFirst({
  where: { id: 2n },
});

export const register = async (user) => {
  const dis_date = user.discharge_date.setMonth(discharge_date.getMonth() + 19);
  const data = await prisma.User.create({
    data: {
      name: user.name,
      email: user.email,
      password: user.password,
      army_type: user.army_type,
      army_rank: user.army_rank,
      enlistment_date: user.enlistment_date,
      discharge_date: dis_date,
    },
  });

  return data;
};

export const test = () => {
  return testData;
};

export const encryption = (user) => {
  const salt = 10;
  bcrypt.hash(user.password, salt, (err, encryptedPW) => {
    if (err) return err;
    user.password = encryptedPW;
    return;
  });
};
