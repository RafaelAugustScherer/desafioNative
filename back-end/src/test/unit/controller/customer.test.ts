import { getMockReq, getMockRes } from '@jest-mock/express';
import { StatusCodes } from 'http-status-codes';
import CustomerController from '../../../app/controller/customer';
import CustomerService from '../../../app/service/customer';
import {
  generateMockCustomers,
  totalCustomersByCity,
} from '../../shared/customer';

describe('Test Customer Controller', () => {
  const req = getMockReq();
  const { res, next, mockClear } = getMockRes();

  describe('Test readTotalCustomersByCity', () => {
    afterEach(() => mockClear());

    it('Should respond with correct values when customers are found', async () => {
      const mockedCustomersByCity = totalCustomersByCity(generateMockCustomers(100));

      jest.spyOn(CustomerService, 'readTotalCustomersByCity')
        .mockResolvedValue(mockedCustomersByCity);

      await CustomerController.readTotalCustomersByCity(req, res, next);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith(
        expect.arrayContaining(mockedCustomersByCity),
      );
    });

    it('Should respond with correct values when there are no customers', async () => {
      jest.spyOn(CustomerService, 'readTotalCustomersByCity').mockResolvedValue([]);

      await CustomerController.readTotalCustomersByCity(req, res, next);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith(
        expect.arrayContaining([]),
      );
    });
  });
});
