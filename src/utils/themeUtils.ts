import { ThemeColor } from "../types";

/**
 * Theme configuration with colors and emoji
 */
export interface ThemeConfig {
  color: ThemeColor;
  name: string;
  colors: [string, string];
  emoji: string;
}

/**
 * All available theme configurations
 */
export const ALL_THEMES: ThemeConfig[] = [
  { color: "nature", name: "Nature", colors: ["#4CAF50", "#2E7D32"], emoji: "🌿" },
  { color: "ocean", name: "Ocean", colors: ["#0288D1", "#01579B"], emoji: "🌊" },
  { color: "galaxy", name: "Galaxy", colors: ["#5E35B1", "#311B92"], emoji: "🌌" },
  { color: "rainbow", name: "Rainbow", colors: ["#FBC02D", "#F57F17"], emoji: "🌈" },
  { color: "sunset", name: "Sunset", colors: ["#F57C00", "#E65100"], emoji: "🌅" },
  { color: "arctic", name: "Arctic", colors: ["#00796B", "#004D40"], emoji: "❄️" },
  { color: "golden", name: "Golden", colors: ["#E64A19", "#BF360C"], emoji: "✨" },
  { color: "cherry", name: "Cherry Blossom", colors: ["#C2185B", "#880E4F"], emoji: "🌸" },
];

/**
 * Get theme config by color
 */
export const getThemeConfig = (color: ThemeColor): ThemeConfig => {
  return ALL_THEMES.find((t) => t.color === color) || ALL_THEMES[0];
};

/**
 * Get theme name and emoji
 */
export const getThemeLabel = (color: ThemeColor): string => {
  const theme = getThemeConfig(color);
  return `${theme.emoji} ${theme.name}`;
};
