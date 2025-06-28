import { FastifyInstance } from 'fastify';
import { userRoutes } from './users.js';
import { websocketRoutes } from './websocket.js';

export async function setupRoutes(server: FastifyInstance) {
  // API prefix
  await server.register(async function (server) {
    await server.register(userRoutes);
    await server.register(websocketRoutes);
  }, { prefix: '/api' });
}