import dotenv from 'dotenv';
import App from './app';
import createWebSocketServer from './webSocketServer';

dotenv.config();

process.on('SIGTERM', () => {
  process.exit();
});

const PORT = process.env.PORT || 3001;

// eslint-disable-next-line no-console
const server = App.listen(PORT, () => console.log(`App running at ${PORT}`));
createWebSocketServer(server);
