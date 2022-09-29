import { Router } from 'express';
import CustomerController from '../controller/customer';

const customerRouter = Router();

customerRouter.get(
  '/total/by/city',
  CustomerController.readTotalClientsByCity,
);

export default customerRouter;
