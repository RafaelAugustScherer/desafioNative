import { StatusCodes } from 'http-status-codes';
import CustomerService from '../service/customer';
import IRequestHandler from '../interface/IRequestHandler';

const readTotalCustomersByCity: IRequestHandler = async (_req, res, _next) => {
  const response = await CustomerService.readTotalCustomersByCity();

  res.status(StatusCodes.OK).json(response);
};

export default {
  readTotalCustomersByCity,
};
