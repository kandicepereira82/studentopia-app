import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityFeedItem, ActivityType, StudyPalAnimal } from "../types";

interface ActivityFeedStore {
  activities: ActivityFeedItem[];

  // Activity Actions
  addActivity: (
    userId: string,
    username: string,
    animal: StudyPalAnimal,
    type: ActivityType,
    description: string,
    metadata?: ActivityFeedItem["metadata"]
  ) => void;
  hideActivity: (activityId: string) => void;
  clearUserActivities: (userId: string) => void;

  // Query Methods
  getActivities: (limit?: number) => ActivityFeedItem[];
  getFriendActivities: (friendUserIds: string[], limit?: number) => ActivityFeedItem[];
  getUserActivities: (userId: string, limit?: number) => ActivityFeedItem[];
}

const useActivityFeedStore = create<ActivityFeedStore>()(
  persist(
    (set, get) => ({
      activities: [],

      addActivity: (userId, username, animal, type, description, metadata) => {
        const newActivity: ActivityFeedItem = {
          id: Date.now().toString() + Math.random().toString(36),
          userId,
          username,
          animal,
          type,
          description,
          metadata,
          timestamp: new Date(),
          isVisible: true,
        };

        set((state) => ({
          activities: [newActivity, ...state.activities].slice(0, 100), // Keep last 100 activities
        }));
      },

      hideActivity: (activityId) => {
        set((state) => ({
          activities: state.activities.map((a) =>
            a.id === activityId ? { ...a, isVisible: false } : a
          ),
        }));
      },

      clearUserActivities: (userId) => {
        set((state) => ({
          activities: state.activities.filter((a) => a.userId !== userId),
        }));
      },

      getActivities: (limit = 50) => {
        return get()
          .activities.filter((a) => a.isVisible)
          .slice(0, limit);
      },

      getFriendActivities: (friendUserIds, limit = 50) => {
        return get()
          .activities.filter((a) => a.isVisible && friendUserIds.includes(a.userId))
          .slice(0, limit);
      },

      getUserActivities: (userId, limit = 50) => {
        return get()
          .activities.filter((a) => a.isVisible && a.userId === userId)
          .slice(0, limit);
      },
    }),
    {
      name: "activity-feed-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useActivityFeedStore;
