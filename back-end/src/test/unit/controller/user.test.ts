import { Request } from 'express';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { StatusCodes } from 'http-status-codes';
import { faker } from '@faker-js/faker';
import UserController from '../../../app/controller/user';
import UserService from '../../../app/service/user';
import { MockContext, createMockContext } from '../../shared/prisma/context';
import { generateApplicationError } from '../../shared/error';
import { generateMockUserLogin } from '../../shared/user';
import ERRORS from '../../../app/helper/error';

describe('Test User Controller', () => {
  let req: Request;
  const { res, next, mockClear } = getMockRes();
  let ctx: MockContext;

  beforeEach(() => {
    mockClear();
    req = getMockReq();
    ctx = createMockContext();
  });

  describe('Test login', () => {
    const mockRequest = () => {
      const loginMock = generateMockUserLogin();
      req.body = loginMock;
    };

    it('Should respond with token when login is successful', async () => {
      const tokenMock = faker.datatype.hexadecimal({ length: 36 });
      mockRequest();

      jest.spyOn(UserService, 'login').mockResolvedValue({ token: tokenMock });

      await UserController.login(req, res, next, ctx);

      expect(res.status).toHaveBeenCalledWith(StatusCodes.OK);
      expect(res.json).toHaveBeenCalledWith({ token: tokenMock });
    });

    it('should throw exception when service throws an error', async () => {
      const applicationError = generateApplicationError(ERRORS.USER.INVALID_CREDENTIALS);
      mockRequest();

      jest.spyOn(UserService, 'login')
        .mockRejectedValue(applicationError);

      try {
        const response = await UserController.login(req, res, next, ctx);
        expect(response).toBeUndefined();
      } catch (e) {
        expect(e).toBe(applicationError);
      }
    });
  });
});
