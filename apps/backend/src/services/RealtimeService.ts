import { pusherClient } from '../config/pusher.js';
import { logger } from '../config/logger.js';

export class RealtimeService {
  async broadcast(event: string, data: unknown, channel = 'default') {
    try {
      await pusherClient.trigger(channel, event, {
        data,
        timestamp: new Date().toISOString(),
      });
      
      logger.debug(`Broadcasted event: ${event} on channel: ${channel}`);
    } catch (error) {
      logger.error('Error broadcasting event:', error);
      throw error;
    }
  }

  async broadcastToUser(userId: string, event: string, data: unknown) {
    const channel = `user-${userId}`;
    await this.broadcast(event, data, channel);
  }

  async broadcastToRoom(roomId: string, event: string, data: unknown) {
    const channel = `room-${roomId}`;
    await this.broadcast(event, data, channel);
  }
}