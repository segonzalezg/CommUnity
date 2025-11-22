/**
 * Chat Controller - Handles HTTP requests for messaging endpoints
 */

import { Request, Response } from 'express';
import {
  sendMessage,
  getThread,
  getDirectThread,
  listUserChats,
  markThreadAsRead,
  getMessage,
  getThreadParticipants,
  SendMessageParams,
} from './messageService';

/**
 * Send a new message
 * POST /api/chat/messages
 */
export async function createMessage(req: Request, res: Response): Promise<void> {
  try {
    const { senderId, receiverId, eventId, content, parentMessageId } = req.body;

    // Validation
    if (!senderId || !content) {
      res.status(400).json({
        error: 'Missing required fields: senderId and content are required',
      });
      return;
    }

    if (!receiverId && !eventId) {
      res.status(400).json({
        error: 'Either receiverId or eventId must be provided',
      });
      return;
    }

    const params: SendMessageParams = {
      senderId,
      receiverId,
      eventId,
      content,
      parentMessageId,
    };

    const message = sendMessage(params);

    res.status(201).json({
      success: true,
      data: message,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to send message';
    res.status(500).json({
      error: errorMessage,
    });
  }
}

/**
 * Get thread messages for an event
 * GET /api/chat/threads/event/:eventId
 */
export async function getEventThread(req: Request, res: Response): Promise<void> {
  try {
    const { eventId } = req.params;

    if (!eventId) {
      res.status(400).json({
        error: 'Event ID is required',
      });
      return;
    }

    const messages = getThread(eventId);
    const participants = getThreadParticipants(eventId);

    res.status(200).json({
      success: true,
      data: {
        eventId,
        messages,
        participants,
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to retrieve thread';
    res.status(500).json({
      error: errorMessage,
    });
  }
}

/**
 * Get direct message thread between two users
 * GET /api/chat/threads/direct/:userId1/:userId2
 */
export async function getDirectMessageThread(req: Request, res: Response): Promise<void> {
  try {
    const { userId1, userId2 } = req.params;

    if (!userId1 || !userId2) {
      res.status(400).json({
        error: 'Both user IDs are required',
      });
      return;
    }

    const messages = getDirectThread(userId1, userId2);

    res.status(200).json({
      success: true,
      data: {
        messages,
        participants: [userId1, userId2],
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to retrieve thread';
    res.status(500).json({
      error: errorMessage,
    });
  }
}

/**
 * List all chats for a user
 * GET /api/chat/users/:userId/chats
 */
export async function getUserChats(req: Request, res: Response): Promise<void> {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({
        error: 'User ID is required',
      });
      return;
    }

    const chats = listUserChats(userId);

    res.status(200).json({
      success: true,
      data: chats,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to retrieve chats';
    res.status(500).json({
      error: errorMessage,
    });
  }
}

/**
 * Mark thread as read
 * PUT /api/chat/threads/:threadId/read
 */
export async function markThreadRead(req: Request, res: Response): Promise<void> {
  try {
    const { threadId } = req.params;
    const { userId } = req.body;

    if (!threadId || !userId) {
      res.status(400).json({
        error: 'Thread ID and user ID are required',
      });
      return;
    }

    markThreadAsRead(userId, threadId);

    res.status(200).json({
      success: true,
      message: 'Thread marked as read',
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to mark thread as read';
    res.status(500).json({
      error: errorMessage,
    });
  }
}

/**
 * Get a single message by ID
 * GET /api/chat/messages/:messageId
 */
export async function getMessageById(req: Request, res: Response): Promise<void> {
  try {
    const { messageId } = req.params;

    if (!messageId) {
      res.status(400).json({
        error: 'Message ID is required',
      });
      return;
    }

    const message = getMessage(messageId);

    if (!message) {
      res.status(404).json({
        error: 'Message not found',
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: message,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to retrieve message';
    res.status(500).json({
      error: errorMessage,
    });
  }
}

