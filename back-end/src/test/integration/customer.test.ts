import { StatusCodes } from 'http-status-codes';
import { Customer, PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';
import JWT from 'jsonwebtoken';
import requester from './utilities/requester';

import { generateMockUserLogin } from '../shared/user';
import {
  CustomerCreate,
  generateMockCustomers,
  totalCustomersByCity,
} from '../shared/customer';

const prisma = new PrismaClient();

describe('Test Customer Routes', () => {
  let token: string;

  const createCustomers = (customers: CustomerCreate[]) => (
    prisma.customer.createMany({ data: customers })
  );

  const generateToken = () => {
    const user = generateMockUserLogin();
    const { JWT_SECRET } = process.env;

    if (!JWT_SECRET) throw new Error('Please define JWT_SECRET Environment variable');

    return JWT.sign(user, JWT_SECRET);
  };

  beforeEach(async () => {
    await prisma.customer.deleteMany();
    token = generateToken();
  });

  afterAll(() => requester.close());

  describe('Test GET /customer/total/by/city', () => {
    it('Should return total customers by city when populated', async () => {
      const mockedCustomers = generateMockCustomers(100);
      const expectedBody = totalCustomersByCity(mockedCustomers);

      await createCustomers(mockedCustomers);

      const response = await requester
        .get('/customer/total/by/city')
        .set('Authorization', token);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toEqual(expectedBody);
    });

    it('Should return empty array when not populated', async () => {
      const response = await requester
        .get('/customer/total/by/city')
        .set('Authorization', token);

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

      const response = await requester
        .get(`/customer/?city=${mockedCustomers[0].city}`)
        .set('Authorization', token);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toBeInstanceOf(Array);
      const expectPromises = response.body.map((customer: Customer, idx: number) => (
        expect(customer).toEqual(expect.objectContaining(expectedBody[idx]))
      ));

      await Promise.all(expectPromises);
    });

    it('Should return error when filter is not valid', async () => {
      const response = await requester
        .get(`/customer/?first_name=${faker.name.firstName()}`)
        .set('Authorization', token);

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('Test GET /customer/:id', () => {
    it('Should return customer by valid id', async () => {
      const mockedCustomers = generateMockCustomers(100);

      await createCustomers(mockedCustomers);
      const dbCustomers = await prisma.customer.findMany();

      const response = await requester
        .get(`/customer/${dbCustomers[50].id}`)
        .set('Authorization', token);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toMatchObject(dbCustomers[50]);
    });

    it('Should return not found error in case of nonexistent id', async () => {
      const response = await requester
        .get('/customer/0')
        .set('Authorization', token);

      expect(response.status).toBe(StatusCodes.NOT_FOUND);
      expect(response.body).toHaveProperty('error');
    });

    it('Should return bad request error in case of invalid id', async () => {
      const mockWord = faker.random.word();

      const response = await requester
        .get(`/customer/${mockWord}`)
        .set('Authorization', token);

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('Test PATCH /customer/:id', () => {
    const mockedPayload = { last_name: faker.name.lastName() };

    beforeEach(async () => {
      const mockedCustomers = generateMockCustomers(100);
      await createCustomers(mockedCustomers);
    });

    it('Should update and return updated customer', async () => {
      const dbCustomers = await prisma.customer.findMany();

      const response = await requester
        .patch(`/customer/${dbCustomers[50].id}`)
        .set('Authorization', token)
        .send(mockedPayload);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toMatchObject(
        { ...dbCustomers[50], ...mockedPayload },
      );

      const updatedCustomer = await prisma.customer.findUnique(
        { where: { id: dbCustomers[50].id } },
      );
      expect(updatedCustomer).toBeDefined();
      expect(updatedCustomer?.last_name).toBe(mockedPayload.last_name);
    });

    it('Should return not found error in case of nonexistent id', async () => {
      const response = await requester
        .patch('/customer/0')
        .set('Authorization', token)
        .send(mockedPayload);

      expect(response.status).toBe(StatusCodes.NOT_FOUND);
      expect(response.body).toHaveProperty('error');
    });

    it('Should return bad request error in case of invalid id', async () => {
      const mockWord = faker.random.word();

      const response = await requester
        .patch(`/customer/${mockWord}`)
        .set('Authorization', token)
        .send(mockedPayload);

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body).toHaveProperty('error');
    });

    it('Should return bad request error in case of invalid body', async () => {
      const mockId = faker.random.numeric();
      const dbCustomers = await prisma.customer.findMany();

      const response = await requester
        .patch(`/customer/${dbCustomers[50].id}`)
        .set('Authorization', token)
        .send({ id: mockId });

      expect(response.status).toBe(StatusCodes.BAD_REQUEST);
      expect(response.body).toHaveProperty('error');
    });
  });
});
