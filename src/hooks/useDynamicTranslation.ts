import { useState, useEffect, useCallback } from "react";
import { Language } from "../types";
import { translateWithCache } from "../utils/translation-cache";
import { useTranslation as useStaticTranslation } from "../utils/translations";
import useUserStore from "../state/userStore";

/**
 * DYNAMIC TRANSLATION HOOK
 *
 * Enhanced translation hook that combines:
 * 1. Static translations (pre-translated keys)
 * 2. Dynamic translations (Google Translate API with caching)
 * 3. Offline fallback support
 *
 * Usage:
 * const { t, translateDynamic, isTranslating } = useDynamicTranslation();
 *
 * // Static translation (instant)
 * <Text>{t("welcomeBack")}</Text>
 *
 * // Dynamic translation (with caching)
 * const [translated, setTranslated] = useState("");
 * useEffect(() => {
 *   translateDynamic("Hello world").then(setTranslated);
 * }, []);
 */

interface DynamicTranslationHook {
  // Static translation (from pre-translated keys)
  t: (key: string) => string;

  // Dynamic translation (Google Translate API)
  translateDynamic: (text: string, from?: Language) => Promise<string>;

  // Batch dynamic translation
  translateBatch: (texts: string[], from?: Language) => Promise<string[]>;

  // Check if currently translating
  isTranslating: boolean;

  // Current language
  language: Language;

  // Change language
  setLanguage: (language: Language) => void;
}

/**
 * Hook for dynamic translations with caching
 */
export const useDynamicTranslation = (): DynamicTranslationHook => {
  const user = useUserStore((s) => s.user);
  const updateLanguage = useUserStore((s) => s.updateLanguage);
  const language = user?.language || "en";

  // Static translation hook
  const { t } = useStaticTranslation(language);

  // Translation state
  const [isTranslating, setIsTranslating] = useState(false);

  /**
   * Translate dynamic content
   */
  const translateDynamic = useCallback(
    async (text: string, from: Language = "en"): Promise<string> => {
      // Return original if same language
      if (from === language) {
        return text;
      }

      setIsTranslating(true);

      try {
        const result = await translateWithCache(text, from, language);
        return result.translatedText;
      } catch (error) {
        console.error("Dynamic translation error:", error);
        return text;
      } finally {
        setIsTranslating(false);
      }
    },
    [language]
  );

  /**
   * Translate multiple texts
   */
  const translateBatch = useCallback(
    async (texts: string[], from: Language = "en"): Promise<string[]> => {
      // Return original if same language
      if (from === language) {
        return texts;
      }

      setIsTranslating(true);

      try {
        const results = await Promise.all(texts.map((text) => translateWithCache(text, from, language)));
        return results.map((r) => r.translatedText);
      } catch (error) {
        console.error("Batch translation error:", error);
        return texts;
      } finally {
        setIsTranslating(false);
      }
    },
    [language]
  );

  /**
   * Change language
   */
  const setLanguage = useCallback(
    (newLanguage: Language) => {
      updateLanguage(newLanguage);
    },
    [updateLanguage]
  );

  return {
    t,
    translateDynamic,
    translateBatch,
    isTranslating,
    language,
    setLanguage,
  };
};

/**
 * Hook for translating study tips
 */
export const useStudyTipTranslation = (title: string, description: string, sourceLanguage: Language = "en") => {
  const { language } = useDynamicTranslation();
  const [translatedTitle, setTranslatedTitle] = useState(title);
  const [translatedDescription, setTranslatedDescription] = useState(description);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const translate = async () => {
      if (sourceLanguage === language) {
        setTranslatedTitle(title);
        setTranslatedDescription(description);
        return;
      }

      setIsLoading(true);

      try {
        const [titleResult, descResult] = await Promise.all([
          translateWithCache(title, sourceLanguage, language),
          translateWithCache(description, sourceLanguage, language),
        ]);

        setTranslatedTitle(titleResult.translatedText);
        setTranslatedDescription(descResult.translatedText);
      } catch (error) {
        console.error("Study tip translation error:", error);
        setTranslatedTitle(title);
        setTranslatedDescription(description);
      } finally {
        setIsLoading(false);
      }
    };

    translate();
  }, [title, description, sourceLanguage, language]);

  return {
    title: translatedTitle,
    description: translatedDescription,
    isLoading,
  };
};

/**
 * Hook for translating motivational quotes
 */
export const useQuoteTranslation = (text: string, author: string, sourceLanguage: Language = "en") => {
  const { language } = useDynamicTranslation();
  const [translatedText, setTranslatedText] = useState(text);
  const [translatedAuthor, setTranslatedAuthor] = useState(author);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const translate = async () => {
      if (sourceLanguage === language) {
        setTranslatedText(text);
        setTranslatedAuthor(author);
        return;
      }

      setIsLoading(true);

      try {
        const [textResult, authorResult] = await Promise.all([
          translateWithCache(text, sourceLanguage, language),
          translateWithCache(author, sourceLanguage, language),
        ]);

        setTranslatedText(textResult.translatedText);
        setTranslatedAuthor(authorResult.translatedText);
      } catch (error) {
        console.error("Quote translation error:", error);
        setTranslatedText(text);
        setTranslatedAuthor(author);
      } finally {
        setIsLoading(false);
      }
    };

    translate();
  }, [text, author, sourceLanguage, language]);

  return {
    text: translatedText,
    author: translatedAuthor,
    isLoading,
  };
};

/**
 * Hook for translating AI-generated content
 */
export const useAIContentTranslation = (content: string, sourceLanguage: Language = "en") => {
  const { language } = useDynamicTranslation();
  const [translatedContent, setTranslatedContent] = useState(content);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const translate = async () => {
      if (sourceLanguage === language || !content) {
        setTranslatedContent(content);
        return;
      }

      setIsLoading(true);

      try {
        const result = await translateWithCache(content, sourceLanguage, language);
        setTranslatedContent(result.translatedText);
      } catch (error) {
        console.error("AI content translation error:", error);
        setTranslatedContent(content);
      } finally {
        setIsLoading(false);
      }
    };

    translate();
  }, [content, sourceLanguage, language]);

  return {
    content: translatedContent,
    isLoading,
  };
};

/**
 * Hook for real-time text translation (as user types)
 */
export const useRealtimeTranslation = (text: string, from: Language = "en") => {
  const { language } = useDynamicTranslation();
  const [translatedText, setTranslatedText] = useState(text);
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    // Debounce translation to avoid too many API calls
    const timer = setTimeout(async () => {
      if (from === language || !text) {
        setTranslatedText(text);
        return;
      }

      setIsTranslating(true);

      try {
        const result = await translateWithCache(text, from, language);
        setTranslatedText(result.translatedText);
      } catch (error) {
        console.error("Realtime translation error:", error);
        setTranslatedText(text);
      } finally {
        setIsTranslating(false);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [text, from, language]);

  return {
    translatedText,
    isTranslating,
  };
};

/**
 * Utility function to translate text outside of React components
 */
export const translateTextAsync = async (
  text: string,
  targetLanguage: Language,
  sourceLanguage: Language = "en"
): Promise<string> => {
  if (sourceLanguage === targetLanguage) {
    return text;
  }

  try {
    const result = await translateWithCache(text, sourceLanguage, targetLanguage);
    return result.translatedText;
  } catch (error) {
    console.error("Async translation error:", error);
    return text;
  }
};

/**
 * Utility to translate array of texts
 */
export const translateTextsAsync = async (
  texts: string[],
  targetLanguage: Language,
  sourceLanguage: Language = "en"
): Promise<string[]> => {
  if (sourceLanguage === targetLanguage) {
    return texts;
  }

  try {
    const results = await Promise.all(texts.map((text) => translateWithCache(text, sourceLanguage, targetLanguage)));
    return results.map((r) => r.translatedText);
  } catch (error) {
    console.error("Async batch translation error:", error);
    return texts;
  }
};
