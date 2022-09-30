import { StatusCodes } from 'http-status-codes';
import { Customer, PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import requester from './utilities/requester';

import {
  generateMockCustomers,
  totalCustomersByCity,
} from '../shared/customer';

const prisma = new PrismaClient();

describe('Test Customer Routes', () => {
  beforeAll(async () => {
    await prisma.customer.deleteMany();
  });

  beforeEach(async () => {
    await prisma.customer.deleteMany();
  });

  afterAll(() => requester.close());

  describe('Test GET /customer/total/by/city', () => {
    afterEach(async () => {
      await prisma.customer.deleteMany();
    });

    it('Should return total customers by city when populated', async () => {
      const mockedCustomers = generateMockCustomers(100);
      const expectedBody = totalCustomersByCity(mockedCustomers);

      await prisma.customer.createMany({ data: mockedCustomers });

      const response = await requester.get('/customer/total/by/city');

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual(expectedBody);
    });

    it('Should return empty array when not populated', async () => {
      const response = await requester.get('/customer/total/by/city');

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual([]);
    });
  });

  describe('Test GET /customer', () => {
    afterEach(async () => {
      await prisma.customer.deleteMany();
    });

    it('Should return customers filtered by city', async () => {
      const mockedCustomers = generateMockCustomers(100);
      const expectedBody = mockedCustomers.filter(
        ({ city }) => city === mockedCustomers[0].city,
      );

      await prisma.customer.createMany({ data: mockedCustomers });

      const response = await requester.get(`/customer/?city=${mockedCustomers[0].city}`);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toBeInstanceOf(Array);
      const expectPromises = response.body.map((customer: Customer, idx: number) => (
        expect(customer).toEqual(expect.objectContaining(expectedBody[idx]))
      ));

      await Promise.all(expectPromises);
    });

    it('Should return error when filter is not valid', async () => {
      const response = await requester.get(`/customer/?first_name=${faker.name.firstName()}`);

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body).toMatchObject({
        error: expect.any(String),
      });
    });
  });
});
