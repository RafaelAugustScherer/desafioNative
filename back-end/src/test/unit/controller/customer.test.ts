import { Request } from 'express';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { StatusCodes } from 'http-status-codes';
import { Customer } from '@prisma/client';
import { faker } from '@faker-js/faker';
import CustomerController from '../../../app/controller/customer';
import CustomerService from '../../../app/service/customer';
import { MockContext, createMockContext } from '../../shared/prisma/context';
import {
  generateMockCustomer,
  generateMockCustomers,
  totalCustomersByCity,
} from '../../shared/customer';
import { generateApplicationError } from '../../shared/error';

describe('Test Customer Controller', () => {
  let req: Request;
  const { res, next, mockClear } = getMockRes();
  let ctx: MockContext;

  beforeEach(() => {
    mockClear();
    req = getMockReq();
    ctx = createMockContext();
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
      expect(res.json).toHaveBeenCalledWith([]);
    });
  });

  describe('Test readById', () => {
    const mockRequest = () => {
      const mockedCustomer = generateMockCustomer({ withId: true }) as Customer;
      req.params = { id: String(mockedCustomer.id) };

      return mockedCustomer;
    };

    it('Should respond with correct values when customer is found', async () => {
      const mockedCustomer = mockRequest();

      jest.spyOn(CustomerService, 'readById').mockResolvedValue(mockedCustomer);

      await CustomerController.readById(req, res, next, ctx);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenLastCalledWith(mockedCustomer);
    });

    it('should throw exception when service throws an error', async () => {
      const applicationError = generateApplicationError();
      mockRequest();

      jest.spyOn(CustomerService, 'readById')
        .mockRejectedValue(applicationError);

      try {
        const response = await CustomerController.readById(req, res, next, ctx);
        expect(response).toBeUndefined();
      } catch (e) {
        expect(e).toBe(applicationError);
      }
    });
  });

  describe('Test updateById', () => {
    const mockRequest = () => {
      const mockedCustomer = generateMockCustomer({ withId: true }) as Customer;
      req.params = { id: String(mockedCustomer.id) };
      req.body = { last_name: mockedCustomer.last_name };

      return mockedCustomer;
    };

    it('Should respond with correct values when customer is updated', async () => {
      const mockedCustomer = mockRequest();

      jest.spyOn(CustomerService, 'updateById')
        .mockResolvedValue(mockedCustomer);

      await CustomerController.updateById(req, res, next, ctx);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith(mockedCustomer);
    });

    it('should throw exception when service throws an error', async () => {
      const applicationError = generateApplicationError();
      mockRequest();

      jest.spyOn(CustomerService, 'updateById')
        .mockRejectedValue(applicationError);

      try {
        const response = await CustomerController.updateById(req, res, next, ctx);
        expect(response).toBeUndefined();
      } catch (e) {
        expect(e).toBe(applicationError);
      }
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
      expect(res.json).toHaveBeenCalledWith([]);
    });
  });
});
