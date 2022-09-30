import { Customer } from '@prisma/client';
import IContext from '../interface/IContext';

interface customersByCity {
  city: string,
  customers_total: number,
}

const readTotalCustomersByCity = async (ctx: IContext) => {
  const response = await ctx.prisma.customer.findMany();

  const customersByCity = response.reduce((acc: customersByCity[], cur: Customer) => {
    const cityIndexInResult = acc.findIndex(({ city }) => city === cur.city);

    if (cityIndexInResult !== -1) {
      acc[cityIndexInResult].customers_total += 1;
      return acc;
    }
    return [...acc, { city: cur.city, customers_total: 1 }];
  }, []);

  return customersByCity;
};

export default {
  readTotalCustomersByCity,
};
