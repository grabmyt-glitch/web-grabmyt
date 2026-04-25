import {
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  limit,
} from "firebase/firestore";
import { db } from "../firebase";

// Types
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  createdAt: Date;
}

export interface Chat {
  id: string;
  participants: string[];
  ticketId: string;
  lastMessage: string;
  timestamp: Date;
}

// Generate a unique chat ID based on participants and ticket
export const generateChatId = (buyerId: string, sellerId: string, ticketId: string): string => {
  const sortedParticipants = [buyerId, sellerId].sort();
  return `${sortedParticipants[0]}_${sortedParticipants[1]}_${ticketId}`;
};

// Create or get existing chat
export const createOrGetChat = async (
  buyerId: string,
  sellerId: string,
  ticketId: string
): Promise<string> => {
  const chatId = generateChatId(buyerId, sellerId, ticketId);
  const chatRef = doc(db, "chats", chatId);

  const chatSnap = await getDoc(chatRef);
  if (!chatSnap.exists()) {
    // Create new chat
    await setDoc(chatRef, {
      participants: [buyerId, sellerId],
      ticketId,
      lastMessage: "",
      timestamp: serverTimestamp(),
    });
  }

  return chatId;
};

// Send a message
export const sendMessage = async (
  chatId: string,
  senderId: string,
  receiverId: string,
  text: string
): Promise<void> => {
  const messagesRef = collection(db, "chats", chatId, "messages");

  // Add message
  await addDoc(messagesRef, {
    senderId,
    receiverId,
    text,
    createdAt: serverTimestamp(),
  });

  // Update chat's last message and timestamp
  const chatRef = doc(db, "chats", chatId);
  await updateDoc(chatRef, {
    lastMessage: text,
    timestamp: serverTimestamp(),
  });
};

// Listen to messages in real-time
export const listenToMessages = (
  chatId: string,
  callback: (messages: Message[]) => void
): (() => void) => {
  const messagesRef = collection(db, "chats", chatId, "messages");
  const q = query(messagesRef, orderBy("createdAt", "asc"), limit(100)); // Limit for performance

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const messages: Message[] = snapshot.docs.map((doc) => ({
      id: doc.id,
      senderId: doc.data().senderId,
      receiverId: doc.data().receiverId,
      text: doc.data().text,
      createdAt: doc.data().createdAt?.toDate() || new Date(),
    }));
    callback(messages);
  });

  return unsubscribe;
};

// Get all chats for a user
export const getUserChats = async (userId: string): Promise<Chat[]> => {
  const chatsRef = collection(db, "chats");
  const q = query(
    chatsRef,
    where("participants", "array-contains", userId),
    orderBy("timestamp", "desc")
  );

  const snapshot = await getDocs(q);
  const chats: Chat[] = snapshot.docs.map((doc) => ({
    id: doc.id,
    participants: doc.data().participants,
    ticketId: doc.data().ticketId,
    lastMessage: doc.data().lastMessage,
    timestamp: doc.data().timestamp?.toDate() || new Date(),
  }));

  return chats;
};