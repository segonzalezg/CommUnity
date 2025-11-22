# Messaging Service

This service handles all messaging functionality for the CommUnity platform, including message sending, retrieval, and threading logic.

## Features

- **Message Sending**: Send messages between users or within event threads
- **Thread Management**: Organize conversations by event and participants
- **Chat Listing**: List all chats for a user with unread counts
- **Read Receipts**: Mark messages as read
- **WebSocket Ready**: Architecture prepared for future WebSocket implementation

## Usage

### Integration with Express App

```typescript
import express from 'express';
import chatRoutes from './services/messaging/chatRoutes';

const app = express();
app.use(express.json());

// Mount chat routes
app.use('/api/chat', chatRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### API Endpoints

#### Send Message
```
POST /api/chat/messages
Body: {
  senderId: string;
  receiverId?: string;
  eventId?: string;
  content: string;
  parentMessageId?: string;
}
```

#### Get Event Thread
```
GET /api/chat/threads/event/:eventId
```

#### Get Direct Message Thread
```
GET /api/chat/threads/direct/:userId1/:userId2
```

#### List User Chats
```
GET /api/chat/users/:userId/chats
```

#### Mark Thread as Read
```
PUT /api/chat/threads/:threadId/read
Body: {
  userId: string;
}
```

#### Get Message by ID
```
GET /api/chat/messages/:messageId
```

## Data Structure

Messages are organized into threads:
- **Event Threads**: All messages for a specific event
- **Direct Threads**: Messages between two specific users

Each thread maintains:
- Ordered list of messages
- Participant list
- Unread count per user
- Last message timestamp

## Future Enhancements

- WebSocket integration for real-time messaging
- Typing indicators
- Message editing and deletion
- File attachments
- Message search
- Database persistence

