import { IMiddlewareRequestHandler } from '../interface/IRequestHandler';
import CustomerSchema from '../schema/customer';

const validateFilter: IMiddlewareRequestHandler = async (req, _res, next) => {
  await CustomerSchema.filter.validateAsync(req.query);
  next();
};

const validateReadById: IMiddlewareRequestHandler = async (req, _res, next) => {
  await CustomerSchema.readById.validateAsync(req.params);
  next();
};

const validateUpdateById: IMiddlewareRequestHandler = async (req, _res, next) => {
  await CustomerSchema.readById.validateAsync(req.params);
  await CustomerSchema.update.validateAsync(req.body);
  next();
};

export default {
  validateFilter,
  validateReadById,
  validateUpdateById,
};
