/**
 * Message Service - Handles message sending, retrieving, and threading logic
 * Uses in-memory storage until database integration
 */

import { Message, MessageType } from '../../../../src/models/Message';

export interface SendMessageParams {
  senderId: string;
  receiverId?: string;
  eventId?: string;
  content: string;
  parentMessageId?: string;
}

export interface MessageThread {
  eventId: string;
  messages: Message[];
  participants: string[];
  lastMessageAt: Date;
}

export interface UserChat {
  threadId: string;
  eventId?: string;
  otherParticipantId?: string;
  lastMessage?: Message;
  unreadCount: number;
  updatedAt: Date;
}

// In-memory storage
const messages: Map<string, Message> = new Map();
const threadsByEvent: Map<string, Set<string>> = new Map(); // eventId -> Set of messageIds
const threadsByParticipants: Map<string, Set<string>> = new Map(); // participantKey -> Set of messageIds
const userChats: Map<string, Map<string, UserChat>> = new Map(); // userId -> Map<threadId, UserChat>

/**
 * Generate a unique message ID
 */
function generateMessageId(): string {
  return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Generate a thread key for participants (sorted to ensure consistency)
 */
function generateParticipantKey(userId1: string, userId2: string): string {
  return [userId1, userId2].sort().join('_');
}

/**
 * Generate a thread ID
 */
function generateThreadId(eventId?: string, participantKey?: string): string {
  if (eventId) {
    return `thread_event_${eventId}`;
  }
  if (participantKey) {
    return `thread_direct_${participantKey}`;
  }
  return `thread_${Date.now()}`;
}

/**
 * Send a message
 * @param params - Message parameters
 * @returns Created message
 */
export function sendMessage(params: SendMessageParams): Message {
  const { senderId, receiverId, eventId, content, parentMessageId } = params;

  // Validate required fields
  if (!senderId || !content.trim()) {
    throw new Error('Sender ID and content are required');
  }

  // Validate that either receiverId or eventId is provided
  if (!receiverId && !eventId) {
    throw new Error('Either receiverId or eventId must be provided');
  }

  // Validate parent message exists if provided
  if (parentMessageId && !messages.has(parentMessageId)) {
    throw new Error('Parent message not found');
  }

  const now = new Date();
  const messageId = generateMessageId();

  // Determine message type
  let messageType: MessageType;
  if (eventId) {
    messageType = MessageType.EVENT;
  } else if (receiverId) {
    messageType = MessageType.DIRECT;
  } else {
    messageType = MessageType.DIRECT;
  }

  // Create message
  const message: Message = {
    id: messageId,
    content: content.trim(),
    messageType,
    isRead: false,
    isEdited: false,
    createdAt: now,
    updatedAt: now,
    senderId,
    recipientId: receiverId,
    eventId,
    parentMessageId,
  };

  // Store message
  messages.set(messageId, message);

  // Organize by event
  if (eventId) {
    if (!threadsByEvent.has(eventId)) {
      threadsByEvent.set(eventId, new Set());
    }
    threadsByEvent.get(eventId)!.add(messageId);
  }

  // Organize by participants (for direct messages)
  if (receiverId) {
    const participantKey = generateParticipantKey(senderId, receiverId);
    if (!threadsByParticipants.has(participantKey)) {
      threadsByParticipants.set(participantKey, new Set());
    }
    threadsByParticipants.get(participantKey)!.add(messageId);
  }

  // Update user chats
  const threadId = eventId 
    ? generateThreadId(eventId) 
    : generateThreadId(undefined, receiverId ? generateParticipantKey(senderId, receiverId) : undefined);

  // Update sender's chat list
  if (!userChats.has(senderId)) {
    userChats.set(senderId, new Map());
  }
  const senderChats = userChats.get(senderId)!;
  const senderChat: UserChat = senderChats.get(threadId) || {
    threadId,
    eventId,
    otherParticipantId: receiverId,
    unreadCount: 0,
    updatedAt: now,
  };
  senderChat.lastMessage = message;
  senderChat.updatedAt = now;
  senderChats.set(threadId, senderChat);

  // Update receiver's chat list (if direct message)
  if (receiverId) {
    if (!userChats.has(receiverId)) {
      userChats.set(receiverId, new Map());
    }
    const receiverChats = userChats.get(receiverId)!;
    const receiverChat: UserChat = receiverChats.get(threadId) || {
      threadId,
      eventId,
      otherParticipantId: senderId,
      unreadCount: 0,
      updatedAt: now,
    };
    receiverChat.lastMessage = message;
    receiverChat.updatedAt = now;
    receiverChat.unreadCount += 1; // Increment unread count for receiver
    receiverChats.set(threadId, receiverChat);
  }

  // If this is a reply, we could also update the parent message's replies array
  // For now, we'll handle this in getThread

  return message;
}

/**
 * Get thread messages for an event
 * @param eventId - Event ID
 * @returns Ordered array of messages in the thread
 */
export function getThread(eventId: string): Message[] {
  if (!threadsByEvent.has(eventId)) {
    return [];
  }

  const messageIds = Array.from(threadsByEvent.get(eventId)!);
  const threadMessages = messageIds
    .map(id => messages.get(id))
    .filter((msg): msg is Message => msg !== undefined)
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

  // Build reply structure
  const messageMap = new Map<string, Message>();
  const rootMessages: Message[] = [];

  // First pass: create map and identify root messages
  threadMessages.forEach(msg => {
    const messageWithReplies = { ...msg, replies: [] as Message[] };
    messageMap.set(msg.id, messageWithReplies);
    
    if (!msg.parentMessageId) {
      rootMessages.push(messageWithReplies);
    }
  });

  // Second pass: attach replies to parent messages
  threadMessages.forEach(msg => {
    if (msg.parentMessageId) {
      const parent = messageMap.get(msg.parentMessageId);
      if (parent) {
        parent.replies = parent.replies || [];
        parent.replies.push(messageMap.get(msg.id)!);
      }
    }
  });

  // Sort replies within each message
  messageMap.forEach(msg => {
    if (msg.replies && msg.replies.length > 0) {
      msg.replies.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    }
  });

  return rootMessages;
}

/**
 * Get direct message thread between two users
 * @param userId1 - First user ID
 * @param userId2 - Second user ID
 * @returns Ordered array of messages in the thread
 */
export function getDirectThread(userId1: string, userId2: string): Message[] {
  const participantKey = generateParticipantKey(userId1, userId2);
  
  if (!threadsByParticipants.has(participantKey)) {
    return [];
  }

  const messageIds = Array.from(threadsByParticipants.get(participantKey)!);
  const threadMessages = messageIds
    .map(id => messages.get(id))
    .filter((msg): msg is Message => msg !== undefined)
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

  return threadMessages;
}

/**
 * List all chats for a user
 * @param userId - User ID
 * @returns Array of user chats sorted by most recent
 */
export function listUserChats(userId: string): UserChat[] {
  if (!userChats.has(userId)) {
    return [];
  }

  const chats = Array.from(userChats.get(userId)!.values());
  
  // Sort by most recent message
  return chats.sort((a, b) => {
    const timeA = a.lastMessage?.createdAt.getTime() || a.updatedAt.getTime();
    const timeB = b.lastMessage?.createdAt.getTime() || b.updatedAt.getTime();
    return timeB - timeA;
  });
}

/**
 * Mark messages as read
 * @param userId - User ID
 * @param threadId - Thread ID
 */
export function markThreadAsRead(userId: string, threadId: string): void {
  const userChat = userChats.get(userId)?.get(threadId);
  if (!userChat) {
    return;
  }

  // Mark all messages in thread as read for this user
  const allMessages = userChat.eventId
    ? getThread(userChat.eventId)
    : userChat.otherParticipantId
    ? getDirectThread(userId, userChat.otherParticipantId)
    : [];

  allMessages.forEach(msg => {
    if (msg.recipientId === userId && !msg.isRead) {
      msg.isRead = true;
      msg.readAt = new Date();
    }
    // Also mark replies
    if (msg.replies) {
      msg.replies.forEach(reply => {
        if (reply.recipientId === userId && !reply.isRead) {
          reply.isRead = true;
          reply.readAt = new Date();
        }
      });
    }
  });

  // Reset unread count
  userChat.unreadCount = 0;
}

/**
 * Get message by ID
 */
export function getMessage(messageId: string): Message | null {
  return messages.get(messageId) || null;
}

/**
 * Get participants for an event thread
 */
export function getThreadParticipants(eventId: string): string[] {
  if (!threadsByEvent.has(eventId)) {
    return [];
  }

  const messageIds = Array.from(threadsByEvent.get(eventId)!);
  const participants = new Set<string>();

  messageIds.forEach(id => {
    const msg = messages.get(id);
    if (msg) {
      participants.add(msg.senderId);
      if (msg.recipientId) {
        participants.add(msg.recipientId);
      }
    }
  });

  return Array.from(participants);
}

/**
 * Reset mock data (for testing purposes)
 */
export function resetMockData(): void {
  messages.clear();
  threadsByEvent.clear();
  threadsByParticipants.clear();
  userChats.clear();
}

