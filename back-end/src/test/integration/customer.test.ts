import { StatusCodes } from 'http-status-codes';
import { Customer, PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import requester from './utilities/requester';

import {
  CustomerCreate,
  generateMockCustomers,
  totalCustomersByCity,
} from '../shared/customer';

const prisma = new PrismaClient();

describe('Test Customer Routes', () => {
  const createCustomers = (customers: CustomerCreate[]) => (
    prisma.customer.createMany({ data: customers })
  );

  beforeEach(async () => {
    await prisma.customer.deleteMany();
  });

  afterAll(() => requester.close());

  describe('Test GET /customer/total/by/city', () => {
    it('Should return total customers by city when populated', async () => {
      const mockedCustomers = generateMockCustomers(100);
      const expectedBody = totalCustomersByCity(mockedCustomers);

      await createCustomers(mockedCustomers);

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
    it('Should return customers filtered by city', async () => {
      const mockedCustomers = generateMockCustomers(100);
      const expectedBody = mockedCustomers.filter(
        ({ city }) => city === mockedCustomers[0].city,
      );

      await createCustomers(mockedCustomers);

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
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('Test GET /customer/:id', () => {
    it('Should return customer by valid id', async () => {
      const mockedCustomers = generateMockCustomers(100);

      await createCustomers(mockedCustomers);
      const dbCustomers = await prisma.customer.findMany();

      const response = await requester.get(`/customer/${dbCustomers[50].id}`);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toMatchObject(dbCustomers[50]);
    });

    it('Should return not found error in case of nonexistent id', async () => {
      const response = await requester.get('/customer/0');

      expect(response.status).toBe(StatusCodes.NOT_FOUND);
      expect(response.body).toHaveProperty('error');
    });

    it('Should return bad request error in case of invalid id', async () => {
      const mockWord = faker.random.word();

      const response = await requester.get(`/customer/${mockWord}`);

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body).toHaveProperty('error');
    });
  });
});
