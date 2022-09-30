import { faker } from '@faker-js/faker/locale/en_US';
import { Customer } from '@prisma/client';

type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;

export type CustomerCreate = Optional<Customer, 'id'>;

interface mockCustomerProps {
  withId: boolean
}

const generateMockCustomer = (props?: mockCustomerProps): CustomerCreate => {
  const { withId } = props || {};

  const customer: CustomerCreate = {
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    gender: faker.helpers.arrayElement(['Male', 'Female']),
    company: faker.company.name(),
    city: faker.address.cityName(),
    title: faker.name.jobTitle(),
  };

  if (withId) customer.id = faker.datatype.number();
  return customer;
};

const generateMockCustomers = (
  quantity: number,
  props: mockCustomerProps = { withId: false },
): CustomerCreate[] => (
  Array(quantity).fill(generateMockCustomer(props))
);

interface customersByCity {
  city: string,
  customers_total: number,
}

const totalCustomersByCity = (customers: CustomerCreate[]) => (
  customers.reduce((acc: customersByCity[], cur: CustomerCreate) => {
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
