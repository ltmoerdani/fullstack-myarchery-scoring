import { config as dotenvConfig } from 'dotenv';
import { z } from 'zod';

dotenvConfig();

const EnvironmentSchema = z.object({
  nodeEnv: z.enum(['development', 'production', 'test']).default('development'),
  port: z.coerce.number().default(3001),
  host: z.string().default('0.0.0.0'),
  redisUrl: z.string().default('redis://localhost:6379'),
  corsOrigin: z.string().default('http://localhost:3000'),
  rateLimitMax: z.coerce.number().default(100),
  rateLimitWindow: z.coerce.number().default(60000),
  pusher: z.object({
    appId: z.string(),
    key: z.string(),
    secret: z.string(),
    cluster: z.string(),
  }),
  jwtSecret: z.string().optional(),
});

const env = {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
  host: process.env.HOST,
  redisUrl: process.env.REDIS_URL,
  corsOrigin: process.env.CORS_ORIGIN,
  rateLimitMax: process.env.RATE_LIMIT_MAX,
  rateLimitWindow: process.env.RATE_LIMIT_WINDOW,
  pusher: {
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_KEY,
    secret: process.env.PUSHER_SECRET,
    cluster: process.env.PUSHER_CLUSTER,
  },
  jwtSecret: process.env.JWT_SECRET,
};

export const config = EnvironmentSchema.parse(env);