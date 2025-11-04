import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, TextInput, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import useUserStore from "../state/userStore";
import useStatsStore from "../state/statsStore";
import { useTranslation } from "../utils/translations";
import { Language, ThemeColor, StudyPalAnimal } from "../types";
import { cn } from "../utils/cn";
import StudyPal from "../components/StudyPal";

const ProfileScreen = () => {
  const user = useUserStore((s) => s.user);
  const updateLanguage = useUserStore((s) => s.updateLanguage);
  const updateThemeColor = useUserStore((s) => s.updateThemeColor);
  const updateStudyPal = useUserStore((s) => s.updateStudyPal);
  const toggleAnimations = useUserStore((s) => s.toggleAnimations);
  const toggleNotifications = useUserStore((s) => s.toggleNotifications);
  const stats = useStatsStore((s) => s.stats);

  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [showAnimalModal, setShowAnimalModal] = useState(false);
  const [studyPalName, setStudyPalName] = useState(user?.studyPalConfig.name || "Buddy");

  const { t } = useTranslation(user?.language || "en");

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "zh", name: "中文", flag: "🇨🇳" },
    { code: "ja", name: "日本語", flag: "🇯🇵" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
  ];

  const themes: { color: ThemeColor; name: string; colors: [string, string] }[] = [
    { color: "blue", name: "Blue", colors: ["#3B82F6", "#1D4ED8"] },
    { color: "purple", name: "Purple", colors: ["#A855F7", "#7C3AED"] },
    { color: "pink", name: "Pink", colors: ["#EC4899", "#DB2777"] },
    { color: "green", name: "Green", colors: ["#10B981", "#059669"] },
    { color: "orange", name: "Orange", colors: ["#F97316", "#EA580C"] },
    { color: "red", name: "Red", colors: ["#EF4444", "#DC2626"] },
  ];

  const animals: StudyPalAnimal[] = ["cat", "bunny", "bear", "dog", "fox", "panda"];

  const handleSavePalName = () => {
    if (user && studyPalName.trim()) {
      updateStudyPal(studyPalName, user.studyPalConfig.animal);
    }
  };

  if (!user) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-600 dark:text-gray-400">
            No user profile found
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 pt-4 pb-2">
          <Text className="text-3xl font-bold text-gray-800 dark:text-gray-100">
            {t("profile")}
          </Text>
        </View>

        {/* User Info */}
        <View className="px-6 py-4">
          <View className="bg-white dark:bg-gray-800 rounded-2xl p-6 items-center">
            <View className="w-24 h-24 bg-blue-100 dark:bg-blue-900 rounded-full items-center justify-center mb-4">
              <Text className="text-4xl">
                {user.username.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text className="text-2xl font-bold text-gray-800 dark:text-gray-100">
              {user.username}
            </Text>
            <Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {user.email || "student@studypal.com"}
            </Text>
          </View>
        </View>

        {/* Stats Overview */}
        <View className="px-6 py-2">
          <View className="bg-white dark:bg-gray-800 rounded-2xl p-5">
            <Text className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
              Your Stats
            </Text>
            <View className="flex-row flex-wrap gap-4">
              <View className="flex-1 min-w-[45%]">
                <Text className="text-3xl font-bold text-blue-500">
                  {stats?.totalTasksCompleted || 0}
                </Text>
                <Text className="text-sm text-gray-600 dark:text-gray-400">
                  {t("tasksCompleted")}
                </Text>
              </View>
              <View className="flex-1 min-w-[45%]">
                <Text className="text-3xl font-bold text-orange-500">
                  {stats?.currentStreak || 0}
                </Text>
                <Text className="text-sm text-gray-600 dark:text-gray-400">
                  {t("currentStreak")}
                </Text>
              </View>
              <View className="flex-1 min-w-[45%]">
                <Text className="text-3xl font-bold text-purple-500">
                  {stats?.longestStreak || 0}
                </Text>
                <Text className="text-sm text-gray-600 dark:text-gray-400">
                  Longest Streak
                </Text>
              </View>
              <View className="flex-1 min-w-[45%]">
                <Text className="text-3xl font-bold text-green-500">
                  {stats?.totalStudyMinutes || 0}
                </Text>
                <Text className="text-sm text-gray-600 dark:text-gray-400">
                  Study Minutes
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Study Pal Settings */}
        <View className="px-6 py-4">
          <Text className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">
            Study Pal
          </Text>

          <View className="bg-white dark:bg-gray-800 rounded-2xl p-5 mb-3">
            <StudyPal
              animal={user.studyPalConfig.animal}
              name={user.studyPalConfig.name}
              animationsEnabled={user.studyPalConfig.animationsEnabled}
              size={80}
            />
          </View>

          <View className="bg-white dark:bg-gray-800 rounded-2xl p-4">
            {/* Study Pal Name */}
            <View className="mb-4">
              <Text className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t("studyPalName")}
              </Text>
              <View className="flex-row gap-2">
                <TextInput
                  value={studyPalName}
                  onChangeText={setStudyPalName}
                  placeholder="Enter name"
                  placeholderTextColor="#9CA3AF"
                  className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-xl px-4 py-3"
                />
                <Pressable
                  onPress={handleSavePalName}
                  className="bg-blue-500 rounded-xl px-6 items-center justify-center"
                >
                  <Text className="text-white font-semibold">{t("save")}</Text>
                </Pressable>
              </View>
            </View>

            {/* Study Pal Animal */}
            <Pressable
              onPress={() => setShowAnimalModal(true)}
              className="flex-row items-center justify-between py-3"
            >
              <Text className="text-base text-gray-800 dark:text-gray-100">
                {t("studyPalAnimal")}
              </Text>
              <View className="flex-row items-center">
                <Text className="text-lg mr-2">
                  {user.studyPalConfig.animal === "cat" && "🐱"}
                  {user.studyPalConfig.animal === "bunny" && "🐰"}
                  {user.studyPalConfig.animal === "bear" && "🐻"}
                  {user.studyPalConfig.animal === "dog" && "🐶"}
                  {user.studyPalConfig.animal === "fox" && "🦊"}
                  {user.studyPalConfig.animal === "panda" && "🐼"}
                </Text>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </View>
            </Pressable>

            {/* Animations Toggle */}
            <View className="flex-row items-center justify-between py-3 border-t border-gray-200 dark:border-gray-700">
              <Text className="text-base text-gray-800 dark:text-gray-100">
                {t("animations")}
              </Text>
              <Pressable
                onPress={toggleAnimations}
                className={cn(
                  "w-12 h-7 rounded-full justify-center px-1",
                  user.studyPalConfig.animationsEnabled
                    ? "bg-blue-500"
                    : "bg-gray-300 dark:bg-gray-600"
                )}
              >
                <View
                  className={cn(
                    "w-5 h-5 rounded-full bg-white",
                    user.studyPalConfig.animationsEnabled && "ml-auto"
                  )}
                />
              </Pressable>
            </View>
          </View>
        </View>

        {/* Settings */}
        <View className="px-6 py-4">
          <Text className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">
            {t("settings")}
          </Text>

          <View className="bg-white dark:bg-gray-800 rounded-2xl p-4">
            {/* Language */}
            <Pressable
              onPress={() => setShowLanguageModal(true)}
              className="flex-row items-center justify-between py-3"
            >
              <Text className="text-base text-gray-800 dark:text-gray-100">
                {t("language")}
              </Text>
              <View className="flex-row items-center">
                <Text className="text-gray-600 dark:text-gray-400 mr-2">
                  {languages.find((l) => l.code === user.language)?.name || "English"}
                </Text>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </View>
            </Pressable>

            {/* Theme */}
            <Pressable
              onPress={() => setShowThemeModal(true)}
              className="flex-row items-center justify-between py-3 border-t border-gray-200 dark:border-gray-700"
            >
              <Text className="text-base text-gray-800 dark:text-gray-100">
                {t("theme")}
              </Text>
              <View className="flex-row items-center">
                <View
                  className="w-6 h-6 rounded-full mr-2"
                  style={{
                    backgroundColor: themes.find((t) => t.color === user.themeColor)
                      ?.colors[0],
                  }}
                />
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </View>
            </Pressable>

            {/* Notifications */}
            <View className="flex-row items-center justify-between py-3 border-t border-gray-200 dark:border-gray-700">
              <Text className="text-base text-gray-800 dark:text-gray-100">
                {t("notifications")}
              </Text>
              <Pressable
                onPress={toggleNotifications}
                className={cn(
                  "w-12 h-7 rounded-full justify-center px-1",
                  user.notificationEnabled
                    ? "bg-blue-500"
                    : "bg-gray-300 dark:bg-gray-600"
                )}
              >
                <View
                  className={cn(
                    "w-5 h-5 rounded-full bg-white",
                    user.notificationEnabled && "ml-auto"
                  )}
                />
              </Pressable>
            </View>
          </View>
        </View>

        <View className="h-8" />
      </ScrollView>

      {/* Language Modal */}
      <Modal
        visible={showLanguageModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowLanguageModal(false)}
      >
        <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
          <View className="px-6 py-4 flex-row items-center justify-between border-b border-gray-200 dark:border-gray-700">
            <Text className="text-xl font-bold text-gray-800 dark:text-gray-100">
              {t("language")}
            </Text>
            <Pressable onPress={() => setShowLanguageModal(false)}>
              <Ionicons name="close" size={28} color="#6B7280" />
            </Pressable>
          </View>
          <ScrollView className="flex-1 px-6 py-4">
            {languages.map((lang) => (
              <Pressable
                key={lang.code}
                onPress={() => {
                  updateLanguage(lang.code);
                  setShowLanguageModal(false);
                }}
                className={cn(
                  "flex-row items-center justify-between py-4 px-4 rounded-xl mb-2",
                  user.language === lang.code
                    ? "bg-blue-100 dark:bg-blue-900"
                    : "bg-white dark:bg-gray-800"
                )}
              >
                <View className="flex-row items-center">
                  <Text className="text-2xl mr-3">{lang.flag}</Text>
                  <Text className="text-base font-medium text-gray-800 dark:text-gray-100">
                    {lang.name}
                  </Text>
                </View>
                {user.language === lang.code && (
                  <Ionicons name="checkmark-circle" size={24} color="#3B82F6" />
                )}
              </Pressable>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Theme Modal */}
      <Modal
        visible={showThemeModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowThemeModal(false)}
      >
        <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
          <View className="px-6 py-4 flex-row items-center justify-between border-b border-gray-200 dark:border-gray-700">
            <Text className="text-xl font-bold text-gray-800 dark:text-gray-100">
              {t("theme")}
            </Text>
            <Pressable onPress={() => setShowThemeModal(false)}>
              <Ionicons name="close" size={28} color="#6B7280" />
            </Pressable>
          </View>
          <ScrollView className="flex-1 px-6 py-4">
            {themes.map((theme) => (
              <Pressable
                key={theme.color}
                onPress={() => {
                  updateThemeColor(theme.color);
                  setShowThemeModal(false);
                }}
                className={cn(
                  "flex-row items-center justify-between py-4 px-4 rounded-xl mb-2",
                  user.themeColor === theme.color
                    ? "bg-blue-100 dark:bg-blue-900"
                    : "bg-white dark:bg-gray-800"
                )}
              >
                <View className="flex-row items-center">
                  <View
                    className="w-8 h-8 rounded-full mr-3"
                    style={{ backgroundColor: theme.colors[0] }}
                  />
                  <Text className="text-base font-medium text-gray-800 dark:text-gray-100">
                    {theme.name}
                  </Text>
                </View>
                {user.themeColor === theme.color && (
                  <Ionicons name="checkmark-circle" size={24} color="#3B82F6" />
                )}
              </Pressable>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Animal Modal */}
      <Modal
        visible={showAnimalModal}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowAnimalModal(false)}
      >
        <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
          <View className="px-6 py-4 flex-row items-center justify-between border-b border-gray-200 dark:border-gray-700">
            <Text className="text-xl font-bold text-gray-800 dark:text-gray-100">
              {t("studyPalAnimal")}
            </Text>
            <Pressable onPress={() => setShowAnimalModal(false)}>
              <Ionicons name="close" size={28} color="#6B7280" />
            </Pressable>
          </View>
          <ScrollView className="flex-1 px-6 py-4">
            {animals.map((animal) => (
              <Pressable
                key={animal}
                onPress={() => {
                  updateStudyPal(user.studyPalConfig.name, animal);
                  setShowAnimalModal(false);
                }}
                className={cn(
                  "flex-row items-center justify-between py-4 px-4 rounded-xl mb-2",
                  user.studyPalConfig.animal === animal
                    ? "bg-blue-100 dark:bg-blue-900"
                    : "bg-white dark:bg-gray-800"
                )}
              >
                <View className="flex-row items-center">
                  <Text className="text-3xl mr-3">
                    {animal === "cat" && "🐱"}
                    {animal === "bunny" && "🐰"}
                    {animal === "bear" && "🐻"}
                    {animal === "dog" && "🐶"}
                    {animal === "fox" && "🦊"}
                    {animal === "panda" && "🐼"}
                  </Text>
                  <Text className="text-base font-medium text-gray-800 dark:text-gray-100 capitalize">
                    {t(animal)}
                  </Text>
                </View>
                {user.studyPalConfig.animal === animal && (
                  <Ionicons name="checkmark-circle" size={24} color="#3B82F6" />
                )}
              </Pressable>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default ProfileScreen;
