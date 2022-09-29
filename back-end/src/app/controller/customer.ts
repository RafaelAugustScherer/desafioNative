import { RequestHandler } from 'express';
import { StatusCodes } from 'http-status-codes';
import CustomerService from '../service/customer';

const readTotalClientsByCity: RequestHandler = async (_req, res, _next) => {
  const response = await CustomerService.readTotalClientsByCity();

  return res.status(StatusCodes.OK).json(response);
};

export default {
  readTotalClientsByCity,
};
