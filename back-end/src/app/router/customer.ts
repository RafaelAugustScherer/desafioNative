import { Router } from 'express';
import prisma from '../helper/prisma';

import CustomerController from '../controller/customer';

const customerRouter = Router();
const ctx = { prisma };

customerRouter.get(
  '/total/by/city',
  (req, res, next) => (
    CustomerController.readTotalCustomersByCity(req, res, next, ctx)
  ),
);

export default customerRouter;
