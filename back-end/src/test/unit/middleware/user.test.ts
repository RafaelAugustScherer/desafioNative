import { Request } from 'express';
import { getMockReq, getMockRes } from '@jest-mock/express';
import { ValidationError } from 'joi';
import UserMiddleware from '../../../app/middleware/user';
import { generateMockUser, generateMockUserLogin } from '../../shared/user';

describe('Test User Middleware', () => {
  let req: Request;
  const { res, next, mockClear } = getMockRes();

  beforeEach(() => {
    mockClear();
    req = getMockReq();
  });

  describe('Test validateLogin', () => {
    const loginMock = generateMockUserLogin();

    it('Should correctly validate request', async () => {
      req.body = loginMock;

      await UserMiddleware.validateLogin(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it('Should throw error for invalid fields', async () => {
      const userMock = generateMockUser();
      req.body = userMock;

      try {
        await UserMiddleware.validateLogin(req, res, next);
      } catch (e) {
        expect(e).toBeInstanceOf(ValidationError);
      }
      expect(next).not.toHaveBeenCalled();
    });
  });
});
