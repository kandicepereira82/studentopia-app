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

  // Request password reset (generates reset token and stores it)
  async requestPasswordReset(email: string): Promise<{ success: boolean; error?: string }> {
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

      // Generate reset token (6-digit code for demonstration)
      const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
      const resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes

      // Store reset token
      const resetTokensData = await AsyncStorage.getItem("password_reset_tokens");
      const resetTokens = resetTokensData ? JSON.parse(resetTokensData) : {};

      resetTokens[email] = {
        token: resetToken,
        expiry: resetTokenExpiry,
        userId: credential.userId,
      };

      await AsyncStorage.setItem("password_reset_tokens", JSON.stringify(resetTokens));

      // In production, you would send an email here via:
      // - Firebase Authentication: firebase.auth().sendPasswordResetEmail(email)
      // - Backend API: fetch('/api/auth/reset-password', { method: 'POST', body: JSON.stringify({ email }) })
      // - SMTP Service: nodemailer or similar service

      // For now, log the token for testing (in production, this would be sent via email)
      console.log(`[Password Reset] Token for ${email}: ${resetToken}`);

      return { success: true };
    } catch (error) {
      return { success: false, error: "Failed to process password reset request" };
    }
  },

  // Verify reset token
  async verifyResetToken(email: string, token: string): Promise<{ success: boolean; error?: string }> {
    try {
      const resetTokensData = await AsyncStorage.getItem("password_reset_tokens");
      if (!resetTokensData) {
        return { success: false, error: "Invalid or expired reset token" };
      }

      const resetTokens = JSON.parse(resetTokensData);
      const resetData = resetTokens[email];

      if (!resetData) {
        return { success: false, error: "Invalid or expired reset token" };
      }

      if (Date.now() > resetData.expiry) {
        return { success: false, error: "Reset token has expired" };
      }

      if (resetData.token !== token) {
        return { success: false, error: "Invalid reset token" };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: "Failed to verify reset token" };
    }
  },

  // Reset password with token
  async resetPassword(email: string, token: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
    try {
      // Verify token first
      const verifyResult = await this.verifyResetToken(email, token);
      if (!verifyResult.success) {
        return verifyResult;
      }

      // Validate new password
      if (newPassword.length < 6) {
        return { success: false, error: "Password must be at least 6 characters" };
      }

      // Update password
      const credentialsData = await AsyncStorage.getItem("app_credentials");
      if (!credentialsData) {
        return { success: false, error: "Account not found" };
      }

      const credentials: StoredCredential[] = JSON.parse(credentialsData);
      const credentialIndex = credentials.findIndex((c) => c.email === email);

      if (credentialIndex === -1) {
        return { success: false, error: "Account not found" };
      }

      const passwordHash = await hashPassword(newPassword);
      credentials[credentialIndex].passwordHash = passwordHash;

      await AsyncStorage.setItem("app_credentials", JSON.stringify(credentials));

      // Clear used reset token
      const resetTokensData = await AsyncStorage.getItem("password_reset_tokens");
      if (resetTokensData) {
        const resetTokens = JSON.parse(resetTokensData);
        delete resetTokens[email];
        await AsyncStorage.setItem("password_reset_tokens", JSON.stringify(resetTokens));
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: "Failed to reset password" };
    }
  },

  // Clear all credentials (admin/development only)
  async clearAllCredentials(): Promise<void> {
    await AsyncStorage.removeItem("app_credentials");
    await AsyncStorage.removeItem("password_reset_tokens");
  },
};
