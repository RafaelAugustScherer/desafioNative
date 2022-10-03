import { Customer } from '@prisma/client';
import { faker } from '@faker-js/faker';
import CustomerService from '../../../app/service/customer';
import { MockContext, createMockContext } from '../../shared/prisma/context';
import {
  generateMockCustomer,
  generateMockCustomers,
  totalCustomersByCity,
} from '../../shared/customer';
import { ApplicationError } from '../../../app/helper/error';

describe('Test Customer Service', () => {
  let ctx: MockContext;

  beforeEach(() => {
    ctx = createMockContext();
  });

  describe('Test readAllByFilter', () => {
    it('Should return found customers', async () => {
      const mockedCustomers = generateMockCustomers(100, { withId: true }) as Customer[];
      const mockCity = faker.address.cityName();

      ctx.prisma.customer.findMany.mockResolvedValue(mockedCustomers);

      const response = await CustomerService.readAllByFilter({ city: mockCity }, ctx);
      expect(response).toEqual(mockedCustomers);
    });

    it('Should return empty array if no customers found', async () => {
      const mockCity = faker.address.cityName();

      ctx.prisma.customer.findMany.mockResolvedValue([]);

      const response = await CustomerService.readAllByFilter({ city: mockCity }, ctx);
      expect(response).toEqual([]);
    });

    it('Should return paginated customers', async () => {
      const mockedCustomers = generateMockCustomers(100, { withId: true }) as Customer[];
      const mockedCustomersPage = mockedCustomers.slice(20, 40);
      const offset = '20';
      const limit = '20';

      ctx.prisma.customer.findMany.mockResolvedValue(mockedCustomersPage);

      const response = await CustomerService.readAllByFilter({ limit, offset }, ctx);
      expect(response).toEqual(mockedCustomersPage);
      expect(ctx.prisma.customer.findMany).toHaveBeenCalledWith({
        where: {},
        skip: 20,
        take: 20,
      });
    });
  });

  describe('Test readById', () => {
    it('Should return found user by id', async () => {
      const mockCustomer = generateMockCustomer({ withId: true }) as Customer;

      ctx.prisma.customer.findUnique.mockResolvedValue(mockCustomer);

      const response = await CustomerService.readById(mockCustomer.id, ctx);
      expect(response).toEqual(mockCustomer);
    });

    it('Should throw not found error when no customer is found by id', async () => {
      const mockId = faker.datatype.number();

      ctx.prisma.customer.findUnique.mockResolvedValue(null);

      try {
        const response = await CustomerService.readById(mockId, ctx);
        expect(response).toBeUndefined();
      } catch (e) {
        expect(e).toBeInstanceOf(ApplicationError);
      }
    });
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

  describe('Test updateById', () => {
    it('Should update field and return new customer', async () => {
      const mockedCustomer = generateMockCustomer({ withId: true }) as Customer;
      const mockedPayload = { last_name: faker.name.lastName() };
      const mockedResult = { ...mockedCustomer, ...mockedPayload };

      ctx.prisma.customer.findUnique.mockResolvedValue(mockedCustomer);
      ctx.prisma.customer.update.mockResolvedValue(mockedResult);

      const response = await CustomerService.updateById(
        mockedCustomer.id,
        mockedPayload,
        ctx,
      );
      expect(response).toEqual(mockedResult);
    });

    it('Should throw not found error when no customer is found by id', async () => {
      const mockId = faker.datatype.number();
      const mockedPayload = { last_name: faker.name.lastName() };

      ctx.prisma.customer.findUnique.mockResolvedValue(null);

      try {
        const response = await CustomerService.updateById(
          mockId,
          mockedPayload,
          ctx,
        );
        expect(response).toBeUndefined();
      } catch (e) {
        expect(e).toBeInstanceOf(ApplicationError);
      }
    });
  });
});
