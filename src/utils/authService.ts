import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";

interface StoredCredential {
  email: string;
  passwordHash: string;
  userId: string;
  username: string;
}

// Simple hash function for demonstration (in production, use proper hashing)
const hashPassword = async (password: string): Promise<string> => {
  return await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, password);
};

export const authService = {
  // Register a new user with email and password
  async register(email: string, password: string, username: string): Promise<{ success: boolean; error?: string; userId?: string }> {
    try {
      // Get existing credentials
      const existingCredentials = await AsyncStorage.getItem("app_credentials");
      const credentials: StoredCredential[] = existingCredentials ? JSON.parse(existingCredentials) : [];

      // Check if email already exists
      if (credentials.some((c) => c.email === email)) {
        return { success: false, error: "Email already registered" };
      }

      // Validate password strength
      if (password.length < 6) {
        return { success: false, error: "Password must be at least 6 characters" };
      }

      // Create new credential entry
      const userId = Date.now().toString();
      const passwordHash = await hashPassword(password);

      credentials.push({
        email,
        passwordHash,
        userId,
        username,
      });

      // Store credentials
      await AsyncStorage.setItem("app_credentials", JSON.stringify(credentials));

      return { success: true, userId };
    } catch (error) {
      return { success: false, error: "Registration failed" };
    }
  },

  // Login user with email and password
  async login(email: string, password: string): Promise<{ success: boolean; error?: string; userId?: string; username?: string }> {
    try {
      const credentialsData = await AsyncStorage.getItem("app_credentials");
      if (!credentialsData) {
        return { success: false, error: "Email not found" };
      }

      const credentials: StoredCredential[] = JSON.parse(credentialsData);
      const credential = credentials.find((c) => c.email === email);

      if (!credential) {
        return { success: false, error: "Email not found" };
      }

      const passwordHash = await hashPassword(password);
      if (passwordHash !== credential.passwordHash) {
        return { success: false, error: "Incorrect password" };
      }

      return { success: true, userId: credential.userId, username: credential.username };
    } catch (error) {
      return { success: false, error: "Login failed" };
    }
  },

  // Check if user with email exists
  async userExists(email: string): Promise<boolean> {
    try {
      const credentialsData = await AsyncStorage.getItem("app_credentials");
      if (!credentialsData) return false;

      const credentials: StoredCredential[] = JSON.parse(credentialsData);
      return credentials.some((c) => c.email === email);
    } catch {
      return false;
    }
  },

  // Get user ID by email (for password recovery later)
  async getUserIdByEmail(email: string): Promise<string | null> {
    try {
      const credentialsData = await AsyncStorage.getItem("app_credentials");
      if (!credentialsData) return null;

      const credentials: StoredCredential[] = JSON.parse(credentialsData);
      const credential = credentials.find((c) => c.email === email);
      return credential ? credential.userId : null;
    } catch {
      return null;
    }
  },

  // Clear all credentials (admin/development only)
  async clearAllCredentials(): Promise<void> {
    await AsyncStorage.removeItem("app_credentials");
  },
};
