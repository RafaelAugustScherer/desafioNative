import { Request, Response, NextFunction } from 'express-serve-static-core';

type IRequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export default IRequestHandler;
