import { StatusCodes } from 'http-status-codes';
import CustomerService from '../service/customer';
import IRequestHandler from '../interface/IRequestHandler';

const readAllByFilter: IRequestHandler = async (req, res, _next, ctx) => {
  const response = await CustomerService.readAllByFilter({ ...req.query }, ctx);

  res.status(StatusCodes.OK).json(response);
};

const readTotalCustomersByCity: IRequestHandler = async (_req, res, _next, ctx) => {
  const response = await CustomerService.readTotalCustomersByCity(ctx);

  res.status(StatusCodes.OK).json(response);
};

export default {
  readAllByFilter,
  readTotalCustomersByCity,
};
