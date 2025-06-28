import { FastifyInstance } from 'fastify';
import { UserController } from '../controllers/UserController.js';

const userController = new UserController();

export async function userRoutes(server: FastifyInstance) {
  server.get('/users', userController.getUsers.bind(userController));
  server.get('/users/:id', userController.getUserById.bind(userController));
  server.post('/users', userController.createUser.bind(userController));
  server.put('/users/:id', userController.updateUser.bind(userController));
  server.delete('/users/:id', userController.deleteUser.bind(userController));
}