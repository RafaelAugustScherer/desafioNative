import { PrismaClient, Customer, User } from '@prisma/client';
import fs from 'fs';

const prisma = new PrismaClient();

const seedCustomers = async () => {
  const customersBuffer = fs.readFileSync(`${__dirname}/seed/customers.json`);
  const customers: Customer[] = JSON.parse(customersBuffer.toString());

  await prisma.customer.deleteMany();
  await prisma.customer.createMany({ data: customers });
};

const seedUsers = async () => {
  const usersBuffer = fs.readFileSync(`${__dirname}/seed/users.json`);
  const users: User[] = JSON.parse(usersBuffer.toString());

  await prisma.user.deleteMany();
  await prisma.user.createMany({ data: users });
};

const main = async () => {
  await seedCustomers();
  await seedUsers();
};

main();
