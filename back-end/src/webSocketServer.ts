import { WebSocketServer } from 'ws';
import * as http from 'http';

const createWebSocketServer = (server: http.Server) => (
  new WebSocketServer({ server })
);

export default createWebSocketServer;
