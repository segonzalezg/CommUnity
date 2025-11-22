/**
 * User Service
 * Business logic for user management
 */

import { User, UserRole } from '../../../src/models/User';
import { users, generateId } from '../data/dataStore';

export class UserService {
  // Get all users
  getAllUsers(): User[] {
    return users;
  }

  // Get user by ID
  getUserById(id: string): User | undefined {
    return users.find(user => user.id === id);
  }

  // Get user by email
  getUserByEmail(email: string): User | undefined {
    return users.find(user => user.email === email);
  }

  // Get user by username
  getUserByUsername(username: string): User | undefined {
    return users.find(user => user.username === username);
  }

  // Create new user
  createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): User {
    const newUser: User = {
      ...userData,
      id: generateId('user'),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    users.push(newUser);
    return newUser;
  }

  // Update user
  updateUser(id: string, updates: Partial<User>): User | null {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) return null;

    users[userIndex] = {
      ...users[userIndex],
      ...updates,
      id, // Ensure ID doesn't change
      updatedAt: new Date(),
    };
    return users[userIndex];
  }

  // Delete user
  deleteUser(id: string): boolean {
    const userIndex = users.findIndex(user => user.id === id);
    if (userIndex === -1) return false;
    users.splice(userIndex, 1);
    return true;
  }

  // Search users
  searchUsers(query: string): User[] {
    const lowerQuery = query.toLowerCase();
    return users.filter(
      user =>
        user.displayName.toLowerCase().includes(lowerQuery) ||
        user.username.toLowerCase().includes(lowerQuery) ||
        user.email.toLowerCase().includes(lowerQuery) ||
        (user.bio && user.bio.toLowerCase().includes(lowerQuery))
    );
  }

  // Get users by role
  getUsersByRole(role: UserRole): User[] {
    return users.filter(user => user.role === role);
  }
}

