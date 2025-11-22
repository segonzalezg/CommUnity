/**
 * User Controller
 * Handles HTTP requests for user operations
 */

import { Request, Response } from 'express';
import { UserService } from '../services/userService';

const userService = new UserService();

export class UserController {
  // GET /api/users
  getAllUsers = (req: Request, res: Response) => {
    try {
      const { search, role } = req.query;

      let users = userService.getAllUsers();

      if (search && typeof search === 'string') {
        users = userService.searchUsers(search);
      }

      if (role && typeof role === 'string') {
        users = users.filter(user => user.role === role);
      }

      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  };

  // GET /api/users/:id
  getUserById = (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = userService.getUserById(id);

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch user' });
    }
  };

  // POST /api/users
  createUser = (req: Request, res: Response) => {
    try {
      const userData = req.body;
      const newUser = userService.createUser(userData);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user' });
    }
  };

  // PUT /api/users/:id
  updateUser = (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      const updatedUser = userService.updateUser(id, updates);

      if (!updatedUser) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user' });
    }
  };

  // DELETE /api/users/:id
  deleteUser = (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = userService.deleteUser(id);

      if (!deleted) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete user' });
    }
  };
}

