import { StatusCodes } from 'http-status-codes';
import md5 from 'md5';
import { PrismaClient } from '@prisma/client';
import requester from './utilities/requester';

import { generateMockUser, generateMockUserLogin, UserLogin } from '../shared/user';
import ERRORS from '../../app/helper/error';

const prisma = new PrismaClient();

describe('Test User Routes', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(() => requester.close());

  describe('Test POST /user/login', () => {
    const loginRequest = (user: UserLogin) => (
      requester.post('/user/login').send(user)
    );

    it('Should return token when user exists', async () => {
      const loginMock = generateMockUserLogin();
      const userMock = generateMockUser(loginMock);

      await prisma.user.create(
        { data: { ...userMock, password: md5(userMock.password) } },
      );

      const response = await loginRequest(loginMock);

      expect(response.status).toBe(StatusCodes.OK);
      expect(response.body).toMatchObject({
        token: expect.any(String),
      });
    });

    it('Should return forbidden error for invalid credentials', async () => {
      const loginMock = generateMockUserLogin();

      const response = await loginRequest(loginMock);

      expect(response.status).toBe(StatusCodes.FORBIDDEN);
      expect(response.body).toMatchObject({
        error: ERRORS.USER.INVALID_CREDENTIALS.message,
      });
    });
  });
});
