import Pusher from 'pusher';
import { config } from './environment.js';
import { logger } from './logger.js';

export const pusherClient = new Pusher({
  appId: config.pusher.appId,
  key: config.pusher.key,
  secret: config.pusher.secret,
  cluster: config.pusher.cluster,
  useTLS: true,
});

logger.info('🔄 Pusher client initialized');