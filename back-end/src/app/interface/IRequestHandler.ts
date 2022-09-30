import { Request, Response, NextFunction } from 'express-serve-static-core';
import IContext from './IContext';

type IRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
  ctx: IContext,
) => Promise<void>;

export default IRequestHandler;
