import { nanoid } from 'nanoid';
import { User, CreateUser, UpdateUser, Pagination } from '@repo/shared-types';

// In-memory storage for demo purposes
// In production, this would connect to a real database
const users = new Map<string, User>();

export class UserRepository {
  async findMany(pagination: Pagination) {
    const allUsers = Array.from(users.values());
    const total = allUsers.length;
    const offset = (pagination.page - 1) * pagination.limit;
    const data = allUsers.slice(offset, offset + pagination.limit);
    
    return {
      data,
      pagination: {
        ...pagination,
        total,
        totalPages: Math.ceil(total / pagination.limit),
      },
    };
  }

  async findById(id: string): Promise<User | null> {
    return users.get(id) || null;
  }

  async create(userData: CreateUser): Promise<User> {
    const user: User = {
      id: nanoid(),
      ...userData,
      status: 'offline',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    users.set(user.id, user);
    return user;
  }

  async update(id: string, userData: UpdateUser): Promise<User | null> {
    const existingUser = users.get(id);
    
    if (!existingUser) {
      return null;
    }
    
    const updatedUser: User = {
      ...existingUser,
      ...userData,
      updatedAt: new Date(),
    };
    
    users.set(id, updatedUser);
    return updatedUser;
  }

  async delete(id: string): Promise<boolean> {
    return users.delete(id);
  }

  async findByEmail(email: string): Promise<User | null> {
    for (const user of users.values()) {
      if (user.email === email) {
        return user;
      }
    }
    return null;
  }
}