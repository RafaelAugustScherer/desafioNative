import dotenv from 'dotenv';
import App from './app';

dotenv.config();

const PORT = process.env.APP_PORT || 3001;

// eslint-disable-next-line no-console
App.listen(PORT, () => console.log(`App running at ${PORT}`));
