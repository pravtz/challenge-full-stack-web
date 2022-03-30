import { prisma, PrismaPromise } from "@prisma/client";

const transactions: PrismaPromise<any>[] = [];

const truncateTable = async (table: string) => {
  try {
    transactions.push(prisma.$executeRawUnsafe(`TRUNCATE ${table};`));
  } catch (error) {
    console.log({ error });
  }
  
  try {
    await prisma.$transaction(transactions);
  } catch (error) {
    console.log({ error });
  }
};
