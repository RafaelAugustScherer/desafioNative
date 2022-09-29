import prisma from '../model/prisma';

const readTotalClientsByCity = async () => {
  const response = await prisma.customer.groupBy({
    by: ['city'],
    _count: {
      _all: true,
    },
  });

  return response.map(({ city, _count }) => ({
    city,
    customers_total: _count._all,
  }));
};

export default {
  readTotalClientsByCity,
};
