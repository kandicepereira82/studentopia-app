import { create } from "zustand";
import { StudyRoom, StudyRoomParticipant, TimerMode, StudyPalAnimal } from "../types";
import { presenceService } from "../services/presenceService";

interface StudyRoomStore {
  rooms: StudyRoom[];
  currentRoomId: string | null;

  // Room Management
  createRoom: (
    hostUserId: string,
    hostUsername: string,
    roomName: string,
    isPrivate: boolean,
    invitedFriendIds?: string[]
  ) => string;
  joinRoom: (
    roomId: string,
    userId: string,
    username: string,
    animal: StudyPalAnimal
  ) => boolean;
  leaveRoom: (roomId: string, userId: string) => void;
  deleteRoom: (roomId: string, userId: string) => boolean;

  // Timer Control (Host only)
  startTimer: (roomId: string, userId: string) => boolean;
  pauseTimer: (roomId: string, userId: string) => boolean;
  stopTimer: (roomId: string, userId: string) => boolean;
  switchMode: (roomId: string, userId: string, mode: TimerMode) => boolean;
  setTimerDuration: (roomId: string, userId: string, minutes: number, seconds: number) => boolean;

  // Invitations
  inviteFriend: (roomId: string, userId: string, friendUserId: string) => boolean;
  removeInvite: (roomId: string, userId: string, friendUserId: string) => boolean;

  // Query Methods
  getRoom: (roomId: string) => StudyRoom | undefined;
  getUserRooms: (userId: string) => StudyRoom[];
  getPublicRooms: () => StudyRoom[];
  getInvitedRooms: (userId: string) => StudyRoom[];
  isUserInRoom: (roomId: string, userId: string) => boolean;
  isHost: (roomId: string, userId: string) => boolean;

  // Current Room
  setCurrentRoom: (roomId: string | null) => void;
  getCurrentRoom: () => StudyRoom | undefined;
}

const useStudyRoomStore = create<StudyRoomStore>((set, get) => ({
  rooms: [],
  currentRoomId: null,

  createRoom: (hostUserId, hostUsername, roomName, isPrivate, invitedFriendIds = []) => {
    const newRoom: StudyRoom = {
      id: Date.now().toString() + Math.random().toString(36),
      name: roomName,
      hostUserId,
      hostUsername,
      participantIds: [hostUserId],
      participants: [
        {
          userId: hostUserId,
          username: hostUsername,
          animal: "redpanda" as StudyPalAnimal,
          joinedAt: new Date(),
          isHost: true,
        },
      ],
      isPrivate,
      invitedFriendIds,
      timerRunning: false,
      timerMode: "study",
      timerMinutes: 25,
      timerSeconds: 0,
      createdAt: new Date(),
      maxParticipants: 10,
    };

    set((state) => ({ rooms: [...state.rooms, newRoom] }));

    // Update presence
    presenceService.joinStudyRoom(hostUserId, newRoom.id);

    return newRoom.id;
  },

  joinRoom: (roomId, userId, username, animal) => {
    const room = get().rooms.find((r) => r.id === roomId);
    if (!room) return false;

    // Check if room is full
    if (room.participants.length >= room.maxParticipants) {
      return false;
    }

    // Check if already in room
    if (room.participantIds.includes(userId)) {
      return true;
    }

    // Check if private room
    if (room.isPrivate && !room.invitedFriendIds.includes(userId)) {
      return false;
    }

    const newParticipant: StudyRoomParticipant = {
      userId,
      username,
      animal,
      joinedAt: new Date(),
      isHost: false,
    };

    set((state) => ({
      rooms: state.rooms.map((r) =>
        r.id === roomId
          ? {
              ...r,
              participantIds: [...r.participantIds, userId],
              participants: [...r.participants, newParticipant],
            }
          : r
      ),
    }));

    // Update presence
    presenceService.joinStudyRoom(userId, roomId);

    return true;
  },

  leaveRoom: (roomId, userId) => {
    const room = get().rooms.find((r) => r.id === roomId);
    if (!room) return;

    // If host leaves, delete the room
    if (room.hostUserId === userId) {
      set((state) => ({
        rooms: state.rooms.filter((r) => r.id !== roomId),
      }));

      // Update presence for all participants
      room.participantIds.forEach((pId) => {
        presenceService.leaveStudyRoom(pId);
      });

      return;
    }

    // Remove participant
    set((state) => ({
      rooms: state.rooms.map((r) =>
        r.id === roomId
          ? {
              ...r,
              participantIds: r.participantIds.filter((id) => id !== userId),
              participants: r.participants.filter((p) => p.userId !== userId),
            }
          : r
      ),
    }));

    // Update presence
    presenceService.leaveStudyRoom(userId);

    // Clear current room if leaving current room
    if (get().currentRoomId === roomId) {
      set({ currentRoomId: null });
    }
  },

  deleteRoom: (roomId, userId) => {
    const room = get().rooms.find((r) => r.id === roomId);
    if (!room || room.hostUserId !== userId) return false;

    set((state) => ({
      rooms: state.rooms.filter((r) => r.id !== roomId),
    }));

    // Update presence for all participants
    room.participantIds.forEach((pId) => {
      presenceService.leaveStudyRoom(pId);
    });

    return true;
  },

  startTimer: (roomId, userId) => {
    const room = get().rooms.find((r) => r.id === roomId);
    if (!room || room.hostUserId !== userId) return false;

    set((state) => ({
      rooms: state.rooms.map((r) =>
        r.id === roomId
          ? { ...r, timerRunning: true, timerStartedAt: new Date() }
          : r
      ),
    }));

    return true;
  },

  pauseTimer: (roomId, userId) => {
    const room = get().rooms.find((r) => r.id === roomId);
    if (!room || room.hostUserId !== userId) return false;

    set((state) => ({
      rooms: state.rooms.map((r) =>
        r.id === roomId ? { ...r, timerRunning: false } : r
      ),
    }));

    return true;
  },

  stopTimer: (roomId, userId) => {
    const room = get().rooms.find((r) => r.id === roomId);
    if (!room || room.hostUserId !== userId) return false;

    const duration = room.timerMode === "study" ? 25 : 5;

    set((state) => ({
      rooms: state.rooms.map((r) =>
        r.id === roomId
          ? {
              ...r,
              timerRunning: false,
              timerMinutes: duration,
              timerSeconds: 0,
              timerStartedAt: undefined,
            }
          : r
      ),
    }));

    return true;
  },

  switchMode: (roomId, userId, mode) => {
    const room = get().rooms.find((r) => r.id === roomId);
    if (!room || room.hostUserId !== userId) return false;

    const duration = mode === "study" ? 25 : 5;

    set((state) => ({
      rooms: state.rooms.map((r) =>
        r.id === roomId
          ? {
              ...r,
              timerMode: mode,
              timerMinutes: duration,
              timerSeconds: 0,
              timerRunning: false,
            }
          : r
      ),
    }));

    return true;
  },

  setTimerDuration: (roomId, userId, minutes, seconds) => {
    const room = get().rooms.find((r) => r.id === roomId);
    if (!room || room.hostUserId !== userId) return false;

    set((state) => ({
      rooms: state.rooms.map((r) =>
        r.id === roomId
          ? { ...r, timerMinutes: minutes, timerSeconds: seconds }
          : r
      ),
    }));

    return true;
  },

  inviteFriend: (roomId, userId, friendUserId) => {
    const room = get().rooms.find((r) => r.id === roomId);
    if (!room || room.hostUserId !== userId) return false;
    if (room.invitedFriendIds.includes(friendUserId)) return false;

    set((state) => ({
      rooms: state.rooms.map((r) =>
        r.id === roomId
          ? {
              ...r,
              invitedFriendIds: [...r.invitedFriendIds, friendUserId],
            }
          : r
      ),
    }));

    return true;
  },

  removeInvite: (roomId, userId, friendUserId) => {
    const room = get().rooms.find((r) => r.id === roomId);
    if (!room || room.hostUserId !== userId) return false;

    set((state) => ({
      rooms: state.rooms.map((r) =>
        r.id === roomId
          ? {
              ...r,
              invitedFriendIds: r.invitedFriendIds.filter((id) => id !== friendUserId),
            }
          : r
      ),
    }));

    return true;
  },

  getRoom: (roomId) => {
    return get().rooms.find((r) => r.id === roomId);
  },

  getUserRooms: (userId) => {
    return get().rooms.filter((r) => r.participantIds.includes(userId));
  },

  getPublicRooms: () => {
    return get().rooms.filter((r) => !r.isPrivate);
  },

  getInvitedRooms: (userId) => {
    return get().rooms.filter((r) => r.invitedFriendIds.includes(userId));
  },

  isUserInRoom: (roomId, userId) => {
    const room = get().rooms.find((r) => r.id === roomId);
    return room ? room.participantIds.includes(userId) : false;
  },

  isHost: (roomId, userId) => {
    const room = get().rooms.find((r) => r.id === roomId);
    return room ? room.hostUserId === userId : false;
  },

  setCurrentRoom: (roomId) => {
    set({ currentRoomId: roomId });
  },

  getCurrentRoom: () => {
    const { currentRoomId, rooms } = get();
    if (!currentRoomId) return undefined;
    return rooms.find((r) => r.id === currentRoomId);
  },
}));

export default useStudyRoomStore;
