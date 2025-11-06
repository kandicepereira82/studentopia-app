import { create } from "zustand";
import { StudyPalAnimal, ThemeColor, AgeRange } from "../types";

interface OnboardingPreferences {
  username: string;
  email: string;
  role: "student" | "teacher";
  ageRange?: AgeRange;
  studyPalName: string;
  animal: StudyPalAnimal;
  themeColor: ThemeColor;
}

interface OnboardingStore {
  preferences: OnboardingPreferences | null;
  setPreferences: (prefs: OnboardingPreferences) => void;
  clearPreferences: () => void;
}

const useOnboardingStore = create<OnboardingStore>((set) => ({
  preferences: null,
  setPreferences: (prefs) => set({ preferences: prefs }),
  clearPreferences: () => set({ preferences: null }),
}));

export default useOnboardingStore;
