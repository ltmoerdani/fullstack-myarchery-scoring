import { z } from 'zod';
import { PaginationSchema } from './common';

export const ApiResponseSchema = z.object({
  success: z.boolean(),
  data: z.unknown().optional(),
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.record(z.unknown()).optional(),
  }).optional(),
  meta: z.object({
    pagination: PaginationSchema.optional(),
    timestamp: z.string(),
  }).optional(),
});

export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  meta?: {
    pagination?: {
      page: number;
      limit: number;
      total?: number;
      totalPages?: number;
    };
    timestamp: string;
  };
};

export interface WebSocketMessage {
  type: string;
  payload: unknown;
  timestamp: string;
}

export interface RealTimeEvent {
  event: string;
  channel: string;
  data: unknown;
}