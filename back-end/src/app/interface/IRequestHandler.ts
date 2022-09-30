import { Request, Response, NextFunction } from 'express-serve-static-core';
import IContext from './IContext';

type IControllerRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
  ctx: IContext,
) => Promise<void>;

type IMiddlewareRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;

export {
  IControllerRequestHandler,
  IMiddlewareRequestHandler,
};
