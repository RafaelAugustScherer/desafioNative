import { StatusCodes } from 'http-status-codes';
import CustomerService from '../service/customer';
import { IControllerRequestHandler } from '../interface/IRequestHandler';

const readAllByFilter: IControllerRequestHandler = async (req, res, _next, ctx) => {
  const response = await CustomerService.readAllByFilter({ ...req.query }, ctx);

  res.status(StatusCodes.OK).json(response);
};

const readById: IControllerRequestHandler = async (req, res, _next, ctx) => {
  const { id } = req.params;
  const response = await CustomerService.readById(+id, ctx);

  res.status(StatusCodes.OK).json(response);
};

const readTotalCustomersByCity: IControllerRequestHandler = async (_req, res, _next, ctx) => {
  const response = await CustomerService.readTotalCustomersByCity(ctx);

  res.status(StatusCodes.OK).json(response);
};

const updateById: IControllerRequestHandler = async (req, res, _next, ctx) => {
  const { id } = req.params;

  const response = await CustomerService.updateById(+id, req.body, ctx);

  res.status(StatusCodes.OK).json(response);
};

export default {
  readAllByFilter,
  readById,
  readTotalCustomersByCity,
  updateById,
};
