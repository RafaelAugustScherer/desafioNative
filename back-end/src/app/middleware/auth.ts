import JWT, { JwtPayload } from 'jsonwebtoken';
import ERRORS from '../helper/error';
import { IMiddlewareRequestHandler } from '../interface/IRequestHandler';

const validateToken: IMiddlewareRequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw ERRORS.AUTH.TOKEN_NOT_FOUND;
  }

  try {
    const { username, password } = JWT.decode(authorization) as JwtPayload;

    if (!username || !password) throw new Error();
  } catch (e) {
    throw ERRORS.AUTH.INVALID_TOKEN;
  }

  next();
};

export default {
  validateToken,
};
