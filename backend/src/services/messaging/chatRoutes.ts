/**
 * Chat Routes - Express routes for messaging endpoints
 */

import { Router } from 'express';
import {
  createMessage,
  getEventThread,
  getDirectMessageThread,
  getUserChats,
  markThreadRead,
  getMessageById,
} from './chatController';

const router = Router();

/**
 * POST /api/chat/messages
 * Send a new message
 */
router.post('/messages', createMessage);

/**
 * GET /api/chat/messages/:messageId
 * Get a single message by ID
 */
router.get('/messages/:messageId', getMessageById);

/**
 * GET /api/chat/threads/event/:eventId
 * Get thread messages for an event
 */
router.get('/threads/event/:eventId', getEventThread);

/**
 * GET /api/chat/threads/direct/:userId1/:userId2
 * Get direct message thread between two users
 */
router.get('/threads/direct/:userId1/:userId2', getDirectMessageThread);

/**
 * PUT /api/chat/threads/:threadId/read
 * Mark thread as read
 */
router.put('/threads/:threadId/read', markThreadRead);

/**
 * GET /api/chat/users/:userId/chats
 * List all chats for a user
 */
router.get('/users/:userId/chats', getUserChats);

export default router;

