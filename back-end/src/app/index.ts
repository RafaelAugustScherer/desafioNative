import Express from 'express';
import 'express-async-errors';
import customerRouter from './router/customer';
import errorMiddleware from './middleware/error';

const App = Express();

App.use(Express.json());
App.use('/customer', customerRouter);
App.use(errorMiddleware);

export default App;
