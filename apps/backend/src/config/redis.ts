import Redis from 'ioredis';
import { config } from './environment.js';
import { logger } from './logger.js';

export const redisClient = new Redis(config.redisUrl, {
  enableReadyCheck: true,
  maxRetriesPerRequest: 3,
});

redisClient.on('connect', () => {
  logger.info('✅ Connected to Redis');
});

redisClient.on('error', (error: Error) => {
  logger.error('❌ Redis connection error:', error);
});

redisClient.on('ready', () => {
  logger.info('🎯 Redis is ready');
});