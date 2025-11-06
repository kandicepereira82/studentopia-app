import { UserPresence, UserPresenceStatus } from "../types";

/**
 * Presence Service - Simulates real-time presence tracking
 *
 * NOTE: This is a simulated service using local state and polling.
 * In production, this would use WebSocket/Firebase for real-time updates.
 *
 * For production implementation:
 * - Replace with Firebase Realtime Database or Firestore
 * - Or implement WebSocket server with Socket.io
 * - Add heartbeat mechanism for accurate online status
 */

type PresenceListener = (presences: Map<string, UserPresence>) => void;

class PresenceService {
  private presences: Map<string, UserPresence> = new Map();
  private listeners: Set<PresenceListener> = new Set();
  private currentUserId: string | null = null;
  private heartbeatInterval: NodeJS.Timeout | null = null;

  /**
   * Initialize presence service for current user
   */
  initialize(userId: string, username: string) {
    this.currentUserId = userId;
    this.updatePresence(userId, {
      userId,
      username,
      status: "online",
      lastSeen: new Date(),
    });

    // Heartbeat every 30 seconds to update lastSeen
    this.heartbeatInterval = setInterval(() => {
      if (this.currentUserId) {
        const presence = this.presences.get(this.currentUserId);
        if (presence) {
          this.updatePresence(this.currentUserId, {
            ...presence,
            lastSeen: new Date(),
          });
        }
      }
    }, 30000);
  }

  /**
   * Update user presence
   */
  updatePresence(userId: string, presence: Partial<UserPresence>) {
    const existing = this.presences.get(userId);
    const updated: UserPresence = {
      userId: existing?.userId || userId,
      username: existing?.username || "",
      status: presence.status || existing?.status || "online",
      lastSeen: presence.lastSeen || new Date(),
      currentActivity: presence.currentActivity ?? existing?.currentActivity,
      studyRoomId: presence.studyRoomId ?? existing?.studyRoomId,
      ...presence,
    };

    this.presences.set(userId, updated);
    this.notifyListeners();
  }

  /**
   * Set user status
   */
  setStatus(userId: string, status: UserPresenceStatus, activity?: string) {
    const presence = this.presences.get(userId);
    if (presence) {
      this.updatePresence(userId, {
        ...presence,
        status,
        currentActivity: activity,
        lastSeen: new Date(),
      });
    }
  }

  /**
   * Set user as studying
   */
  setStudying(userId: string, activity: string) {
    this.setStatus(userId, "studying", activity);
  }

  /**
   * Set user as on break
   */
  setOnBreak(userId: string) {
    this.setStatus(userId, "break", "Taking a break");
  }

  /**
   * Set user as online
   */
  setOnline(userId: string) {
    this.setStatus(userId, "online");
  }

  /**
   * Set user as offline
   */
  setOffline(userId: string) {
    const presence = this.presences.get(userId);
    if (presence) {
      this.updatePresence(userId, {
        ...presence,
        status: "offline",
        lastSeen: new Date(),
        currentActivity: undefined,
      });
    }
  }

  /**
   * Join a study room
   */
  joinStudyRoom(userId: string, studyRoomId: string) {
    const presence = this.presences.get(userId);
    if (presence) {
      this.updatePresence(userId, {
        ...presence,
        studyRoomId,
        status: "studying",
        currentActivity: "In a study room",
      });
    }
  }

  /**
   * Leave a study room
   */
  leaveStudyRoom(userId: string) {
    const presence = this.presences.get(userId);
    if (presence) {
      this.updatePresence(userId, {
        ...presence,
        studyRoomId: undefined,
        status: "online",
        currentActivity: undefined,
      });
    }
  }

  /**
   * Get presence for a user
   */
  getPresence(userId: string): UserPresence | undefined {
    return this.presences.get(userId);
  }

  /**
   * Get all presences
   */
  getAllPresences(): UserPresence[] {
    return Array.from(this.presences.values());
  }

  /**
   * Get online friends (accepts list of friend user IDs)
   */
  getOnlineFriends(friendUserIds: string[]): UserPresence[] {
    return friendUserIds
      .map((id) => this.presences.get(id))
      .filter((p): p is UserPresence => p !== undefined && p.status !== "offline");
  }

  /**
   * Subscribe to presence updates
   */
  subscribe(listener: PresenceListener): () => void {
    this.listeners.add(listener);

    // Immediately notify with current state
    listener(this.presences);

    // Return unsubscribe function
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * Notify all listeners
   */
  private notifyListeners() {
    this.listeners.forEach((listener) => {
      listener(this.presences);
    });
  }

  /**
   * Cleanup and disconnect
   */
  cleanup() {
    if (this.currentUserId) {
      this.setOffline(this.currentUserId);
    }

    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }

    this.listeners.clear();
    this.currentUserId = null;
  }

  /**
   * Check if user is online (within last 5 minutes)
   */
  isUserOnline(userId: string): boolean {
    const presence = this.presences.get(userId);
    if (!presence || presence.status === "offline") return false;

    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    return presence.lastSeen > fiveMinutesAgo;
  }
}

// Export singleton instance
export const presenceService = new PresenceService();
