# Google Translate API Integration Guide

## Overview

Studentopia now features **dynamic translation** powered by Google Cloud Translation API, enabling real-time translation of any content in the app. This complements the existing 14-language static translation system with on-demand translation capabilities.

## Features

### ✅ Core Capabilities

- **Real-time Translation**: Translate any text dynamically using Google Translate API
- **14 Language Support**: All Studentopia languages supported (en, es, fr, de, zh, ja, ar, ko, pt, hi, it, tr, ru, id)
- **Smart Caching**: Translations cached locally for offline access and performance
- **Batch Translation**: Translate multiple texts efficiently
- **Automatic Language Detection**: Detect source language automatically
- **Offline Fallback**: Use cached translations when offline
- **Pre-caching**: Pre-cache common phrases for instant offline access

### 🎯 Translation Targets

- **Study Tips**: Dynamically translate study tips and descriptions
- **Motivational Quotes**: Translate quotes with author attribution
- **AI-Generated Content**: Translate responses from AI Helper
- **User-Generated Content**: Translate task titles, descriptions, notes
- **Notifications**: Translate notification titles and bodies
- **Custom Text**: Translate any custom text input

## Setup Instructions

### Step 1: Get Google Cloud API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing project
3. Enable **Cloud Translation API**:
   - Go to APIs & Services → Library
   - Search for "Cloud Translation API"
   - Click "Enable"
4. Create API credentials:
   - Go to APIs & Services → Credentials
   - Click "Create Credentials" → "API Key"
   - Copy the API key
5. (Optional) Restrict API key:
   - Click on the created API key
   - Under "API restrictions", select "Restrict key"
   - Select only "Cloud Translation API"
   - Save

### Step 2: Add API Key to Studentopia

Add the API key to your `.env` file in the project root:

```env
# Google Translate API
EXPO_PUBLIC_GOOGLE_TRANSLATE_API_KEY=your_api_key_here
```

**Important**: Make sure `.env` is in `.gitignore` to avoid committing API keys!

### Step 3: Verify Installation

The translation service will automatically detect the API key. To verify:

```typescript
import { isTranslationAvailable } from "../api/google-translate";

console.log("Translation available:", isTranslationAvailable());
// Should print: Translation available: true
```

## Usage

### In React Components

#### Basic Static Translation (Existing)

```typescript
import { useDynamicTranslation } from "../hooks/useDynamicTranslation";

const MyComponent = () => {
  const { t } = useDynamicTranslation();

  return (
    <View>
      <Text>{t("welcomeBack")}</Text>
      <Text>{t("addTask")}</Text>
    </View>
  );
};
```

#### Dynamic Translation (New)

```typescript
import { useDynamicTranslation } from "../hooks/useDynamicTranslation";
import { useEffect, useState } from "react";

const MyComponent = () => {
  const { translateDynamic, isTranslating } = useDynamicTranslation();
  const [translated, setTranslated] = useState("");

  useEffect(() => {
    translateDynamic("Hello, how are you today?").then(setTranslated);
  }, []);

  return (
    <View>
      {isTranslating && <ActivityIndicator />}
      <Text>{translated}</Text>
    </View>
  );
};
```

#### Study Tip Translation

```typescript
import { useStudyTipTranslation } from "../hooks/useDynamicTranslation";

const StudyTipCard = ({ tip }) => {
  const { title, description, isLoading } = useStudyTipTranslation(
    tip.title,
    tip.description,
    "en" // source language
  );

  return (
    <View>
      <Text>{isLoading ? "Loading..." : title}</Text>
      <Text>{description}</Text>
    </View>
  );
};
```

#### Quote Translation

```typescript
import { useQuoteTranslation } from "../hooks/useDynamicTranslation";

const QuoteDisplay = ({ quote }) => {
  const { text, author, isLoading } = useQuoteTranslation(
    quote.text,
    quote.author,
    "en" // source language
  );

  return (
    <View>
      {isLoading && <ActivityIndicator />}
      <Text>"{text}"</Text>
      <Text>— {author}</Text>
    </View>
  );
};
```

#### AI Content Translation

```typescript
import { useAIContentTranslation } from "../hooks/useDynamicTranslation";

const AIResponse = ({ content }) => {
  const { content: translatedContent, isLoading } = useAIContentTranslation(content, "en");

  return (
    <View>
      {isLoading && <ActivityIndicator />}
      <Text>{translatedContent}</Text>
    </View>
  );
};
```

#### Real-time Translation (As User Types)

```typescript
import { useRealtimeTranslation } from "../hooks/useDynamicTranslation";
import { useState } from "react";

const TranslateInput = () => {
  const [text, setText] = useState("");
  const { translatedText, isTranslating } = useRealtimeTranslation(text, "en");

  return (
    <View>
      <TextInput value={text} onChangeText={setText} placeholder="Type here..." />
      {isTranslating && <ActivityIndicator />}
      <Text>Translation: {translatedText}</Text>
    </View>
  );
};
```

### Outside React Components

#### Translate Single Text

```typescript
import { translateTextAsync } from "../hooks/useDynamicTranslation";

const result = await translateTextAsync("Hello", "es", "en");
console.log(result); // "Hola"
```

#### Translate Multiple Texts

```typescript
import { translateTextsAsync } from "../hooks/useDynamicTranslation";

const results = await translateTextsAsync(["Hello", "Goodbye", "Thank you"], "es", "en");
console.log(results); // ["Hola", "Adiós", "Gracias"]
```

#### Direct API Call

```typescript
import { translateText } from "../api/google-translate";

const result = await translateText({
  text: "Hello world",
  from: "en",
  to: "es",
});
console.log(result.translatedText); // "Hola mundo"
```

## Caching System

### How Caching Works

1. **First Request**: Text is translated via Google Translate API and cached locally
2. **Subsequent Requests**: Translation retrieved instantly from cache
3. **Cache Expiry**: Cached translations expire after 30 days
4. **Size Limit**: Maximum 10,000 translations per language pair
5. **Automatic Cleanup**: Oldest entries removed when cache size limit reached

### Cache Management

#### Get Cache Statistics

```typescript
import { getCacheStats } from "../utils/translation-cache";

const stats = await getCacheStats();
console.log({
  totalEntries: stats.totalEntries, // Total cached translations
  totalSize: stats.totalSize, // Cache size in bytes
  languagePairs: stats.languagePairs, // Number of language pairs cached
});
```

#### Clear Cache

```typescript
import { clearCache } from "../utils/translation-cache";

// Clear all caches
await clearCache();

// Clear specific language pair
await clearCache("en", "es");
```

#### Pre-cache Common Phrases

```typescript
import { preCacheCommonPhrases } from "../utils/translation-cache";

// Pre-cache common phrases for multiple languages
await preCacheCommonPhrases(["es", "fr", "de", "zh"]);
```

#### Export/Import Cache

```typescript
import { exportCache, importCache } from "../utils/translation-cache";

// Export cache for backup
const cacheData = await exportCache();
console.log("Cache exported:", cacheData);

// Import cache from backup
await importCache(cacheData);
```

## Settings Integration

### Add Translation Settings to Settings Screen

Update `SettingsScreen.tsx`:

```typescript
import { useDynamicTranslation } from "../hooks/useDynamicTranslation";
import { clearCache, getCacheStats, preCacheCommonPhrases } from "../utils/translation-cache";
import { isTranslationAvailable } from "../api/google-translate";

const SettingsScreen = () => {
  const { t, language, setLanguage } = useDynamicTranslation();
  const [cacheStats, setCacheStats] = useState(null);

  useEffect(() => {
    getCacheStats().then(setCacheStats);
  }, []);

  return (
    <View>
      {/* Translation Settings Section */}
      <View className="p-4 bg-white rounded-lg mb-4">
        <Text className="text-lg font-semibold mb-2">{t("translationSettings")}</Text>

        {/* API Status */}
        <View className="flex-row items-center mb-2">
          <Text>{t("googleTranslateAPI")}: </Text>
          <Text className={isTranslationAvailable() ? "text-green-600" : "text-red-600"}>
            {isTranslationAvailable() ? t("enabled") : t("disabled")}
          </Text>
        </View>

        {/* Cache Stats */}
        {cacheStats && (
          <View className="mb-4">
            <Text>
              {t("cachedTranslations")}: {cacheStats.totalEntries}
            </Text>
            <Text>
              {t("cacheSize")}: {(cacheStats.totalSize / 1024).toFixed(2)} KB
            </Text>
          </View>
        )}

        {/* Actions */}
        <Pressable
          className="bg-blue-500 p-3 rounded-lg mb-2"
          onPress={async () => {
            await preCacheCommonPhrases([language]);
            alert(t("preCachingComplete"));
          }}
        >
          <Text className="text-white text-center">{t("preCacheCommonPhrases")}</Text>
        </Pressable>

        <Pressable
          className="bg-red-500 p-3 rounded-lg"
          onPress={async () => {
            await clearCache();
            setCacheStats(await getCacheStats());
            alert(t("cacheCleared"));
          }}
        >
          <Text className="text-white text-center">{t("clearTranslationCache")}</Text>
        </Pressable>
      </View>
    </View>
  );
};
```

## AI Helper Integration

### Translate AI Responses

Update `AIHelperScreen.tsx` to translate AI-generated responses:

```typescript
import { useAIContentTranslation } from "../hooks/useDynamicTranslation";

const AIMessage = ({ message }) => {
  const { content, isLoading } = useAIContentTranslation(message.content, "en");

  return (
    <View className="p-3 bg-gray-100 rounded-lg mb-2">
      {isLoading && <ActivityIndicator size="small" />}
      <Text>{content}</Text>
    </View>
  );
};
```

### Pass User Language to AI

```typescript
import { languageNames } from "../utils/translations";

const AIHelperScreen = () => {
  const user = useUserStore((s) => s.user);
  const language = user?.language || "en";

  const systemPrompt = `You are a helpful study assistant. Respond in ${languageNames[language]}.`;

  // When calling AI API
  const response = await chatService.sendMessage({
    messages: [...],
    systemPrompt,
  });
};
```

## Cost Management

### Understanding Costs

Google Translate API pricing (as of 2024):
- **$20 per 1 million characters**
- Character count includes spaces and punctuation
- Caching significantly reduces costs

### Estimate Translation Costs

```typescript
import { estimateTranslationCost } from "../api/google-translate";

const text = "Hello, how are you today?";
const cost = estimateTranslationCost(text.length);
console.log(`Estimated cost: $${cost.toFixed(6)}`);
```

### Cost Optimization Strategies

1. **Use Static Translations**: Pre-translated content is free
2. **Enable Caching**: Cached translations don't count toward API usage
3. **Pre-cache Common Phrases**: One-time cost, unlimited reuse
4. **Batch Translations**: More efficient than individual requests
5. **User-Generated Content Only**: Translate only when necessary

### Monthly Cost Example

Assumptions:
- 1,000 active users
- Each user translates 100 texts/month
- Average text length: 50 characters

Calculation:
- Total characters: 1,000 × 100 × 50 = 5,000,000 characters
- Cost: (5,000,000 / 1,000,000) × $20 = **$100/month**

With 90% cache hit rate:
- Actual characters translated: 500,000
- Cost: (500,000 / 1,000,000) × $20 = **$10/month**

## Performance Considerations

### Translation Speed

- **Cached**: <10ms (instant)
- **API Call**: 200-500ms (depends on text length and network)
- **Batch Translation**: 300-800ms for 10 texts

### Optimization Tips

1. **Use React Query or SWR**: Cache API responses in React state
2. **Debounce Real-time Translation**: Wait 500ms before translating
3. **Lazy Load Translations**: Translate only visible content
4. **Background Pre-caching**: Pre-cache during app idle time

## Troubleshooting

### API Key Issues

**Problem**: "Translation available: false"

**Solutions**:
1. Check `.env` file has `EXPO_PUBLIC_GOOGLE_TRANSLATE_API_KEY`
2. Verify API key is correct (copy-paste without spaces)
3. Ensure Cloud Translation API is enabled in Google Cloud Console
4. Check API key restrictions (should allow Translation API)

### Translation Not Working

**Problem**: Text not translating

**Solutions**:
1. Check internet connection (required for first translation)
2. Verify source and target languages are different
3. Check console for error messages
4. Test with simple text first: `translateDynamic("Hello")`

### Cache Issues

**Problem**: Translations not caching

**Solutions**:
1. Check AsyncStorage permissions
2. Verify device has storage space
3. Clear cache and try again: `clearCache()`
4. Check cache stats: `getCacheStats()`

### Rate Limiting

**Problem**: "429 Too Many Requests" error

**Solutions**:
1. Add delays between translations (100-200ms)
2. Use batch translation for multiple texts
3. Enable caching to reduce API calls
4. Check Google Cloud quota limits

## Testing

### Test Translation Service

```typescript
import { translateText, isTranslationAvailable } from "../api/google-translate";

// Test 1: Check API availability
console.log("API Available:", isTranslationAvailable());

// Test 2: Simple translation
const result = await translateText({
  text: "Hello",
  to: "es",
});
console.log("Translated:", result.translatedText); // Should be "Hola"

// Test 3: Batch translation
const batchResult = await translateText({
  text: ["Hello", "Goodbye"],
  to: "fr",
});
console.log("Batch:", batchResult.translatedText); // Should be ["Bonjour", "Au revoir"]
```

### Test Caching

```typescript
import { translateWithCache, getCacheStats } from "../utils/translation-cache";

// Test 1: First translation (API call)
console.time("First translation");
const result1 = await translateWithCache("Hello world", "en", "es");
console.timeEnd("First translation"); // ~300ms
console.log("Cached:", result1.cached); // false

// Test 2: Second translation (from cache)
console.time("Cached translation");
const result2 = await translateWithCache("Hello world", "en", "es");
console.timeEnd("Cached translation"); // <10ms
console.log("Cached:", result2.cached); // true

// Test 3: Cache stats
const stats = await getCacheStats();
console.log("Cache entries:", stats.totalEntries); // Should be 1
```

## Best Practices

### 1. Prioritize Static Translations

Use static translations for:
- UI labels and buttons
- Navigation items
- Common messages
- Error messages

Use dynamic translations for:
- User-generated content
- AI responses
- Study tips and quotes
- Custom text

### 2. Implement Progressive Enhancement

```typescript
// Good: Fallback to static translation if dynamic fails
const { t, translateDynamic } = useDynamicTranslation();

// Show static translation immediately
<Text>{t("loading")}</Text>

// Then load dynamic content
useEffect(() => {
  translateDynamic(userContent).then(setTranslated);
}, []);
```

### 3. Show Loading States

```typescript
// Good: Indicate when translating
const { isTranslating } = useDynamicTranslation();

return (
  <View>
    {isTranslating && <ActivityIndicator />}
    <Text>{translated}</Text>
  </View>
);
```

### 4. Handle Errors Gracefully

```typescript
// Good: Fallback to original text on error
try {
  const translated = await translateDynamic(text);
  setContent(translated);
} catch (error) {
  console.error("Translation failed:", error);
  setContent(text); // Use original
}
```

## Security Considerations

### API Key Protection

1. **Never commit API keys**: Add `.env` to `.gitignore`
2. **Use environment variables**: `EXPO_PUBLIC_*` for Expo
3. **Restrict API key**: Limit to Translation API only
4. **Monitor usage**: Set up billing alerts in Google Cloud
5. **Rotate keys**: Change API key if compromised

### Data Privacy

1. **User content**: Only translate with user consent
2. **Sensitive data**: Avoid translating passwords, API keys, tokens
3. **Caching**: Inform users that translations are cached locally
4. **Analytics**: Don't send translation data to third-party analytics

## Monitoring & Analytics

### Track Translation Usage

```typescript
// Add to translation service
const trackTranslation = (from: Language, to: Language, characterCount: number) => {
  // Log to analytics service
  console.log({
    event: "translation_requested",
    from,
    to,
    characters: characterCount,
    timestamp: Date.now(),
  });
};
```

### Monitor Costs

Set up billing alerts in Google Cloud Console:
1. Go to Billing → Budgets & alerts
2. Set monthly budget (e.g., $50)
3. Add email alerts at 50%, 90%, 100%

## Future Enhancements

### 1. Offline Translation

Use TensorFlow Lite for on-device translation:
- Download translation models
- Translate without internet
- Free (no API costs)

### 2. Custom Translations

Allow users to override translations:
- Suggest better translations
- Community translations
- Custom glossary

### 3. Translation Quality

- Add translation confidence scores
- Allow users to rate translations
- Improve translations based on feedback

### 4. Voice Translation

- Translate voice input
- Text-to-speech in target language
- Real-time conversation translation

---

**Last Updated**: 2025-11-08
**Version**: 1.0.0
**Google Translate API Version**: v2
