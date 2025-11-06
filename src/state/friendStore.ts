import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Friend } from "../types";

interface FriendStore {
  friends: Friend[];

  // Friend Request Actions
  sendFriendRequest: (
    userId: string,
    friendUserId: string,
    friendUsername: string,
    friendEmail: string | undefined,
    friendAnimal: string,
    friendTheme: string
  ) => void;
  acceptFriendRequest: (friendId: string, userId: string) => boolean;
  rejectFriendRequest: (friendId: string, userId: string) => boolean;
  removeFriend: (friendId: string, userId: string) => boolean;

  // Query Methods
  getFriends: (userId: string) => Friend[];
  getPendingRequests: (userId: string) => Friend[];
  getSentRequests: (userId: string) => Friend[];
  isFriend: (userId: string, friendUserId: string) => boolean;
  hasPendingRequest: (userId: string, friendUserId: string) => boolean;

  // Search
  searchFriends: (userId: string, query: string) => Friend[];
}

const useFriendStore = create<FriendStore>()(
  persist(
    (set, get) => ({
      friends: [],

      sendFriendRequest: (userId, friendUserId, friendUsername, friendEmail, friendAnimal, friendTheme) => {
        // Check if already friends or request exists
        const existing = get().friends.find(
          (f) =>
            (f.userId === userId && f.friendUserId === friendUserId) ||
            (f.userId === friendUserId && f.friendUserId === userId)
        );

        if (existing) {
          return; // Already exists
        }

        const newFriend: Friend = {
          id: Date.now().toString() + Math.random().toString(36),
          userId,
          friendUserId,
          friendUsername,
          friendEmail,
          friendAnimal: friendAnimal as any,
          friendTheme: friendTheme as any,
          status: "pending",
          requestedBy: userId,
          createdAt: new Date(),
        };

        set((state) => ({ friends: [...state.friends, newFriend] }));
      },

      acceptFriendRequest: (friendId, userId) => {
        const friend = get().friends.find((f) => f.id === friendId);
        if (!friend) return false;

        // Only the recipient can accept
        if (friend.friendUserId !== userId) return false;
        if (friend.status !== "pending") return false;

        set((state) => ({
          friends: state.friends.map((f) =>
            f.id === friendId
              ? { ...f, status: "accepted" as const, acceptedAt: new Date() }
              : f
          ),
        }));

        return true;
      },

      rejectFriendRequest: (friendId, userId) => {
        const friend = get().friends.find((f) => f.id === friendId);
        if (!friend) return false;

        // Only the recipient can reject
        if (friend.friendUserId !== userId) return false;
        if (friend.status !== "pending") return false;

        set((state) => ({
          friends: state.friends.map((f) =>
            f.id === friendId ? { ...f, status: "rejected" as const } : f
          ),
        }));

        return true;
      },

      removeFriend: (friendId, userId) => {
        const friend = get().friends.find((f) => f.id === friendId);
        if (!friend) return false;

        // Both users can remove the friendship
        if (friend.userId !== userId && friend.friendUserId !== userId) {
          return false;
        }

        set((state) => ({
          friends: state.friends.filter((f) => f.id !== friendId),
        }));

        return true;
      },

      getFriends: (userId) => {
        return get().friends.filter(
          (f) =>
            f.status === "accepted" &&
            (f.userId === userId || f.friendUserId === userId)
        );
      },

      getPendingRequests: (userId) => {
        return get().friends.filter(
          (f) =>
            f.status === "pending" &&
            f.friendUserId === userId &&
            f.requestedBy !== userId
        );
      },

      getSentRequests: (userId) => {
        return get().friends.filter(
          (f) =>
            f.status === "pending" &&
            f.requestedBy === userId
        );
      },

      isFriend: (userId, friendUserId) => {
        return get().friends.some(
          (f) =>
            f.status === "accepted" &&
            ((f.userId === userId && f.friendUserId === friendUserId) ||
              (f.userId === friendUserId && f.friendUserId === userId))
        );
      },

      hasPendingRequest: (userId, friendUserId) => {
        return get().friends.some(
          (f) =>
            f.status === "pending" &&
            ((f.userId === userId && f.friendUserId === friendUserId) ||
              (f.userId === friendUserId && f.friendUserId === userId))
        );
      },

      searchFriends: (userId, query) => {
        const lowerQuery = query.toLowerCase();
        return get()
          .getFriends(userId)
          .filter((f) =>
            f.friendUsername.toLowerCase().includes(lowerQuery) ||
            f.friendEmail?.toLowerCase().includes(lowerQuery)
          );
      },
    }),
    {
      name: "friend-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useFriendStore;
