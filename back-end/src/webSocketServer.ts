import { WebSocketServer } from 'ws';
import * as http from 'http';
import JWT from 'jsonwebtoken';

const authenticate = (token: string) => {
  try {
    JWT.decode(token);
    return true;
  } catch (e) {
    return false;
  }
};

const createWebSocketServer = (server: http.Server) => {
  const wssServer = new WebSocketServer({ server });

  wssServer.on('connection', (ws, req) => {
    let messageCount = 0;
    let isTokenValid: boolean;
    ws.on('message', (data, isBinary) => {
      if (messageCount === 0) {
        isTokenValid = authenticate(data.toString());

        if (isTokenValid) {
          messageCount += 1;
          return ws.send('Client validated!');
        }
        return ws.send('Client is unauthorized!');
      }

      if (isTokenValid) {
        wssServer.clients.forEach((client) => {
          if (req.url === '/customer') {
            client.send(data, { binary: isBinary });
          }
        });
        messageCount += 1;
      }
      return ws.close();
    });
  });
};

export default createWebSocketServer;
