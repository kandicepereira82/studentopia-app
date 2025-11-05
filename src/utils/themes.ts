import { ThemeColor } from "../types";

export interface ThemeConfig {
  id: ThemeColor;
  name: string;
  description: string;
  // Background gradients for screens
  backgroundGradient: [string, string, string?];
  // Card/component backgrounds
  cardBackground: string;
  cardBackgroundDark: string;
  // Primary accent color
  primary: string;
  primaryDark: string;
  // Secondary accent
  secondary: string;
  secondaryDark: string;
  // Text colors
  textPrimary: string;
  textSecondary: string;
  // Tab bar
  tabBarBackground: string;
  tabBarActive: string;
  tabBarInactive: string;
  // Progress bars
  progressGradient: [string, string];
  // Icons and accents
  accentColor: string;
  // Emoji representation
  emoji: string;
}

export const THEMES: Record<ThemeColor, ThemeConfig> = {
  nature: {
    id: "nature",
    name: "Nature",
    description: "Light greens, moss, and warm beige",
    backgroundGradient: ["#F5F9F3", "#E8F4E5", "#DFF0DB"],
    cardBackground: "#FFFFFF",
    cardBackgroundDark: "#6B8E6F",
    primary: "#7FA882",
    primaryDark: "#6B8E6F",
    secondary: "#A8C9A4",
    secondaryDark: "#8AB186",
    textPrimary: "#2D3E2F",
    textSecondary: "#4A6B4D",
    tabBarBackground: "#F5F9F3",
    tabBarActive: "#7FA882",
    tabBarInactive: "#A8C9A4",
    progressGradient: ["#A8C9A4", "#7FA882"],
    accentColor: "#9ABF9D",
    emoji: "🌿",
  },
  ocean: {
    id: "ocean",
    name: "Ocean",
    description: "Gentle turquoise, seafoam, and pale sand",
    backgroundGradient: ["#F0F9FA", "#E1F4F6", "#D4EEF2"],
    cardBackground: "#FFFFFF",
    cardBackgroundDark: "#6B9FAA",
    primary: "#7BB8C4",
    primaryDark: "#6B9FAA",
    secondary: "#A0D4DB",
    secondaryDark: "#8AC2CA",
    textPrimary: "#2A4D54",
    textSecondary: "#3D6A73",
    tabBarBackground: "#F0F9FA",
    tabBarActive: "#7BB8C4",
    tabBarInactive: "#A0D4DB",
    progressGradient: ["#A0D4DB", "#7BB8C4"],
    accentColor: "#8DCBD5",
    emoji: "🌊",
  },
  sunset: {
    id: "sunset",
    name: "Sunset",
    description: "Coral, peach, and soft violet",
    backgroundGradient: ["#FFF6F3", "#FFE8E1", "#FFD9CF"],
    cardBackground: "#FFFFFF",
    cardBackgroundDark: "#C48A7E",
    primary: "#E8A598",
    primaryDark: "#C48A7E",
    secondary: "#F4C4B7",
    secondaryDark: "#DDA897",
    textPrimary: "#5D3A32",
    textSecondary: "#7A5349",
    tabBarBackground: "#FFF6F3",
    tabBarActive: "#E8A598",
    tabBarInactive: "#F4C4B7",
    progressGradient: ["#F4C4B7", "#E8A598"],
    accentColor: "#EFB5A8",
    emoji: "🌅",
  },
  galaxy: {
    id: "galaxy",
    name: "Galaxy",
    description: "Soft indigo, lavender, and muted cosmic blues",
    backgroundGradient: ["#F5F4FA", "#EAE7F5", "#DFD9F0"],
    cardBackground: "#FFFFFF",
    cardBackgroundDark: "#8178A3",
    primary: "#9B92C0",
    primaryDark: "#8178A3",
    secondary: "#B8AFD8",
    secondaryDark: "#A399C5",
    textPrimary: "#362E4A",
    textSecondary: "#4D4465",
    tabBarBackground: "#F5F4FA",
    tabBarActive: "#9B92C0",
    tabBarInactive: "#B8AFD8",
    progressGradient: ["#B8AFD8", "#9B92C0"],
    accentColor: "#AAA1CC",
    emoji: "🌌",
  },
  rainbow: {
    id: "rainbow",
    name: "Rainbow",
    description: "Soft pastels with gentle spectrum",
    backgroundGradient: ["#FFFEF7", "#FFF9E8", "#FFF3D9"],
    cardBackground: "#FFFFFF",
    cardBackgroundDark: "#D4B896",
    primary: "#F0D4A3",
    primaryDark: "#D4B896",
    secondary: "#FFE4B8",
    secondaryDark: "#EBCC9F",
    textPrimary: "#5A4A36",
    textSecondary: "#75603E",
    tabBarBackground: "#FFFEF7",
    tabBarActive: "#F0D4A3",
    tabBarInactive: "#FFE4B8",
    progressGradient: ["#FFE4B8", "#F0D4A3"],
    accentColor: "#F5DCAD",
    emoji: "🌈",
  },
  forest: {
    id: "forest",
    name: "Forest",
    description: "Muted emerald, fern, and soft bark tones",
    backgroundGradient: ["#F4F8F4", "#E6F1E7", "#D8E8D9"],
    cardBackground: "#FFFFFF",
    cardBackgroundDark: "#6B8269",
    primary: "#7A9B77",
    primaryDark: "#6B8269",
    secondary: "#99B896",
    secondaryDark: "#85A582",
    textPrimary: "#2D3E2C",
    textSecondary: "#3F5A3D",
    tabBarBackground: "#F4F8F4",
    tabBarActive: "#7A9B77",
    tabBarInactive: "#99B896",
    progressGradient: ["#99B896", "#7A9B77"],
    accentColor: "#8AAB87",
    emoji: "🌲",
  },
  desert: {
    id: "desert",
    name: "Desert",
    description: "Pale sand, warm amber, and dusty rose",
    backgroundGradient: ["#FFF9F5", "#FFEEE1", "#FFE3CE"],
    cardBackground: "#FFFFFF",
    cardBackgroundDark: "#C4A088",
    primary: "#D8B39C",
    primaryDark: "#C4A088",
    secondary: "#EDD0BA",
    secondaryDark: "#D6BBA3",
    textPrimary: "#5A4638",
    textSecondary: "#70594A",
    tabBarBackground: "#FFF9F5",
    tabBarActive: "#D8B39C",
    tabBarInactive: "#EDD0BA",
    progressGradient: ["#EDD0BA", "#D8B39C"],
    accentColor: "#E3C2AB",
    emoji: "🏜️",
  },
  arctic: {
    id: "arctic",
    name: "Arctic",
    description: "Icy blue, mist white, and soft grey",
    backgroundGradient: ["#F7FAFA", "#EAEEF4", "#DBE3EE"],
    cardBackground: "#FFFFFF",
    cardBackgroundDark: "#8FA4B8",
    primary: "#A9BECF",
    primaryDark: "#8FA4B8",
    secondary: "#C4D5E3",
    secondaryDark: "#AFBFCF",
    textPrimary: "#374A5A",
    textSecondary: "#4A5F6F",
    tabBarBackground: "#F7FAFA",
    tabBarActive: "#A9BECF",
    tabBarInactive: "#C4D5E3",
    progressGradient: ["#C4D5E3", "#A9BECF"],
    accentColor: "#B7CAD9",
    emoji: "❄️",
  },
  autumn: {
    id: "autumn",
    name: "Autumn",
    description: "Warm gold, rust, and muted brown",
    backgroundGradient: ["#FFF8F0", "#FFEEDE", "#FFE3CB"],
    cardBackground: "#FFFFFF",
    cardBackgroundDark: "#B88A6F",
    primary: "#D4A373",
    primaryDark: "#B88A6F",
    secondary: "#E8C29B",
    secondaryDark: "#CDAB85",
    textPrimary: "#4D3728",
    textSecondary: "#634838",
    tabBarBackground: "#FFF8F0",
    tabBarActive: "#D4A373",
    tabBarInactive: "#E8C29B",
    progressGradient: ["#E8C29B", "#D4A373"],
    accentColor: "#DFB38A",
    emoji: "🍂",
  },
  cherry: {
    id: "cherry",
    name: "Cherry Blossom",
    description: "Pastel pinks and cream whites",
    backgroundGradient: ["#FFF8FA", "#FFEEF5", "#FFE4F0"],
    cardBackground: "#FFFFFF",
    cardBackgroundDark: "#D4A3B8",
    primary: "#F0B8CF",
    primaryDark: "#D4A3B8",
    secondary: "#FFD9E8",
    secondaryDark: "#EBC2D6",
    textPrimary: "#5A3A4A",
    textSecondary: "#724F5F",
    tabBarBackground: "#FFF8FA",
    tabBarActive: "#F0B8CF",
    tabBarInactive: "#FFD9E8",
    progressGradient: ["#FFD9E8", "#F0B8CF"],
    accentColor: "#F5C9DC",
    emoji: "🌸",
  },
};

export const getTheme = (themeColor?: ThemeColor): ThemeConfig => {
  return THEMES[themeColor || "nature"];
};
