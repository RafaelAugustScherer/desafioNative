import { Request } from 'express';
import { getMockReq, getMockRes } from '@jest-mock/express';
import JWT from 'jsonwebtoken';
import { faker } from '@faker-js/faker';
import { ApplicationError } from '../../../app/helper/error';
import AuthMiddleware from '../../../app/middleware/auth';

describe('Test Authentication Middleware', () => {
  let req: Request;
  const { res, next, mockClear } = getMockRes();

  beforeEach(() => {
    mockClear();
    req = getMockReq();
  });

  describe('Test validateToken', () => {
    const tokenMock = faker.datatype.hexadecimal({ length: 36 });

    it('Should correctly validate token', async () => {
      req.headers.authorization = tokenMock;

      jest.spyOn(JWT, 'verify').mockReturnValue();

      await AuthMiddleware.validateToken(req, res, next);
      expect(next).toHaveBeenCalled();
    });

    it('Should throw error for unexistent token', async () => {
      try {
        await AuthMiddleware.validateToken(req, res, next);
      } catch (e) {
        expect(e).toBeInstanceOf(ApplicationError);
      }
      expect(next).not.toHaveBeenCalled();
    });

    it('Should throw error for invalid token', async () => {
      jest.spyOn(JWT, 'verify').mockImplementation(() => {
        throw new Error();
      });

      try {
        await AuthMiddleware.validateToken(req, res, next);
      } catch (e) {
        expect(e).toBeInstanceOf(ApplicationError);
      }
      expect(next).not.toHaveBeenCalled();
    });
  });
});
