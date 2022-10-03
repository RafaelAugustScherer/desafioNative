import Express from 'express';
import Cors from 'cors';
import 'express-async-errors';
import customerRouter from './router/customer';
import userRouter from './router/user';
import errorMiddleware from './middleware/error';

const App = Express();

App.use(Express.json());
App.use(Cors());
App.use('/customer', customerRouter);
App.use('/user', userRouter);
App.use(errorMiddleware);

export default App;
