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
    description: "Fresh greens inspired by lush forests and meadows",
    backgroundGradient: ["#F1F8F4", "#E3F2E8", "#D5EBDC"],
    cardBackground: "#FFFFFF",
    cardBackgroundDark: "#5A8F6A",
    primary: "#6BA87F",
    primaryDark: "#5A8F6A",
    secondary: "#8FBF9A",
    secondaryDark: "#7AAB88",
    textPrimary: "#2D4A35",
    textSecondary: "#4A6B56",
    tabBarBackground: "#F1F8F4",
    tabBarActive: "#6BA87F",
    tabBarInactive: "#8FBF9A",
    progressGradient: ["#8FBF9A", "#6BA87F"],
    accentColor: "#7DB38E",
    emoji: "🌿",
  },
  ocean: {
    id: "ocean",
    name: "Ocean",
    description: "Blues and turquoise inspired by ocean depths",
    backgroundGradient: ["#EBF6FA", "#D9EEF7", "#C7E6F4"],
    cardBackground: "#FFFFFF",
    cardBackgroundDark: "#3B7A99",
    primary: "#5199BC",
    primaryDark: "#3B7A99",
    secondary: "#7DB8D6",
    secondaryDark: "#63A3C4",
    textPrimary: "#1E4A5F",
    textSecondary: "#2F6581",
    tabBarBackground: "#EBF6FA",
    tabBarActive: "#5199BC",
    tabBarInactive: "#7DB8D6",
    progressGradient: ["#7DB8D6", "#5199BC"],
    accentColor: "#6AA9CA",
    emoji: "🌊",
  },
  sunset: {
    id: "sunset",
    name: "Sunset",
    description: "Warm oranges, pinks, and purples of a natural sunset",
    backgroundGradient: ["#FFF5F0", "#FFE9DF", "#FFDCCF"],
    cardBackground: "#FFFFFF",
    cardBackgroundDark: "#C97A68",
    primary: "#E59A85",
    primaryDark: "#C97A68",
    secondary: "#F5B9A6",
    secondaryDark: "#DDA38F",
    textPrimary: "#6B3A2E",
    textSecondary: "#8A5545",
    tabBarBackground: "#FFF5F0",
    tabBarActive: "#E59A85",
    tabBarInactive: "#F5B9A6",
    progressGradient: ["#F5B9A6", "#E59A85"],
    accentColor: "#EDA896",
    emoji: "🌅",
  },
  galaxy: {
    id: "galaxy",
    name: "Galaxy",
    description: "Deep indigo, purple, and cosmic blues of the galaxy",
    backgroundGradient: ["#F3F2F9", "#E7E4F3", "#DBD6ED"],
    cardBackground: "#FFFFFF",
    cardBackgroundDark: "#6B5B99",
    primary: "#8776B8",
    primaryDark: "#6B5B99",
    secondary: "#A89CD6",
    secondaryDark: "#9182C4",
    textPrimary: "#3A2D5A",
    textSecondary: "#554778",
    tabBarBackground: "#F3F2F9",
    tabBarActive: "#8776B8",
    tabBarInactive: "#A89CD6",
    progressGradient: ["#A89CD6", "#8776B8"],
    accentColor: "#988CC7",
    emoji: "🌌",
  },
  rainbow: {
    id: "rainbow",
    name: "Rainbow",
    description: "All 7 colors of the rainbow in soft harmony",
    backgroundGradient: ["#FFFBF5", "#FFF4E8", "#FFEDDB"],
    cardBackground: "#FFFFFF",
    cardBackgroundDark: "#C9A974",
    primary: "#E8C689",
    primaryDark: "#C9A974",
    secondary: "#F5D9A6",
    secondaryDark: "#DCC493",
    textPrimary: "#6B5329",
    textSecondary: "#8A6E3F",
    tabBarBackground: "#FFFBF5",
    tabBarActive: "#E8C689",
    tabBarInactive: "#F5D9A6",
    progressGradient: ["#F5D9A6", "#E8C689"],
    accentColor: "#EFD098",
    emoji: "🌈",
  },
  desert: {
    id: "desert",
    name: "Desert",
    description: "Orange, rust, and brown tones of desert landscapes",
    backgroundGradient: ["#FFF7F0", "#FFEADB", "#FFDCC6"],
    cardBackground: "#FFFFFF",
    cardBackgroundDark: "#B8845A",
    primary: "#D4A06F",
    primaryDark: "#B8845A",
    secondary: "#E8C092",
    secondaryDark: "#CEAC7E",
    textPrimary: "#5A3D22",
    textSecondary: "#78533A",
    tabBarBackground: "#FFF7F0",
    tabBarActive: "#D4A06F",
    tabBarInactive: "#E8C092",
    progressGradient: ["#E8C092", "#D4A06F"],
    accentColor: "#DFB081",
    emoji: "🏜️",
  },
  arctic: {
    id: "arctic",
    name: "Arctic",
    description: "Whites and icy blues of arctic landscapes",
    backgroundGradient: ["#F7FBFC", "#EDF5F8", "#E3EFF4"],
    cardBackground: "#FFFFFF",
    cardBackgroundDark: "#78A2B8",
    primary: "#95BAD1",
    primaryDark: "#78A2B8",
    secondary: "#B8D4E5",
    secondaryDark: "#A1C3D9",
    textPrimary: "#2F4F5F",
    textSecondary: "#4A6A7A",
    tabBarBackground: "#F7FBFC",
    tabBarActive: "#95BAD1",
    tabBarInactive: "#B8D4E5",
    progressGradient: ["#B8D4E5", "#95BAD1"],
    accentColor: "#A7C7DB",
    emoji: "❄️",
  },
  autumn: {
    id: "autumn",
    name: "Autumn",
    description: "Warm golds, rusts, and browns of autumn foliage",
    backgroundGradient: ["#FFF6ED", "#FFECD9", "#FFE1C5"],
    cardBackground: "#FFFFFF",
    cardBackgroundDark: "#B8825A",
    primary: "#D49C6B",
    primaryDark: "#B8825A",
    secondary: "#E8BC8F",
    secondaryDark: "#CEA478",
    textPrimary: "#5A3A1E",
    textSecondary: "#785139",
    tabBarBackground: "#FFF6ED",
    tabBarActive: "#D49C6B",
    tabBarInactive: "#E8BC8F",
    progressGradient: ["#E8BC8F", "#D49C6B"],
    accentColor: "#DFAC7D",
    emoji: "🍂",
  },
  cherry: {
    id: "cherry",
    name: "Cherry Blossom",
    description: "Soft pinks, whites, and touches of red from cherry blossoms",
    backgroundGradient: ["#FFF7F9", "#FFEEF4", "#FFE5EF"],
    cardBackground: "#FFFFFF",
    cardBackgroundDark: "#C98AA8",
    primary: "#E5A8C3",
    primaryDark: "#C98AA8",
    secondary: "#F5C8DC",
    secondaryDark: "#DDB1C8",
    textPrimary: "#6B3348",
    textSecondary: "#8A4E63",
    tabBarBackground: "#FFF7F9",
    tabBarActive: "#E5A8C3",
    tabBarInactive: "#F5C8DC",
    progressGradient: ["#F5C8DC", "#E5A8C3"],
    accentColor: "#EDB8D0",
    emoji: "🌸",
  },
};

export const getTheme = (themeColor?: ThemeColor): ThemeConfig => {
  return THEMES[themeColor || "nature"];
};
