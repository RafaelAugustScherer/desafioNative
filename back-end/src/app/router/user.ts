import { Router } from 'express';
import prisma from '../helper/prisma';
import UserController from '../controller/user';
import UserMiddleware from '../middleware/user';

const userRouter = Router();

const ctx = { prisma };

userRouter.post(
  '/login',
  UserMiddleware.validateLogin,
  (req, res, next) => (
    UserController.login(req, res, next, ctx)
  ),
);

export default userRouter;
