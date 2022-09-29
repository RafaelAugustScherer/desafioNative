import { StatusCodes } from 'http-status-codes';
import CustomerService from '../service/customer';
import IRequestHandler from '../interface/IRequestHandler';

const readTotalClientsByCity: IRequestHandler = async (_req, res, _next) => {
  const response = await CustomerService.readTotalClientsByCity();

  res.status(StatusCodes.OK).json(response);
};

export default {
  readTotalClientsByCity,
};
