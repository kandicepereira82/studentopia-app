/**
 * Custom hooks for common Zustand state selections
 * These prevent unnecessary re-renders by memoizing selector results
 */

import useUserStore from "../state/userStore";
import useTaskStore from "../state/taskStore";
import useTimerStore from "../state/timerStore";
import useGroupStore from "../state/groupStore";
import useConnectivityStore from "../state/connectivityStore";

/**
 * User state selectors
 */
export const useCurrentUser = () => useUserStore((s) => s.user);
export const useUserLanguage = () => useUserStore((s) => s.user?.language);
export const useUserTheme = () => useUserStore((s) => s.user?.themeColor);
export const useUserRole = () => useUserStore((s) => s.user?.role);
export const useUserStudyPal = () => useUserStore((s) => s.user?.studyPalConfig);
export const useNotificationsEnabled = () =>
  useUserStore((s) => s.user?.notificationEnabled);

/**
 * Task state selectors
 */
export const useAllTasks = () => useTaskStore((s) => s.tasks);
export const usePendingTasks = () =>
  useTaskStore((s) => s.tasks.filter((t) => t.status === "pending"));
export const useCompletedTasks = () =>
  useTaskStore((s) => s.tasks.filter((t) => t.status === "completed"));
export const useTasksByCategory = (category: string) =>
  useTaskStore((s) => s.tasks.filter((t) => t.category === category));

/**
 * Timer state selectors
 */
export const useTimerTime = () => ({
  minutes: useTimerStore((s) => s.minutes),
  seconds: useTimerStore((s) => s.seconds),
});
export const useIsTimerRunning = () => useTimerStore((s) => s.isRunning);
export const useTimerMode = () => useTimerStore((s) => s.mode);

/**
 * Group state selectors
 */
export const useAllGroups = () => useGroupStore((s) => s.groups);
export const useUserGroups = (userId: string) =>
  useGroupStore((s) =>
    s.groups.filter(
      (g) => g.teacherId === userId || g.studentIds.includes(userId)
    )
  );

/**
 * Connectivity state selectors
 */
export const useIsOnline = () => useConnectivityStore((s) => s.isOnline);
export const useIsSyncing = () => useConnectivityStore((s) => s.isSyncing);
export const usePendingActionCount = () =>
  useConnectivityStore((s) => s.pendingActions);
export const useOfflineMessage = () =>
  useConnectivityStore((s) => s.offlineMessage);
