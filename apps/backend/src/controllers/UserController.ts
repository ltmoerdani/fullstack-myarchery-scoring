import { FastifyRequest, FastifyReply } from 'fastify';
import { UserService } from '../services/UserService.js';
import { CreateUserSchema, UpdateUserSchema } from '@repo/shared-types';
import { IdSchema, PaginationSchema } from '@repo/shared-types';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getUsers(request: FastifyRequest, reply: FastifyReply) {
    try {
      const pagination = PaginationSchema.parse(request.query);
      const result = await this.userService.getUsers(pagination);

      return reply.send({
        success: true,
        data: result.data,
        meta: {
          pagination: result.pagination,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getUserById(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const validatedId = IdSchema.parse(id);
      
      const user = await this.userService.getUserById(validatedId);
      
      if (!user) {
        return reply.status(404).send({
          success: false,
          error: {
            code: 'USER_NOT_FOUND',
            message: 'User not found',
          },
        });
      }

      return reply.send({
        success: true,
        data: user,
        meta: {
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async createUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      const userData = CreateUserSchema.parse(request.body);
      const user = await this.userService.createUser(userData);

      return reply.status(201).send({
        success: true,
        data: user,
        meta: {
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async updateUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const validatedId = IdSchema.parse(id);
      const userData = UpdateUserSchema.parse(request.body);
      
      const user = await this.userService.updateUser(validatedId, userData);
      
      if (!user) {
        return reply.status(404).send({
          success: false,
          error: {
            code: 'USER_NOT_FOUND',
            message: 'User not found',
          },
        });
      }

      return reply.send({
        success: true,
        data: user,
        meta: {
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const validatedId = IdSchema.parse(id);
      
      const success = await this.userService.deleteUser(validatedId);
      
      if (!success) {
        return reply.status(404).send({
          success: false,
          error: {
            code: 'USER_NOT_FOUND',
            message: 'User not found',
          },
        });
      }

      return reply.status(204).send();
    } catch (error) {
      throw error;
    }
  }
}