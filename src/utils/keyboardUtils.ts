import {
  KeyboardAvoidingView,
  Platform,
  KeyboardAvoidingViewProps,
} from "react-native";

/**
 * Standard keyboard avoiding behavior based on platform
 */
export const getKeyboardAvoidingBehavior = ():
  | "padding"
  | "height"
  | "position" => {
  return Platform.OS === "ios" ? "padding" : "height";
};

/**
 * Standard keyboard vertical offset for ios
 */
export const getKeyboardVerticalOffset = (): number => {
  return Platform.OS === "ios" ? 90 : 0;
};

/**
 * Dismiss keyboard when pressing outside input
 */
export const dismissKeyboardOnPress = (callback?: () => void) => {
  return () => {
    // Keyboard dismissal happens automatically on Android
    // On iOS, you may need to call Keyboard.dismiss()
    callback?.();
  };
};
