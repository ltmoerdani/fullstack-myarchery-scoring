import { z } from 'zod';

export const IdSchema = z.string().uuid();

export const PaginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
});

export const TimestampsSchema = z.object({
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Id = z.infer<typeof IdSchema>;
export type Pagination = z.infer<typeof PaginationSchema>;
export type Timestamps = z.infer<typeof TimestampsSchema>;

export interface AppError {
  code: string;
  message: string;
  statusCode: number;
  details?: Record<string, unknown>;
}

export interface Result<T, E = AppError> {
  success: boolean;
  data?: T;
  error?: E;
}

export const createSuccessResult = <T>(data: T): Result<T> => ({
  success: true,
  data,
});

export const createErrorResult = <E = AppError>(error: E): Result<never, E> => ({
  success: false,
  error,
});