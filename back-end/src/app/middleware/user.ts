import { IMiddlewareRequestHandler } from '../interface/IRequestHandler';
import UserSchema from '../schema/user';

const validateLogin: IMiddlewareRequestHandler = async (req, _res, next) => {
  await UserSchema.login.validateAsync(req.body);
  next();
};

export default {
  validateLogin,
};
