import { faker } from '@faker-js/faker/locale/en_US';
import { Customer } from '@prisma/client';

const generateMockCustomer = (): Customer => ({
  id: faker.datatype.number(),
  first_name: faker.name.firstName(),
  last_name: faker.name.lastName(),
  email: faker.internet.email(),
  gender: faker.helpers.arrayElement(['Male', 'Female']),
  company: faker.company.name(),
  city: faker.address.cityName(),
  title: faker.name.jobTitle(),
});

const generateMockCustomers = (quantity: number): Customer[] => (
  Array(quantity).fill(generateMockCustomer())
);

interface customersByCity {
  city: string,
  customers_total: number,
}

const totalCustomersByCity = (customers: Customer[]) => (
  customers.reduce((acc: customersByCity[], cur: Customer) => {
    const cityIndexInResult = acc.findIndex(({ city }) => city === cur.city);

    if (cityIndexInResult !== -1) {
      acc[cityIndexInResult].customers_total += 1;
      return acc;
    }
    return [...acc, { city: cur.city, customers_total: 1 }];
  }, [])
);

export {
  generateMockCustomer,
  generateMockCustomers,
  totalCustomersByCity,
};
