# Grab My Ticket - Chat System

This document explains the real-time chat system implementation for the Grab My Ticket marketplace app.

## Overview

The chat system enables one-to-one messaging between buyers and sellers for each ticket listing. Messages are stored in Firebase Firestore with real-time updates.

## Architecture

### Firestore Schema

```
chats (collection)
├── {chatId} (document)
│   ├── participants: [buyerId, sellerId]
│   ├── ticketId: string
│   ├── lastMessage: string
│   └── timestamp: serverTimestamp
│   └── messages (subcollection)
│       └── {messageId} (document)
│           ├── senderId: string
│           ├── text: string
│           └── createdAt: serverTimestamp
```

### Chat ID Generation

Chat IDs are generated deterministically using: `{sortedParticipants[0]}_{sortedParticipants[1]}_{ticketId}`

This prevents duplicate chat threads for the same buyer-seller-ticket combination.

## Components

### ChatService (`src/services/chatService.ts`)

Provides all chat-related Firebase operations:

- `createOrGetChat()`: Creates new chat or returns existing
- `sendMessage()`: Sends a message and updates chat metadata
- `listenToMessages()`: Real-time listener for messages
- `getUserChats()`: Gets all chats for a user

### Chat Component (`src/components/Chat/`)

React component with:
- Real-time message display
- Message input form
- Auto-scroll to latest messages
- Loading and empty states

## Usage

```tsx
import Chat from './components/Chat';

// In your ticket detail page
<Chat
  buyerId="buyer123"
  sellerId="seller456"
  ticketId="ticket789"
/>
```

## Security

- Only authenticated users can access chats
- Only chat participants can read/write messages
- Messages are immutable (no edits/deletes)
- Firestore rules enforce privacy

## Performance Optimizations

- Messages limited to 100 per chat (configurable)
- Real-time listeners automatically unsubscribe on component unmount
- Efficient queries with proper indexing

## Deployment

1. Deploy Firestore rules from `firestore-rules.txt`
2. Ensure Firebase Auth is configured
3. Test with multiple users to verify real-time functionality

## Edge Cases Handled

- Empty chats
- Network delays (Firestore handles offline/online sync)
- Component unmounting (listeners cleaned up)
- Authentication state changes