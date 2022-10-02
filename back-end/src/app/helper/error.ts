import { StatusCodes } from 'http-status-codes';

export class ApplicationError extends Error {
  constructor(
    public statusCode: StatusCodes,
    public message: string,
  ) {
    super();
  }
}

const ERRORS = {
  CUSTOMER: {
    NOT_FOUND: new ApplicationError(
      StatusCodes.NOT_FOUND,
      'Customer not found',
    ),
  },
  USER: {
    INVALID_CREDENTIALS: new ApplicationError(
      StatusCodes.FORBIDDEN,
      'Invalid credentials',
    ),
  },
  AUTH: {
    TOKEN_NOT_FOUND: new ApplicationError(
      StatusCodes.BAD_REQUEST,
      'Token not found',
    ),
    INVALID_TOKEN: new ApplicationError(
      StatusCodes.FORBIDDEN,
      'Invalid token',
    ),
  },
};

export default ERRORS;
