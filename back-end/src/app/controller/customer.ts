import { StatusCodes } from 'http-status-codes';
import CustomerService from '../service/customer';
import IRequestHandler from '../interface/IRequestHandler';

const readTotalCustomersByCity: IRequestHandler = async (_req, res, _next, ctx) => {
  const response = await CustomerService.readTotalCustomersByCity(ctx);

  res.status(StatusCodes.OK).json(response);
};

export default {
  readTotalCustomersByCity,
};
