import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'joi';
import { StatusCodes } from 'http-status-codes';
import { ApplicationError } from '../helper/error';

const errorMiddleware: ErrorRequestHandler = async (err, _req, res, _next) => {
  if (err instanceof ValidationError) {
    const { message: error } = err.details[0];
    return res.status(StatusCodes.BAD_REQUEST).json({ error });
  }

  if (err instanceof ApplicationError) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
};

export default errorMiddleware;
