import prismaMock from '../../shared/prisma/singleton';
import CustomerService from '../../../app/service/customer';
import {
  generateMockCustomers,
  totalCustomersByCity,
} from '../../shared/customer';

describe('Test Customer Service', () => {
  describe('Test readTotalCustomersByCity', () => {
    it('Should return total customers by city', async () => {
      const mockedCustomers = generateMockCustomers(100);
      const expectedResult = totalCustomersByCity(mockedCustomers);

      prismaMock.customer.findMany.mockResolvedValue(mockedCustomers);

      const response = await CustomerService.readTotalCustomersByCity();
      expect(response).toEqual(expectedResult);
    });

    it('Should return empty array in case of no customers', async () => {
      prismaMock.customer.findMany.mockResolvedValue([]);

      const response = await CustomerService.readTotalCustomersByCity();
      expect(response).toEqual([]);
    });
  });
});
