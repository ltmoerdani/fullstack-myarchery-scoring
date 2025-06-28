import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import rateLimit from '@fastify/rate-limit';
import websocket from '@fastify/websocket';

import { config } from './config/environment.js';
import { logger } from './config/logger.js';
import { errorHandler } from './middleware/errorHandler.js';
import { setupRoutes } from './routes/index.js';
import { redisClient } from './config/redis.js';

export async function createServer() {
  const server = Fastify({
    logger: logger,
    trustProxy: true,
  });

  // Security middleware
  await server.register(helmet, {
    contentSecurityPolicy: false,
  });

  await server.register(cors, {
    origin: config.corsOrigin,
    credentials: true,
  });

  await server.register(rateLimit, {
    max: config.rateLimitMax,
    timeWindow: config.rateLimitWindow,
    redis: redisClient,
  });

  // WebSocket support
  await server.register(websocket);

  // Global error handler
  server.setErrorHandler(errorHandler);

  // Health check
  server.get('/health', async () => {
    const redisStatus = redisClient.status === 'ready' ? 'connected' : 'disconnected';
    
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        redis: redisStatus,
        pusher: 'connected', // Pusher doesn't have a direct status check
      },
    };
  });

  // Setup API routes
  await setupRoutes(server as any);

  return server;
}