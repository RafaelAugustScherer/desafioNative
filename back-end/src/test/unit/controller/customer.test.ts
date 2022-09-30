import { getMockReq, getMockRes } from '@jest-mock/express';
import { StatusCodes } from 'http-status-codes';
import { Customer } from '@prisma/client';
import { faker } from '@faker-js/faker';
import CustomerController from '../../../app/controller/customer';
import CustomerService from '../../../app/service/customer';
import { MockContext, createMockContext } from '../../shared/prisma/context';
import {
  generateMockCustomers,
  totalCustomersByCity,
} from '../../shared/customer';

describe('Test Customer Controller', () => {
  const req = getMockReq();
  const { res, next, mockClear } = getMockRes();
  let ctx: MockContext;

  beforeEach(() => {
    ctx = createMockContext();
    mockClear();
  });

  describe('Test readAllByFilter', () => {
    it('Should respond with correct values when customers are found', async () => {
      const mockedCustomers = generateMockCustomers(100, { withId: true }) as Customer[];
      const mockedCustomersInCity = mockedCustomers.filter(
        (customer) => customer.city === mockedCustomers[0].city,
      );
      req.query = { city: mockedCustomers[0].city };

      jest.spyOn(CustomerService, 'readAllByFilter')
        .mockResolvedValue(mockedCustomersInCity);

      await CustomerController.readAllByFilter(req, res, next, ctx);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith(
        expect.arrayContaining(mockedCustomersInCity),
      );
    });

    it('Should respond with correct values when there are no customers', async () => {
      req.query = { city: faker.address.cityName() };

      jest.spyOn(CustomerService, 'readAllByFilter').mockResolvedValue([]);

      await CustomerController.readAllByFilter(req, res, next, ctx);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith(
        expect.arrayContaining([]),
      );
    });
  });

  describe('Test readTotalCustomersByCity', () => {
    it('Should respond with correct values when customers are found', async () => {
      const mockedCustomersByCity = totalCustomersByCity(
        generateMockCustomers(100, { withId: true }),
      );

      jest.spyOn(CustomerService, 'readTotalCustomersByCity')
        .mockResolvedValue(mockedCustomersByCity);

      await CustomerController.readTotalCustomersByCity(req, res, next, ctx);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith(
        expect.arrayContaining(mockedCustomersByCity),
      );
    });

    it('Should respond with correct values when there are no customers', async () => {
      jest.spyOn(CustomerService, 'readTotalCustomersByCity').mockResolvedValue([]);

      await CustomerController.readTotalCustomersByCity(req, res, next, ctx);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith(
        expect.arrayContaining([]),
      );
    });
  });
});
