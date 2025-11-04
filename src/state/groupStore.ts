import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Group } from "../types";

interface GroupStore {
  groups: Group[];
  addGroup: (group: Omit<Group, "id" | "createdAt">) => void;
  joinGroup: (groupId: string, studentId: string) => void;
  leaveGroup: (groupId: string, studentId: string) => void;
  getGroupsByStudent: (studentId: string) => Group[];
  getGroupsByTeacher: (teacherId: string) => Group[];
}

const useGroupStore = create<GroupStore>()(
  persist(
    (set, get) => ({
      groups: [],
      addGroup: (groupData) => {
        const newGroup: Group = {
          ...groupData,
          id: Date.now().toString() + Math.random().toString(36),
          createdAt: new Date(),
        };
        set((state) => ({ groups: [...state.groups, newGroup] }));
      },
      joinGroup: (groupId, studentId) =>
        set((state) => ({
          groups: state.groups.map((group) =>
            group.id === groupId && !group.studentIds.includes(studentId)
              ? { ...group, studentIds: [...group.studentIds, studentId] }
              : group,
          ),
        })),
      leaveGroup: (groupId, studentId) =>
        set((state) => ({
          groups: state.groups.map((group) =>
            group.id === groupId
              ? {
                  ...group,
                  studentIds: group.studentIds.filter((id) => id !== studentId),
                }
              : group,
          ),
        })),
      getGroupsByStudent: (studentId: string) => {
        return get().groups.filter((group) =>
          group.studentIds.includes(studentId),
        );
      },
      getGroupsByTeacher: (teacherId: string) => {
        return get().groups.filter((group) => group.teacherId === teacherId);
      },
    }),
    {
      name: "group-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useGroupStore;
