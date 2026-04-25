import React, { useState, useEffect, useRef } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import {
  createOrGetChat,
  sendMessage,
  listenToMessages,
} from "../../services/chatService";
import type { Message } from "../../services/chatService";
import "./Chat.scss";

interface ChatProps {
  buyerId: string;
  sellerId: string;
  ticketId: string;
}

const Chat: React.FC<ChatProps> = ({ buyerId, sellerId, ticketId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [chatId, setChatId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(auth.currentUser);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribeAuth();
  }, []);

  // Initialize chat once auth is ready
  useEffect(() => {
    const initializeChat = async () => {
      if (!currentUser) return;

      try {
        const id = await createOrGetChat(buyerId, sellerId, ticketId);
        setChatId(id);
      } catch (error) {
        console.error("Error initializing chat:", error);
      }
    };

    initializeChat();
  }, [buyerId, sellerId, ticketId, currentUser]);

  // Listen to messages
  useEffect(() => {
    if (!chatId) return;

    const unsubscribe = listenToMessages(chatId, (msgs) => {
      setMessages(msgs);
      setLoading(false);
    });

    return unsubscribe;
  }, [chatId]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !chatId || !currentUser) return;

    const receiverId = currentUser.uid === buyerId ? sellerId : buyerId;

    try {
      await sendMessage(chatId, currentUser.uid, receiverId, newMessage.trim());
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (!currentUser) {
    return <div className="chat-container">Please log in to chat.</div>;
  }

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {loading ? (
          <div className="loading">Loading messages...</div>
        ) : messages.length === 0 ? (
          <div className="empty-chat">No messages yet. Start the conversation!</div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`message ${
                message.senderId === currentUser.uid ? "sent" : "received"
              }`}
            >
              <div className="message-text">{message.text}</div>
              <div className="message-time">{formatTime(message.createdAt)}</div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          disabled={!chatId}
        />
        <button type="submit" disabled={!newMessage.trim() || !chatId}>
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;