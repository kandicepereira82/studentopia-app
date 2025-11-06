import { create } from "zustand";
import { ChatMessage } from "../types";

interface ChatStore {
  messages: ChatMessage[];

  // Message Actions
  sendMessage: (
    studyRoomId: string,
    userId: string,
    username: string,
    content: string
  ) => void;
  sendSystemMessage: (studyRoomId: string, content: string) => void;
  clearRoomMessages: (studyRoomId: string) => void;

  // Query Methods
  getRoomMessages: (studyRoomId: string) => ChatMessage[];
  getLatestMessages: (studyRoomId: string, count: number) => ChatMessage[];
}

const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],

  sendMessage: (studyRoomId, userId, username, content) => {
    const newMessage: ChatMessage = {
      id: Date.now().toString() + Math.random().toString(36),
      studyRoomId,
      userId,
      username,
      content: content.trim(),
      timestamp: new Date(),
      type: "text",
    };

    set((state) => ({ messages: [...state.messages, newMessage] }));
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
