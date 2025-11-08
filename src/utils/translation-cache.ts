import AsyncStorage from "@react-native-async-storage/async-storage";
import { Language } from "../types";
import { translateText, isTranslationAvailable } from "../api/google-translate";

/**
 * TRANSLATION CACHE SERVICE
 *
 * Caches translations locally for offline access and performance
 * Uses AsyncStorage to persist translations across app sessions
 *
 * Cache Structure:
 * {
 *   "en->es": {
 *     "Hello": "Hola",
 *     "Goodbye": "Adiós"
 *   },
 *   "en->fr": {
 *     "Hello": "Bonjour"
 *   }
 * }
 */

const CACHE_KEY_PREFIX = "translation_cache_";
const CACHE_VERSION = "v1";
const MAX_CACHE_SIZE = 10000; // Maximum number of cached translations per language pair
const CACHE_EXPIRY_DAYS = 30; // Cache expires after 30 days

interface CacheEntry {
  translatedText: string;
  timestamp: number;
  version: string;
}

interface TranslationCache {
  [key: string]: CacheEntry;
}

/**
 * Generate cache key for language pair
 */
const getCacheKey = (from: Language, to: Language): string => {
  return `${CACHE_KEY_PREFIX}${from}_${to}_${CACHE_VERSION}`;
};

/**
 * Generate hash for text (simple hash function)
 */
const hashText = (text: string): string => {
  // Simple hash to create unique key for text
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    const char = text.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash.toString(36);
};

/**
 * Load cache from AsyncStorage
 */
const loadCache = async (from: Language, to: Language): Promise<TranslationCache> => {
  try {
    const cacheKey = getCacheKey(from, to);
    const cached = await AsyncStorage.getItem(cacheKey);

    if (cached) {
      return JSON.parse(cached);
    }
  } catch (error) {
    console.error("Error loading translation cache:", error);
  }

  return {};
};

/**
 * Save cache to AsyncStorage
 */
const saveCache = async (from: Language, to: Language, cache: TranslationCache): Promise<void> => {
  try {
    const cacheKey = getCacheKey(from, to);
    await AsyncStorage.setItem(cacheKey, JSON.stringify(cache));
  } catch (error) {
    console.error("Error saving translation cache:", error);
  }
};

/**
 * Check if cache entry is expired
 */
const isCacheExpired = (entry: CacheEntry): boolean => {
  const now = Date.now();
  const expiryTime = CACHE_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
  return now - entry.timestamp > expiryTime;
};

/**
 * Get cached translation
 */
export const getCachedTranslation = async (
  text: string,
  from: Language,
  to: Language
): Promise<string | null> => {
  try {
    const cache = await loadCache(from, to);
    const textHash = hashText(text);
    const entry = cache[textHash];

    if (entry && !isCacheExpired(entry)) {
      return entry.translatedText;
    }
  } catch (error) {
    console.error("Error getting cached translation:", error);
  }

  return null;
};

/**
 * Cache translation
 */
export const cacheTranslation = async (
  text: string,
  translatedText: string,
  from: Language,
  to: Language
): Promise<void> => {
  try {
    const cache = await loadCache(from, to);
    const textHash = hashText(text);

    // Add new translation to cache
    cache[textHash] = {
      translatedText,
      timestamp: Date.now(),
      version: CACHE_VERSION,
    };

    // Enforce cache size limit (remove oldest entries if over limit)
    const cacheEntries = Object.entries(cache);
    if (cacheEntries.length > MAX_CACHE_SIZE) {
      // Sort by timestamp (oldest first)
      cacheEntries.sort((a, b) => a[1].timestamp - b[1].timestamp);

      // Remove oldest 10% of entries
      const entriesToRemove = Math.floor(MAX_CACHE_SIZE * 0.1);
      for (let i = 0; i < entriesToRemove; i++) {
        delete cache[cacheEntries[i][0]];
      }
    }

    await saveCache(from, to, cache);
  } catch (error) {
    console.error("Error caching translation:", error);
  }
};

/**
 * Translate with caching
 */
export const translateWithCache = async (
  text: string,
  from: Language,
  to: Language
): Promise<{ translatedText: string; cached: boolean }> => {
  // If source and target are the same, return original
  if (from === to) {
    return { translatedText: text, cached: false };
  }

  // Check cache first
  const cachedTranslation = await getCachedTranslation(text, from, to);
  if (cachedTranslation) {
    return { translatedText: cachedTranslation, cached: true };
  }

  // If not in cache, translate using API
  if (isTranslationAvailable()) {
    try {
      const result = await translateText({
        from,
        to,
        text,
      });

      const translatedText = typeof result.translatedText === "string" ? result.translatedText : text;

      // Cache the translation
      await cacheTranslation(text, translatedText, from, to);

      return { translatedText, cached: false };
    } catch (error) {
      console.error("Translation with cache error:", error);
    }
  }

  // Fallback to original text if translation fails
  return { translatedText: text, cached: false };
};

/**
 * Batch translate with caching
 */
export const batchTranslateWithCache = async (
  texts: string[],
  from: Language,
  to: Language
): Promise<Array<{ translatedText: string; cached: boolean }>> => {
  const results: Array<{ translatedText: string; cached: boolean }> = [];

  // Process each text
  for (const text of texts) {
    const result = await translateWithCache(text, from, to);
    results.push(result);
  }

  return results;
};

/**
 * Clear translation cache for specific language pair
 */
export const clearCache = async (from?: Language, to?: Language): Promise<void> => {
  try {
    if (from && to) {
      // Clear specific language pair
      const cacheKey = getCacheKey(from, to);
      await AsyncStorage.removeItem(cacheKey);
    } else {
      // Clear all translation caches
      const keys = await AsyncStorage.getAllKeys();
      const translationKeys = keys.filter((key) => key.startsWith(CACHE_KEY_PREFIX));
      await AsyncStorage.multiRemove(translationKeys);
    }

    console.log("Translation cache cleared");
  } catch (error) {
    console.error("Error clearing translation cache:", error);
  }
};

/**
 * Get cache statistics
 */
export const getCacheStats = async (): Promise<{
  totalEntries: number;
  totalSize: number;
  languagePairs: number;
}> => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const translationKeys = keys.filter((key) => key.startsWith(CACHE_KEY_PREFIX));

    let totalEntries = 0;
    let totalSize = 0;

    for (const key of translationKeys) {
      const cached = await AsyncStorage.getItem(key);
      if (cached) {
        const cache = JSON.parse(cached);
        totalEntries += Object.keys(cache).length;
        totalSize += cached.length;
      }
    }

    return {
      totalEntries,
      totalSize,
      languagePairs: translationKeys.length,
    };
  } catch (error) {
    console.error("Error getting cache stats:", error);
    return { totalEntries: 0, totalSize: 0, languagePairs: 0 };
  }
};

/**
 * Pre-cache common phrases for offline use
 */
export const preCacheCommonPhrases = async (targetLanguages: Language[]): Promise<void> => {
  const commonPhrases = [
    "Hello",
    "Goodbye",
    "Thank you",
    "Welcome",
    "Good morning",
    "Good afternoon",
    "Good evening",
    "How are you?",
    "Task completed",
    "Great work!",
    "Keep going!",
    "You can do it!",
    "Study time",
    "Break time",
    "Focus",
    "Relax",
    "Settings",
    "Profile",
    "Calendar",
    "Tasks",
    "Timer",
    "Home",
  ];

  for (const targetLang of targetLanguages) {
    if (targetLang === "en") continue; // Skip English

    console.log(`Pre-caching common phrases for ${targetLang}...`);

    for (const phrase of commonPhrases) {
      await translateWithCache(phrase, "en", targetLang);
      // Small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  console.log("Pre-caching complete!");
};

/**
 * Export cache for backup
 */
export const exportCache = async (): Promise<Record<string, TranslationCache>> => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    const translationKeys = keys.filter((key) => key.startsWith(CACHE_KEY_PREFIX));
    const cacheExport: Record<string, TranslationCache> = {};

    for (const key of translationKeys) {
      const cached = await AsyncStorage.getItem(key);
      if (cached) {
        cacheExport[key] = JSON.parse(cached);
      }
    }

    return cacheExport;
  } catch (error) {
    console.error("Error exporting cache:", error);
    return {};
  }
};

/**
 * Import cache from backup
 */
export const importCache = async (cacheData: Record<string, TranslationCache>): Promise<void> => {
  try {
    for (const [key, cache] of Object.entries(cacheData)) {
      await AsyncStorage.setItem(key, JSON.stringify(cache));
    }

    console.log("Cache import complete!");
  } catch (error) {
    console.error("Error importing cache:", error);
  }
};
