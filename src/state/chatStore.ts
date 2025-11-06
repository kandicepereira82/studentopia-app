import { create } from "zustand";
import { ChatMessage } from "../types";
import useStudyRoomStore from "./studyRoomStore";

interface ChatStore {
  messages: ChatMessage[];

  // Message Actions
  sendMessage: (
    studyRoomId: string,
    userId: string,
    username: string,
    content: string
  ) => boolean;
  sendSystemMessage: (studyRoomId: string, content: string) => void;
  clearRoomMessages: (studyRoomId: string) => void;

  // Query Methods
  getRoomMessages: (studyRoomId: string) => ChatMessage[];
  getLatestMessages: (studyRoomId: string, count: number) => ChatMessage[];
}

// Simple content sanitization to prevent XSS
const sanitizeContent = (content: string): string => {
  return content
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
};

const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],

  sendMessage: (studyRoomId, userId, username, content) => {
    // SECURITY: Validate user is in the room
    const isUserInRoom = useStudyRoomStore.getState().isUserInRoom(studyRoomId, userId);
    if (!isUserInRoom) {
      console.error("Permission denied: User is not a member of this room");
      return false;
    }

    // SECURITY: Validate content
    const trimmedContent = content.trim();
    if (!trimmedContent || trimmedContent.length === 0) {
      return false;
    }

    // SECURITY: Content length limit (prevent abuse)
    if (trimmedContent.length > 1000) {
      console.error("Message too long: Maximum 1000 characters");
      return false;
    }

    // SECURITY: Sanitize content to prevent XSS
    const sanitizedContent = sanitizeContent(trimmedContent);

    const newMessage: ChatMessage = {
      id: Date.now().toString() + Math.random().toString(36),
      studyRoomId,
      userId,
      username,
      content: sanitizedContent,
      timestamp: new Date(),
      type: "text",
    };

    set((state) => ({ messages: [...state.messages, newMessage] }));
    return true;
  },

  sendSystemMessage: (studyRoomId, content) => {
    const systemMessage: ChatMessage = {
      id: Date.now().toString() + Math.random().toString(36),
      studyRoomId,
      userId: "system",
      username: "System",
      content,
      timestamp: new Date(),
      type: "system",
    };

    set((state) => ({ messages: [...state.messages, systemMessage] }));
  },

  clearRoomMessages: (studyRoomId) => {
    set((state) => ({
      messages: state.messages.filter((m) => m.studyRoomId !== studyRoomId),
    }));
  },

  getRoomMessages: (studyRoomId) => {
    return get()
      .messages.filter((m) => m.studyRoomId === studyRoomId)
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
  },

  getLatestMessages: (studyRoomId, count) => {
    return get()
      .getRoomMessages(studyRoomId)
      .slice(-count);
  },
}));

export default useChatStore;
