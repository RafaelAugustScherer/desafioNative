import { RequestHandler } from 'express';
import CustomerSchema from '../schema/customer';

const validateFilter: RequestHandler = async (req, _res, next) => {
  await CustomerSchema.filter.validateAsync(req.query);
  next();
};

export default {
  validateFilter,
};
