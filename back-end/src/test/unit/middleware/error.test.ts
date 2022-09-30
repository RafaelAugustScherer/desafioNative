import { getMockReq, getMockRes } from '@jest-mock/express';
import { StatusCodes } from 'http-status-codes';
import errorMiddleware from '../../../app/middleware/error';
import {
  generateJoiError,
  generateApplicationError,
} from '../../shared/error';

describe('Test Error Middleware', () => {
  const req = getMockReq();
  const { res, next, mockClear } = getMockRes();

  beforeEach(() => {
    mockClear();
  });

  it('Handles JoiError and return formatted response', () => {
    const joiError = generateJoiError();

    errorMiddleware(joiError, req, res, next);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      error: expect.any(String),
    }));
  });

  it('Handles ApplicationError and return expected response', () => {
    const applicationError = generateApplicationError();

    errorMiddleware(applicationError, req, res, next);

    expect(res.status).toHaveBeenCalledWith(applicationError.statusCode);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      error: applicationError.message,
    }));
  });

  it('Handles unexpected error and return internal error response', () => {
    const unexpectedError = new Error('I am unexpected!');

    errorMiddleware(unexpectedError, req, res, next);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
  });
});
