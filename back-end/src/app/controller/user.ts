import { StatusCodes } from 'http-status-codes';
import UserService from '../service/user';
import { IControllerRequestHandler } from '../interface/IRequestHandler';

const login: IControllerRequestHandler = async (req, res, _next, ctx) => {
  const response = await UserService.login(req.body, ctx);

  res.status(StatusCodes.OK).json(response);
};

export default {
  login,
};
