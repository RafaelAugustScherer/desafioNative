import * as http from 'http';
import { Server } from 'socket.io';
import AuthHelpers from './app/helper/auth';
import { ApplicationError } from './app/helper/error';

const createServerIoServer = (server: http.Server) => {
  const io = new Server(server, {
    serveClient: false,
    cors: {},
  });

  io.use((socket, next) => {
    try {
      AuthHelpers.validateToken(socket.handshake.auth.token);
    } catch (e) {
      if (e instanceof ApplicationError) next(e);
    }
    next();
  });

  io.on('connection', (socket) => {
    socket.on('updateCustomer', (updatedCustomer) => {
      socket.broadcast.emit('updatedCustomer', updatedCustomer);
    });
  });
};

export default createServerIoServer;
