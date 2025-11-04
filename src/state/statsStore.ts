import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserStats, Achievement } from "../types";

interface StatsStore {
  stats: UserStats | null;
  initStats: (userId: string) => void;
  incrementTasksCompleted: () => void;
  updateStreak: () => void;
  addStudyMinutes: (minutes: number) => void;
  unlockAchievement: (achievement: Achievement) => void;
  resetStats: () => void;
}

const useStatsStore = create<StatsStore>()(
  persist(
    (set, get) => ({
      stats: null,
      initStats: (userId: string) =>
        set({
          stats: {
            userId,
            totalTasksCompleted: 0,
            currentStreak: 0,
            longestStreak: 0,
            totalStudyMinutes: 0,
            achievements: [],
          },
        }),
      incrementTasksCompleted: () =>
        set((state) => {
          if (!state.stats) return state;
          const newTotal = state.stats.totalTasksCompleted + 1;

          // Check for achievements
          const achievements = [...state.stats.achievements];

          if (newTotal === 1 && !achievements.find(a => a.id === "first-task")) {
            achievements.push({
              id: "first-task",
              name: "Getting Started",
              description: "Complete your first task",
              icon: "star",
              unlockedAt: new Date(),
            });
          }

          if (newTotal === 10 && !achievements.find(a => a.id === "ten-tasks")) {
            achievements.push({
              id: "ten-tasks",
              name: "Task Master",
              description: "Complete 10 tasks",
              icon: "trophy",
              unlockedAt: new Date(),
            });
          }

          return {
            stats: {
              ...state.stats,
              totalTasksCompleted: newTotal,
              achievements,
            },
          };
        }),
      updateStreak: () =>
        set((state) => {
          if (!state.stats) return state;
          const newStreak = state.stats.currentStreak + 1;
          const longestStreak = Math.max(newStreak, state.stats.longestStreak);

          return {
            stats: {
              ...state.stats,
              currentStreak: newStreak,
              longestStreak,
            },
          };
        }),
      addStudyMinutes: (minutes: number) =>
        set((state) => {
          if (!state.stats) return state;
          return {
            stats: {
              ...state.stats,
              totalStudyMinutes: state.stats.totalStudyMinutes + minutes,
            },
          };
        }),
      unlockAchievement: (achievement: Achievement) =>
        set((state) => {
          if (!state.stats) return state;
          if (state.stats.achievements.find(a => a.id === achievement.id)) {
            return state;
          }
          return {
            stats: {
              ...state.stats,
              achievements: [...state.stats.achievements, {
                ...achievement,
                unlockedAt: new Date(),
              }],
            },
          };
        }),
      resetStats: () => set({ stats: null }),
    }),
    {
      name: "stats-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useStatsStore;
