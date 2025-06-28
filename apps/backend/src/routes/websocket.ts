import { FastifyInstance } from 'fastify';
import { SocketStream } from '@fastify/websocket';
import { logger } from '../config/logger.js';

export async function websocketRoutes(server: FastifyInstance) {
  server.get('/ws', { websocket: true }, (connection: SocketStream) => {
    logger.info('New WebSocket connection established');

    connection.socket.on('message', (message: Buffer) => {
      try {
        const data = JSON.parse(message.toString());
        logger.debug('Received WebSocket message:', data);

        // Echo the message back
        connection.socket.send(JSON.stringify({
          type: 'echo',
          payload: data,
          timestamp: new Date().toISOString(),
        }));
      } catch (error) {
        logger.error('Error parsing WebSocket message:', error);
        connection.socket.send(JSON.stringify({
          type: 'error',
          payload: { message: 'Invalid message format' },
          timestamp: new Date().toISOString(),
        }));
      }
    });

    connection.socket.on('close', () => {
      logger.info('WebSocket connection closed');
    });

    connection.socket.on('error', (error: Error) => {
      logger.error('WebSocket error:', error);
    });

    // Send welcome message
    connection.socket.send(JSON.stringify({
      type: 'welcome',
      payload: { message: 'Connected to WebSocket server' },
      timestamp: new Date().toISOString(),
    }));
  });
}