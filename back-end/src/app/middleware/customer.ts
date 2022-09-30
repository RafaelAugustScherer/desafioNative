import { IMiddlewareRequestHandler } from '../interface/IRequestHandler';
import CustomerSchema from '../schema/customer';

const validateFilter: IMiddlewareRequestHandler = async (req, _res, next) => {
  await CustomerSchema.filter.validateAsync(req.query);
  next();
};

export default {
  validateFilter,
};
