import { ErrorRequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';

const errorMiddleware: ErrorRequestHandler = async (_err, _req, res, _next) => (
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).end()
);

export default errorMiddleware;
