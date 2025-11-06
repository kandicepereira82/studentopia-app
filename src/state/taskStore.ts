import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task, TaskCategory, TaskStatus } from "../types";

interface TaskStore {
  tasks: Task[];
  addTask: (task: Omit<Task, "id" | "createdAt" | "status">) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskStatus: (id: string) => void;
  getTasksByDate: (date: Date, userId?: string) => Task[];
  getTasksByCategory: (category: TaskCategory, userId?: string) => Task[];
  getTodayTasks: (userId?: string) => Task[];
  getWeekTasks: (userId?: string) => Task[];
  getCompletedTasksCount: (startDate: Date, endDate: Date, userId?: string) => number;
}

const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      addTask: (taskData) => {
        const newTask: Task = {
          ...taskData,
          id: Date.now().toString() + Math.random().toString(36),
          createdAt: new Date(),
          status: "pending",
        };
        set((state) => ({ tasks: [...state.tasks, newTask] }));
      },
      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...updates } : task,
          ),
        })),
      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        })),
      toggleTaskStatus: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  status: task.status === "pending" ? "completed" : "pending",
                  completedAt:
                    task.status === "pending" ? new Date() : undefined,
                }
              : task,
          ),
        })),
      getTasksByDate: (date: Date, userId?: string) => {
        const tasks = get().tasks;
        return tasks.filter((task) => {
          // Filter by userId if provided
          if (userId && task.userId !== userId) return false;

          const taskDate = new Date(task.dueDate);
          return (
            taskDate.getDate() === date.getDate() &&
            taskDate.getMonth() === date.getMonth() &&
            taskDate.getFullYear() === date.getFullYear()
          );
        });
      },
      getTasksByCategory: (category: TaskCategory, userId?: string) => {
        return get().tasks.filter((task) => {
          if (userId && task.userId !== userId) return false;
          return task.category === category;
        });
      },
      getTodayTasks: (userId?: string) => {
        const today = new Date();
        return get().getTasksByDate(today, userId);
      },
      getWeekTasks: (userId?: string) => {
        const tasks = get().tasks;
        const today = new Date();
        const weekFromNow = new Date(today);
        weekFromNow.setDate(today.getDate() + 7);

        return tasks.filter((task) => {
          // Filter by userId if provided
          if (userId && task.userId !== userId) return false;

          const taskDate = new Date(task.dueDate);
          return taskDate >= today && taskDate <= weekFromNow;
        });
      },
      getCompletedTasksCount: (startDate: Date, endDate: Date, userId?: string) => {
        const tasks = get().tasks;
        return tasks.filter((task) => {
          if (task.status !== "completed" || !task.completedAt) return false;

          // Filter by userId if provided
          if (userId && task.userId !== userId) return false;

          const completedDate = new Date(task.completedAt);
          return completedDate >= startDate && completedDate <= endDate;
        }).length;
      },
    }),
    {
      name: "task-storage",
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useTaskStore;
