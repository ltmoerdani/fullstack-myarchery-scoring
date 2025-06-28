import { UserRepository } from '../repositories/UserRepository.js';
import { RealtimeService } from './RealtimeService.js';
import { CacheService } from './CacheService.js';
import { User, CreateUser, UpdateUser, Pagination } from '@repo/shared-types';

export class UserService {
  private userRepository: UserRepository;
  private realtimeService: RealtimeService;
  private cacheService: CacheService;

  constructor() {
    this.userRepository = new UserRepository();
    this.realtimeService = new RealtimeService();
    this.cacheService = new CacheService();
  }

  async getUsers(pagination: Pagination) {
    const cacheKey = `users:${pagination.page}:${pagination.limit}`;
    
    // Try cache first
    const cached = await this.cacheService.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    const result = await this.userRepository.findMany(pagination);
    
    // Cache the result for 5 minutes
    await this.cacheService.set(cacheKey, JSON.stringify(result), 300);
    
    return result;
  }

  async getUserById(id: string): Promise<User | null> {
    const cacheKey = `user:${id}`;
    
    // Try cache first
    const cached = await this.cacheService.get(cacheKey);
    if (cached) {
      return JSON.parse(cached);
    }

    const user = await this.userRepository.findById(id);
    
    if (user) {
      // Cache the user for 10 minutes
      await this.cacheService.set(cacheKey, JSON.stringify(user), 600);
    }
    
    return user;
  }

  async createUser(userData: CreateUser): Promise<User> {
    const user = await this.userRepository.create(userData);
    
    // Invalidate cache
    await this.cacheService.deletePattern('users:*');
    
    // Broadcast user creation
    await this.realtimeService.broadcast('user.created', user);
    
    return user;
  }

  async updateUser(id: string, userData: UpdateUser): Promise<User | null> {
    const user = await this.userRepository.update(id, userData);
    
    if (user) {
      // Update cache
      await this.cacheService.set(`user:${id}`, JSON.stringify(user), 600);
      
      // Invalidate list cache
      await this.cacheService.deletePattern('users:*');
      
      // Broadcast user update
      await this.realtimeService.broadcast('user.updated', user);
    }
    
    return user;
  }

  async deleteUser(id: string): Promise<boolean> {
    const success = await this.userRepository.delete(id);
    
    if (success) {
      // Remove from cache
      await this.cacheService.delete(`user:${id}`);
      
      // Invalidate list cache
      await this.cacheService.deletePattern('users:*');
      
      // Broadcast user deletion
      await this.realtimeService.broadcast('user.deleted', { id });
    }
    
    return success;
  }
}