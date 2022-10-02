import { Customer } from '@prisma/client';
import ERRORS from '../helper/error';
import IContext from '../interface/IContext';

interface ICustomersByCity {
  city: string,
  customers_total: number,
}

const readAllByFilter = (filter: Partial<Customer>, ctx: IContext) => (
  ctx.prisma.customer.findMany({ where: filter })
);

const readById = async (id: number, ctx: IContext) => {
  const response = await ctx.prisma.customer.findUnique({ where: { id } });

  if (!response) {
    throw ERRORS.CUSTOMER.NOT_FOUND;
  }

  return response;
};

const readTotalCustomersByCity = async (ctx: IContext) => {
  const response = await ctx.prisma.customer.findMany();

  const customersByCity = response.reduce((acc: ICustomersByCity[], cur: Customer) => {
    const cityIndexInResult = acc.findIndex(({ city }) => city === cur.city);

    if (cityIndexInResult !== -1) {
      acc[cityIndexInResult].customers_total += 1;
      return acc;
    }
    return [...acc, { city: cur.city, customers_total: 1 }];
  }, []);

  return customersByCity;
};

const updateById = async (
  id: number,
  payload: Partial<Customer>,
  ctx: IContext,
) => {
  const userExists = await ctx.prisma.customer.findUnique({ where: { id } });
  if (!userExists) throw ERRORS.CUSTOMER.NOT_FOUND;

  const response = await ctx.prisma.customer.update(
    { where: { id }, data: payload },
  );

  return response;
};

export default {
  readAllByFilter,
  readById,
  readTotalCustomersByCity,
  updateById,
};
