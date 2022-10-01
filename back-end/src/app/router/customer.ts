import { Router } from 'express';
import prisma from '../helper/prisma';

import CustomerController from '../controller/customer';
import CustomerMiddleware from '../middleware/customer';

const customerRouter = Router();
const ctx = { prisma };

customerRouter.route('/')
  .get(
    CustomerMiddleware.validateFilter,
    (req, res, next) => (
      CustomerController.readAllByFilter(req, res, next, ctx)
    ),
  );

customerRouter.route('/:id')
  .get(
    CustomerMiddleware.validateReadById,
    (req, res, next) => (
      CustomerController.readById(req, res, next, ctx)
    ),
  )
  .patch(
    CustomerMiddleware.validateUpdateById,
    (req, res, next) => (
      CustomerController.updateById(req, res, next, ctx)
    ),
  );

customerRouter.get(
  '/total/by/city',
  (req, res, next) => (
    CustomerController.readTotalCustomersByCity(req, res, next, ctx)
  ),
);

export default customerRouter;
