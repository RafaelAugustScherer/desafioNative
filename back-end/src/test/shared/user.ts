import { faker } from '@faker-js/faker/locale/en_US';
import { User } from '@prisma/client';

export type UserLogin = Pick<User, 'username' | 'password'>;

const generateMockUserLogin = (): UserLogin => ({
  username: faker.internet.userName(),
  password: faker.internet.password(),
});

const generateMockUser = (userLogin?: UserLogin): User => {
  const userNameAndPassword = userLogin || generateMockUserLogin();

  return {
    id: faker.datatype.number(),
    ...userNameAndPassword,
    role: faker.helpers.arrayElement(['administrator', 'user']),
  };
};

export {
  generateMockUser,
  generateMockUserLogin,
};
