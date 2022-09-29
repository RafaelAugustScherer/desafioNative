import Express from 'express';
import customerRouter from './router/customer';

const App = Express();

App.use(Express.json());
App.use('/customer', customerRouter);

export default App;
