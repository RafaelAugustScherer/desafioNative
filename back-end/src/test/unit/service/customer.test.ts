import { Customer } from '@prisma/client';
import CustomerService from '../../../app/service/customer';
import { MockContext, createMockContext } from '../../shared/prisma/context';
import {
  generateMockCustomers,
  totalCustomersByCity,
} from '../../shared/customer';

describe('Test Customer Service', () => {
  let ctx: MockContext;

  beforeEach(() => {
    ctx = createMockContext();
  });
  describe('Test readTotalCustomersByCity', () => {
    it('Should return total customers by city', async () => {
      const mockedCustomers = generateMockCustomers(100, { withId: true }) as Customer[];
      const expectedResult = totalCustomersByCity(mockedCustomers);

      ctx.prisma.customer.findMany.mockResolvedValue(mockedCustomers);

      const response = await CustomerService.readTotalCustomersByCity(ctx);
      expect(response).toEqual(expectedResult);
    });

    it('Should return empty array in case of no customers', async () => {
      ctx.prisma.customer.findMany.mockResolvedValue([]);

      const response = await CustomerService.readTotalCustomersByCity(ctx);
      expect(response).toEqual([]);
    });
  });
});
