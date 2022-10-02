import JWT from 'jsonwebtoken';
import ERRORS from '../helper/error';
import { IMiddlewareRequestHandler } from '../interface/IRequestHandler';

const validateToken: IMiddlewareRequestHandler = async (req, _res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw ERRORS.AUTH.TOKEN_NOT_FOUND;
  }

  try {
    JWT.decode(authorization);
  } catch (e) {
    throw ERRORS.AUTH.INVALID_TOKEN;
  }

  next();
};

export default {
  validateToken,
};
