/**
 * Messaging Routes
 * Defines all messaging-related API endpoints
 */

import { Router } from 'express';
import { MessagingController } from '../controllers/messagingController';

const router = Router();
const messagingController = new MessagingController();

router.get('/users/:userId/messages', messagingController.getUserMessages);
router.get('/users/:userId/messages/unread-count', messagingController.getUnreadCount);
router.put('/users/:userId/messages/read-all', messagingController.markAllAsRead);
router.get('/conversations/:userId1/:userId2', messagingController.getConversation);
router.get('/events/:eventId/messages', messagingController.getEventMessages);
router.get('/organizations/:organizationId/messages', messagingController.getOrganizationMessages);
router.post('/messages/direct', messagingController.sendDirectMessage);
router.post('/messages/event', messagingController.sendEventMessage);
router.post('/messages/organization', messagingController.sendOrganizationMessage);
router.post('/messages/:messageId/reply', messagingController.replyToMessage);
router.put('/messages/:messageId/read', messagingController.markAsRead);
router.put('/messages/:messageId', messagingController.editMessage);
router.delete('/messages/:messageId', messagingController.deleteMessage);

export default router;

