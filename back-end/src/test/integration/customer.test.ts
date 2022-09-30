import { StatusCodes } from 'http-status-codes';
import { PrismaClient } from '@prisma/client';
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
});
