import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import useUserStore from "../state/userStore";
import { useTranslation } from "../utils/translations";
import { getOpenAITextResponse } from "../api/chat-service";
import { AIChatMessage, AIChatMode } from "../types";
import { cn } from "../utils/cn";

const AIHelperScreen = () => {
  const user = useUserStore((s) => s.user);
  const { t } = useTranslation(user?.language || "en");

  const [mode, setMode] = useState<AIChatMode>("chat");
  const [messages, setMessages] = useState<AIChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: AIChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      const systemPrompt = mode === "grammar"
        ? `You are a grammar checker. Check the following text for grammar, spelling, and punctuation errors. Provide corrections and explanations. Respond in ${user?.language || "English"}.`
        : `You are a helpful AI tutor assistant for students. Help them with homework, projects, research, and studying. Provide clear explanations and suggest relevant resources when appropriate. Respond in ${user?.language || "English"}.`;

      const response = await getOpenAITextResponse([
        { role: "system", content: systemPrompt },
        ...messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        { role: "user", content: inputText },
      ]);

      const assistantMessage: AIChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.content,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: AIChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50 dark:bg-gray-900" edges={["top"]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        {/* Header */}
        <View className="px-6 pt-4 pb-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              {t("aiHelper")}
            </Text>
            {messages.length > 0 && (
              <Pressable onPress={clearChat} className="p-2">
                <Ionicons name="trash-outline" size={24} color="#EF4444" />
              </Pressable>
            )}
          </View>

          {/* Mode Toggle */}
          <View className="flex-row gap-2">
            <Pressable
              onPress={() => setMode("chat")}
              className={cn(
                "flex-1 py-3 rounded-xl items-center",
                mode === "chat"
                  ? "bg-blue-500"
                  : "bg-white dark:bg-gray-800"
              )}
            >
              <View className="flex-row items-center">
                <Ionicons
                  name="chatbubbles"
                  size={18}
                  color={mode === "chat" ? "white" : "#6B7280"}
                />
                <Text
                  className={cn(
                    "ml-2 font-semibold",
                    mode === "chat"
                      ? "text-white"
                      : "text-gray-700 dark:text-gray-300"
                  )}
                >
                  {t("chatMode")}
                </Text>
              </View>
            </Pressable>

            <Pressable
              onPress={() => setMode("grammar")}
              className={cn(
                "flex-1 py-3 rounded-xl items-center",
                mode === "grammar"
                  ? "bg-purple-500"
                  : "bg-white dark:bg-gray-800"
              )}
            >
              <View className="flex-row items-center">
                <Ionicons
                  name="checkmark-done"
                  size={18}
                  color={mode === "grammar" ? "white" : "#6B7280"}
                />
                <Text
                  className={cn(
                    "ml-2 font-semibold",
                    mode === "grammar"
                      ? "text-white"
                      : "text-gray-700 dark:text-gray-300"
                  )}
                >
                  {t("grammarMode")}
                </Text>
              </View>
            </Pressable>
          </View>
        </View>

        {/* Messages */}
        <ScrollView
          ref={scrollViewRef}
          className="flex-1 px-6"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingTop: 16, paddingBottom: 16 }}
        >
          {messages.length === 0 ? (
            <View className="flex-1 items-center justify-center py-20">
              <Ionicons
                name={mode === "chat" ? "chatbubbles-outline" : "checkmark-done-outline"}
                size={80}
                color="#9CA3AF"
              />
              <Text className="text-gray-500 dark:text-gray-400 text-lg mt-4 text-center">
                {mode === "chat"
                  ? "Ask me anything about your homework or studies!"
                  : "Paste your text to check for grammar errors"}
              </Text>
            </View>
          ) : (
            <View>
              {messages.map((message) => (
                <View
                  key={message.id}
                  className={cn(
                    "mb-4",
                    message.role === "user" ? "items-end" : "items-start"
                  )}
                >
                  <View
                    className={cn(
                      "max-w-[80%] px-4 py-3 rounded-2xl",
                      message.role === "user"
                        ? "bg-blue-500"
                        : "bg-white dark:bg-gray-800"
                    )}
                  >
                    <Text
                      className={cn(
                        "text-base",
                        message.role === "user"
                          ? "text-white"
                          : "text-gray-800 dark:text-gray-100"
                      )}
                    >
                      {message.content}
                    </Text>
                  </View>
                  <Text className="text-xs text-gray-400 dark:text-gray-500 mt-1 px-2">
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </Text>
                </View>
              ))}
              {isLoading && (
                <View className="items-start mb-4">
                  <View className="bg-white dark:bg-gray-800 px-4 py-3 rounded-2xl">
                    <ActivityIndicator size="small" color="#3B82F6" />
                  </View>
                </View>
              )}
            </View>
          )}
        </ScrollView>

        {/* Input */}
        <View className="px-6 py-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <View className="flex-row items-end gap-2">
            <View className="flex-1 bg-white dark:bg-gray-800 rounded-2xl px-4 py-2">
              <TextInput
                value={inputText}
                onChangeText={setInputText}
                placeholder={t("askQuestion")}
                placeholderTextColor="#9CA3AF"
                multiline
                maxLength={1000}
                className="text-gray-800 dark:text-gray-100 text-base max-h-32"
                editable={!isLoading}
              />
            </View>
            <Pressable
              onPress={handleSend}
              disabled={!inputText.trim() || isLoading}
              className={cn(
                "w-12 h-12 rounded-full items-center justify-center",
                inputText.trim() && !isLoading
                  ? mode === "chat"
                    ? "bg-blue-500"
                    : "bg-purple-500"
                  : "bg-gray-300 dark:bg-gray-700"
              )}
            >
              <Ionicons
                name="send"
                size={20}
                color={inputText.trim() && !isLoading ? "white" : "#9CA3AF"}
              />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AIHelperScreen;
