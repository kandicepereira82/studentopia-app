import React from "react";
import { View, Text, Pressable, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface CustomAlertButton {
  text: string;
  onPress?: () => void;
  style?: "default" | "cancel" | "destructive";
}

interface CustomAlertProps {
  visible: boolean;
  title: string;
  message: string;
  buttons?: CustomAlertButton[];
  onClose: () => void;
  theme?: any;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
  visible,
  title,
  message,
  buttons = [{ text: "OK", style: "default" }],
  onClose,
  theme,
}) => {
  const defaultTheme = {
    primary: "#6C63FF",
    textPrimary: "#1A1A1A",
    textSecondary: "#6B7280",
  };

  const activeTheme = theme || defaultTheme;

  const getButtonColor = (style?: string) => {
    switch (style) {
      case "destructive":
        return "#EF4444";
      case "cancel":
        return "#6B7280";
      default:
        return activeTheme.primary;
    }
  };

  const handleButtonPress = (button: CustomAlertButton) => {
    if (button.onPress) {
      button.onPress();
    }
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <Pressable
        style={{
          flex: 1,
          backgroundColor: "rgba(0,0,0,0.5)",
          alignItems: "center",
          justifyContent: "center",
          padding: 24,
        }}
        onPress={onClose}
      >
        <Pressable
          style={{
            backgroundColor: "white",
            borderRadius: 20,
            padding: 24,
            width: "100%",
            maxWidth: 340,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.2,
            shadowRadius: 16,
            elevation: 8,
          }}
          onPress={(e) => e.stopPropagation()}
        >
          <View style={{ marginBottom: 16, alignItems: "center" }}>
            <View
              style={{
                width: 56,
                height: 56,
                borderRadius: 28,
                backgroundColor: activeTheme.primary + "20",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 16,
              }}
            >
              <Ionicons
                name={title === "Error" ? "alert-circle" : title === "Success" ? "checkmark-circle" : "information-circle"}
                size={32}
                color={activeTheme.primary}
              />
            </View>
            <Text
              style={{
                fontSize: 20,
                fontFamily: "Poppins_700Bold",
                color: activeTheme.textPrimary,
                textAlign: "center",
                marginBottom: 8,
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontFamily: "Poppins_400Regular",
                color: activeTheme.textSecondary,
                textAlign: "center",
                lineHeight: 20,
              }}
            >
              {message}
            </Text>
          </View>

          <View style={{ gap: 8 }}>
            {buttons.map((button, index) => (
              <Pressable
                key={index}
                onPress={() => handleButtonPress(button)}
                style={{
                  paddingVertical: 14,
                  borderRadius: 12,
                  backgroundColor: button.style === "cancel" ? "#F3F4F6" : getButtonColor(button.style),
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Poppins_600SemiBold",
                    color: button.style === "cancel" ? activeTheme.textPrimary : "white",
                  }}
                >
                  {button.text}
                </Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default CustomAlert;
