import { config } from './config/environment.js';
import { createServer } from './server.js';
import { logger } from './config/logger.js';

async function start() {
  try {
    const server = await createServer();
    
    await server.listen({
      port: config.port,
      host: config.host,
    });

    logger.info(`🚀 Server running on ${config.host}:${config.port}`);
    logger.info(`📝 Environment: ${config.nodeEnv}`);
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  process.exit(0);
});

start();