/**
 * Message Model
 * Represents a message in the CommUnity platform
 */

export interface Message {
  id: string;
  content: string;
  messageType: MessageType;
  isRead: boolean;
  isEdited: boolean;
  createdAt: Date;
  updatedAt: Date;
  readAt?: Date;
  
  // Relationships
  senderId: string;
  sender?: User;
  recipientId?: string;
  recipient?: User;
  eventId?: string;
  event?: Event;
  organizationId?: string;
  organization?: Organization;
  parentMessageId?: string;
  parentMessage?: Message;
  replies?: Message[];
}

export enum MessageType {
  DIRECT = 'DIRECT',
  EVENT = 'EVENT',
  ORGANIZATION = 'ORGANIZATION',
  ANNOUNCEMENT = 'ANNOUNCEMENT',
}

