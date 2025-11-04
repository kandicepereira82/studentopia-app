import React, { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isSameDay, isToday, addMonths, subMonths } from "date-fns";
import useUserStore from "../state/userStore";
import useTaskStore from "../state/taskStore";
import { useTranslation } from "../utils/translations";
import { cn } from "../utils/cn";

const CalendarScreen = () => {
  const user = useUserStore((s) => s.user);
  const tasks = useTaskStore((s) => s.tasks);
  const getTasksByDate = useTaskStore((s) => s.getTasksByDate);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"month" | "week">("month");

  const { t } = useTranslation(user?.language || "en");

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const startDayOfWeek = monthStart.getDay();
  const emptyDays = Array(startDayOfWeek).fill(null);

  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const getTasksForDate = (date: Date) => {
    return tasks.filter((task) => {
      const taskDate = new Date(task.dueDate);
      return isSameDay(taskDate, date);
    });
  };

  const selectedDateTasks = getTasksForDate(selectedDate);

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <View className="px-6 pt-4 pb-2">
        <Text className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          {t("calendar")}
        </Text>
      </View>

      {/* View Mode Toggle */}
      <View className="px-6 py-3 flex-row gap-2">
        <Pressable
          onPress={() => setViewMode("month")}
          className={cn(
            "flex-1 py-3 rounded-xl items-center",
            viewMode === "month"
              ? "bg-blue-500"
              : "bg-white dark:bg-gray-800"
          )}
        >
          <Text
            className={cn(
              "font-semibold",
              viewMode === "month"
                ? "text-white"
                : "text-gray-700 dark:text-gray-300"
            )}
          >
            Month
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setViewMode("week")}
          className={cn(
            "flex-1 py-3 rounded-xl items-center",
            viewMode === "week"
              ? "bg-blue-500"
              : "bg-white dark:bg-gray-800"
          )}
        >
          <Text
            className={cn(
              "font-semibold",
              viewMode === "week"
                ? "text-white"
                : "text-gray-700 dark:text-gray-300"
            )}
          >
            Week
          </Text>
        </Pressable>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Month/Year Header */}
        <View className="px-6 py-4 flex-row items-center justify-between">
          <Pressable onPress={handlePreviousMonth} className="p-2">
            <Ionicons name="chevron-back" size={24} color="#6B7280" />
          </Pressable>
          <Text className="text-xl font-bold text-gray-800 dark:text-gray-100">
            {format(currentDate, "MMMM yyyy")}
          </Text>
          <Pressable onPress={handleNextMonth} className="p-2">
            <Ionicons name="chevron-forward" size={24} color="#6B7280" />
          </Pressable>
        </View>

        {/* Calendar Grid */}
        <View className="px-6">
          <View className="bg-white dark:bg-gray-800 rounded-2xl p-4">
            {/* Day Headers */}
            <View className="flex-row mb-2">
              {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
                <View key={index} className="flex-1 items-center">
                  <Text className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                    {day}
                  </Text>
                </View>
              ))}
            </View>

            {/* Days Grid */}
            <View className="flex-row flex-wrap">
              {emptyDays.map((_, index) => (
                <View key={`empty-${index}`} className="w-[14.28%] aspect-square p-1" />
              ))}
              {daysInMonth.map((day) => {
                const dayTasks = getTasksForDate(day);
                const hasCompletedTasks = dayTasks.some(t => t.status === "completed");
                const hasPendingTasks = dayTasks.some(t => t.status === "pending");
                const isSelected = isSameDay(day, selectedDate);
                const isTodayDate = isToday(day);

                return (
                  <Pressable
                    key={day.toString()}
                    onPress={() => handleDateSelect(day)}
                    className="w-[14.28%] aspect-square p-1"
                  >
                    <View
                      className={cn(
                        "flex-1 items-center justify-center rounded-lg",
                        isSelected && "bg-blue-500",
                        isTodayDate && !isSelected && "border-2 border-blue-500"
                      )}
                    >
                      <Text
                        className={cn(
                          "text-sm font-medium",
                          isSelected
                            ? "text-white"
                            : "text-gray-800 dark:text-gray-100"
                        )}
                      >
                        {format(day, "d")}
                      </Text>
                      {dayTasks.length > 0 && (
                        <View className="flex-row gap-0.5 mt-0.5">
                          {hasPendingTasks && (
                            <View className={cn(
                              "w-1 h-1 rounded-full",
                              isSelected ? "bg-white" : "bg-orange-500"
                            )} />
                          )}
                          {hasCompletedTasks && (
                            <View className={cn(
                              "w-1 h-1 rounded-full",
                              isSelected ? "bg-white" : "bg-green-500"
                            )} />
                          )}
                        </View>
                      )}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </View>

        {/* Selected Date Tasks */}
        <View className="px-6 py-4">
          <Text className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">
            {format(selectedDate, "EEEE, MMMM d, yyyy")}
          </Text>
          {selectedDateTasks.length === 0 ? (
            <View className="bg-white dark:bg-gray-800 rounded-2xl p-8 items-center">
              <Ionicons name="calendar-outline" size={48} color="#9CA3AF" />
              <Text className="text-gray-500 dark:text-gray-400 text-center mt-3">
                No tasks scheduled for this day
              </Text>
            </View>
          ) : (
            <View className="gap-3 pb-8">
              {selectedDateTasks.map((task) => (
                <View
                  key={task.id}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-4"
                >
                  <View className="flex-row items-start">
                    <Ionicons
                      name={
                        task.status === "completed"
                          ? "checkmark-circle"
                          : "ellipse-outline"
                      }
                      size={24}
                      color={
                        task.status === "completed" ? "#10B981" : "#9CA3AF"
                      }
                      style={{ marginRight: 12, marginTop: 2 }}
                    />
                    <View className="flex-1">
                      <Text
                        className={cn(
                          "text-base font-semibold text-gray-800 dark:text-gray-100",
                          task.status === "completed" && "line-through"
                        )}
                      >
                        {task.title}
                      </Text>
                      {task.description && (
                        <Text className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {task.description}
                        </Text>
                      )}
                      <Text className="text-xs text-gray-500 dark:text-gray-400 mt-2 capitalize">
                        {t(task.category)}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CalendarScreen;
