/**
 * Messaging Controller
 * Handles HTTP requests for messaging operations
 */

import { Request, Response } from 'express';
import { MessagingService } from '../services/messagingService';

const messagingService = new MessagingService();

export class MessagingController {
  // GET /api/users/:userId/messages
  getUserMessages = (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const messages = messagingService.getUserMessages(userId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch messages' });
    }
  };

  // GET /api/conversations/:userId1/:userId2
  getConversation = (req: Request, res: Response) => {
    try {
      const { userId1, userId2 } = req.params;
      const messages = messagingService.getConversation(userId1, userId2);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch conversation' });
    }
  };

  // GET /api/events/:eventId/messages
  getEventMessages = (req: Request, res: Response) => {
    try {
      const { eventId } = req.params;
      const messages = messagingService.getEventMessages(eventId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch event messages' });
    }
  };

  // GET /api/organizations/:organizationId/messages
  getOrganizationMessages = (req: Request, res: Response) => {
    try {
      const { organizationId } = req.params;
      const messages = messagingService.getOrganizationMessages(organizationId);
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch organization messages' });
    }
  };

  // POST /api/messages/direct
  sendDirectMessage = (req: Request, res: Response) => {
    try {
      const { senderId, recipientId, content } = req.body;

      if (!senderId || !recipientId || !content) {
        return res.status(400).json({ error: 'senderId, recipientId, and content are required' });
      }

      const message = messagingService.sendDirectMessage(senderId, recipientId, content);
      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ error: 'Failed to send message' });
    }
  };

  // POST /api/messages/event
  sendEventMessage = (req: Request, res: Response) => {
    try {
      const { senderId, eventId, content } = req.body;

      if (!senderId || !eventId || !content) {
        return res.status(400).json({ error: 'senderId, eventId, and content are required' });
      }

      const message = messagingService.sendEventMessage(senderId, eventId, content);
      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ error: 'Failed to send event message' });
    }
  };

  // POST /api/messages/organization
  sendOrganizationMessage = (req: Request, res: Response) => {
    try {
      const { senderId, organizationId, content, messageType } = req.body;

      if (!senderId || !organizationId || !content) {
        return res.status(400).json({
          error: 'senderId, organizationId, and content are required',
        });
      }

      const message = messagingService.sendOrganizationMessage(
        senderId,
        organizationId,
        content,
        messageType
      );
      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ error: 'Failed to send organization message' });
    }
  };

  // POST /api/messages/:messageId/reply
  replyToMessage = (req: Request, res: Response) => {
    try {
      const { messageId } = req.params;
      const { senderId, content } = req.body;

      if (!senderId || !content) {
        return res.status(400).json({ error: 'senderId and content are required' });
      }

      const message = messagingService.replyToMessage(senderId, messageId, content);

      if (!message) {
        return res.status(404).json({ error: 'Parent message not found' });
      }

      res.status(201).json(message);
    } catch (error) {
      res.status(500).json({ error: 'Failed to reply to message' });
    }
  };

  // PUT /api/messages/:messageId/read
  markAsRead = (req: Request, res: Response) => {
    try {
      const { messageId } = req.params;
      const { userId } = req.body;

      if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
      }

      const message = messagingService.markAsRead(messageId, userId);

      if (!message) {
        return res.status(404).json({ error: 'Message not found' });
      }

      res.json(message);
    } catch (error) {
      res.status(500).json({ error: 'Failed to mark message as read' });
    }
  };

  // PUT /api/users/:userId/messages/read-all
  markAllAsRead = (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const count = messagingService.markAllAsRead(userId);
      res.json({ count, message: `Marked ${count} messages as read` });
    } catch (error) {
      res.status(500).json({ error: 'Failed to mark all messages as read' });
    }
  };

  // PUT /api/messages/:messageId
  editMessage = (req: Request, res: Response) => {
    try {
      const { messageId } = req.params;
      const { userId, content } = req.body;

      if (!userId || !content) {
        return res.status(400).json({ error: 'userId and content are required' });
      }

      const message = messagingService.editMessage(messageId, userId, content);

      if (!message) {
        return res.status(404).json({ error: 'Message not found' });
      }

      res.json(message);
    } catch (error) {
      res.status(500).json({ error: 'Failed to edit message' });
    }
  };

  // DELETE /api/messages/:messageId
  deleteMessage = (req: Request, res: Response) => {
    try {
      const { messageId } = req.params;
      const { userId } = req.body;

      if (!userId) {
        return res.status(400).json({ error: 'userId is required' });
      }

      const deleted = messagingService.deleteMessage(messageId, userId);

      if (!deleted) {
        return res.status(404).json({ error: 'Message not found or unauthorized' });
      }

      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete message' });
    }
  };

  // GET /api/users/:userId/messages/unread-count
  getUnreadCount = (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const count = messagingService.getUnreadCount(userId);
      res.json({ count });
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch unread count' });
    }
  };
}

