/**
 * Messaging Service
 * Business logic for messaging system
 */

import { Message, MessageType } from '../../../src/models/Message';
import { messages, generateId } from '../data/dataStore';

export class MessagingService {
  // Get all messages for a user
  getUserMessages(userId: string): Message[] {
    return messages.filter(
      msg => msg.senderId === userId || msg.recipientId === userId
    );
  }

  // Get conversation between two users
  getConversation(userId1: string, userId2: string): Message[] {
    return messages
      .filter(
        msg =>
          (msg.senderId === userId1 && msg.recipientId === userId2) ||
          (msg.senderId === userId2 && msg.recipientId === userId1)
      )
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  // Get messages for an event
  getEventMessages(eventId: string): Message[] {
    return messages
      .filter(msg => msg.eventId === eventId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  // Get messages for an organization
  getOrganizationMessages(organizationId: string): Message[] {
    return messages
      .filter(msg => msg.organizationId === organizationId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  // Send direct message
  sendDirectMessage(
    senderId: string,
    recipientId: string,
    content: string
  ): Message {
    const message: Message = {
      id: generateId('msg'),
      content,
      messageType: MessageType.DIRECT,
      isRead: false,
      isEdited: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      senderId,
      recipientId,
    };
    messages.push(message);
    return message;
  }

  // Send event message
  sendEventMessage(
    senderId: string,
    eventId: string,
    content: string
  ): Message {
    const message: Message = {
      id: generateId('msg'),
      content,
      messageType: MessageType.EVENT,
      isRead: false,
      isEdited: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      senderId,
      eventId,
    };
    messages.push(message);
    return message;
  }

  // Send organization message
  sendOrganizationMessage(
    senderId: string,
    organizationId: string,
    content: string,
    messageType: MessageType = MessageType.ORGANIZATION
  ): Message {
    const message: Message = {
      id: generateId('msg'),
      content,
      messageType,
      isRead: false,
      isEdited: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      senderId,
      organizationId,
    };
    messages.push(message);
    return message;
  }

  // Reply to message
  replyToMessage(
    senderId: string,
    parentMessageId: string,
    content: string
  ): Message | null {
    const parentMessage = messages.find(msg => msg.id === parentMessageId);
    if (!parentMessage) return null;

    const message: Message = {
      id: generateId('msg'),
      content,
      messageType: parentMessage.messageType,
      isRead: false,
      isEdited: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      senderId,
      parentMessageId,
      recipientId: parentMessage.senderId,
      eventId: parentMessage.eventId,
      organizationId: parentMessage.organizationId,
    };
    messages.push(message);
    return message;
  }

  // Mark message as read
  markAsRead(messageId: string, userId: string): Message | null {
    const message = messages.find(msg => msg.id === messageId);
    if (!message || message.recipientId !== userId) return null;

    message.isRead = true;
    message.readAt = new Date();
    return message;
  }

  // Mark all messages as read for a user
  markAllAsRead(userId: string): number {
    let count = 0;
    messages.forEach(msg => {
      if (msg.recipientId === userId && !msg.isRead) {
        msg.isRead = true;
        msg.readAt = new Date();
        count++;
      }
    });
    return count;
  }

  // Edit message
  editMessage(messageId: string, userId: string, newContent: string): Message | null {
    const message = messages.find(msg => msg.id === messageId);
    if (!message || message.senderId !== userId) return null;

    message.content = newContent;
    message.isEdited = true;
    message.updatedAt = new Date();
    return message;
  }

  // Delete message
  deleteMessage(messageId: string, userId: string): boolean {
    const messageIndex = messages.findIndex(msg => msg.id === messageId);
    if (messageIndex === -1) return false;

    const message = messages[messageIndex];
    // Only sender can delete
    if (message.senderId !== userId) return false;

    messages.splice(messageIndex, 1);
    return true;
  }

  // Get unread message count
  getUnreadCount(userId: string): number {
    return messages.filter(
      msg => msg.recipientId === userId && !msg.isRead
    ).length;
  }
}

