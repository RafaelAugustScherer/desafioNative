import { faker } from '@faker-js/faker/locale/en_US';
import { User } from '@prisma/client';

export type UserLogin = Pick<User, 'username' | 'password'>;

const generateMockUserLogin = (): UserLogin => ({
  username: faker.internet.userName(),
  password: faker.internet.password(),
});

const generateMockUser = (): User => ({
  id: faker.datatype.number(),
  ...generateMockUserLogin(),
  role: faker.helpers.arrayElement(['administrator', 'user']),
});

export {
  generateMockUser,
  generateMockUserLogin,
};
