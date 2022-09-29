import { PrismaClient, Customer } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

const main = async () => {
  const customersBuffer = fs.readFileSync(`${__dirname}/seed/customers.json`);
  const customers: Customer[] = JSON.parse(customersBuffer.toString());

  await prisma.customer.deleteMany();
  await prisma.customer.createMany({ data: customers });
};

main();
