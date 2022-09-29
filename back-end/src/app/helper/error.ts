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
};

export default ERRORS;
