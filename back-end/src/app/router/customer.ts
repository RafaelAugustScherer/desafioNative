import { Router } from 'express';
import CustomerController from '../controller/customer';

const customerRouter = Router();

customerRouter.get(
  '/groupby/city',
  CustomerController.readTotalClientsByCity,
);

export default customerRouter;
