import { create } from "zustand";

type TimerMode = "study" | "break";

interface TimerStore {
  mode: TimerMode;
  minutes: number;
  seconds: number;
  isRunning: boolean;
  studyDuration: number;
  breakDuration: number;
  intervalId: NodeJS.Timeout | null;

  setMode: (mode: TimerMode) => void;
  setMinutes: (minutes: number) => void;
  setSeconds: (seconds: number) => void;
  setIsRunning: (isRunning: boolean) => void;
  setStudyDuration: (duration: number) => void;
  setBreakDuration: (duration: number) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
  decrementTime: () => void;
  checkAndComplete: (onComplete: () => void) => void;
}

const useTimerStore = create<TimerStore>((set, get) => ({
  mode: "study",
  minutes: 25,
  seconds: 0,
  isRunning: false,
  studyDuration: 25,
  breakDuration: 5,
  intervalId: null,

  setMode: (mode) => set({ mode }),
  setMinutes: (minutes) => set({ minutes }),
  setSeconds: (seconds) => set({ seconds }),
  setIsRunning: (isRunning) => set({ isRunning }),
  setStudyDuration: (duration) => set({ studyDuration: duration }),
  setBreakDuration: (duration) => set({ breakDuration: duration }),

  startTimer: () => {
    const state = get();

    // Clear any existing interval
    if (state.intervalId) {
      clearInterval(state.intervalId);
    }

    set({ isRunning: true });

    // Start new interval
    const id = setInterval(() => {
      const currentState = get();

      // Check if timer is complete
      if (currentState.minutes === 0 && currentState.seconds === 0) {
        get().pauseTimer();
        return;
      }

      // Decrement time
      if (currentState.seconds > 0) {
        set({ seconds: currentState.seconds - 1 });
      } else if (currentState.minutes > 0) {
        set({ minutes: currentState.minutes - 1, seconds: 59 });
      }
    }, 1000);

    set({ intervalId: id });
  },

  pauseTimer: () => {
    const state = get();
    if (state.intervalId) {
      clearInterval(state.intervalId);
    }
    set({ isRunning: false, intervalId: null });
  },

  stopTimer: () => {
    const state = get();
    if (state.intervalId) {
      clearInterval(state.intervalId);
    }
    set({
      isRunning: false,
      intervalId: null,
      minutes: state.mode === "study" ? state.studyDuration : state.breakDuration,
      seconds: 0,
    });
  },

  resetTimer: () => {
    const state = get();
    if (state.intervalId) {
      clearInterval(state.intervalId);
    }
    set({
      mode: "study",
      minutes: 25,
      seconds: 0,
      isRunning: false,
      intervalId: null,
      studyDuration: 25,
      breakDuration: 5,
    });
  },

  decrementTime: () => {
    const state = get();

    if (state.seconds > 0) {
      set({ seconds: state.seconds - 1 });
    } else if (state.minutes > 0) {
      set({ minutes: state.minutes - 1, seconds: 59 });
    }
  },

  checkAndComplete: (onComplete: () => void) => {
    const state = get();
    if (state.minutes === 0 && state.seconds === 0 && state.isRunning) {
      onComplete();
    }
  },
}));

export default useTimerStore;
