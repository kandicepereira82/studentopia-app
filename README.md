# StudyPal - Your Personal Study Companion

StudyPal is a comprehensive mobile productivity app designed for students to stay organized, complete tasks, maintain focus, and promote wellness. Built with React Native and Expo, it features a colorful, playful, and highly customizable interface.

## Features

### 📝 Core Task Management
- **Task CRUD Operations**: Add, edit, delete, and complete tasks
- **Task Categories**: Homework, projects, exams, and other custom categories
- **Due Dates & Reminders**: Set due dates with custom reminder notifications
- **Task Filtering**: Filter tasks by category and status
- **Progress Tracking**: Daily and weekly progress bars with visual feedback
- **Task Status**: Mark tasks as pending or completed with celebration animations

### 📅 Calendar Integration
- **Month View**: Full calendar with color-coded task indicators
- **Date Selection**: Tap any date to view tasks scheduled for that day
- **Task Indicators**: Visual dots showing pending (orange) and completed (green) tasks
- **Navigation**: Easy month-to-month navigation with previous/next buttons

### ⏱️ Study Timer (Pomodoro)
- **Customizable Sessions**: Adjustable study (1-120 min) and break (1-60 min) durations
- **Visual Timer**: Large, easy-to-read countdown display
- **Session Modes**: Toggle between study (green) and break (blue) modes
- **Background Music**: Optional background music during sessions (coming soon)
- **Study Tracking**: Automatically logs study minutes to your stats

### 🤖 AI Learning Assistant
- **Chat Mode**: Get homework help, project research, content summarization, and resource suggestions
- **Grammar Checker Mode**: Check grammar, spelling, and punctuation with detailed explanations
- **Multi-language Support**: AI responds in your selected language
- **Conversation History**: View and manage your chat history
- **Clear Chat**: Reset conversations anytime

### 🎯 Motivation & Wellness
- **Daily Quotes**: Inspirational quotes from Big Life Journal, Dr. Shefali Tsabary, Einstein, and more
- **Study Tips**: Time management, focus techniques, and wellness advice
- **Mindfulness**: Breathing exercises and relaxation prompts
- **Gamification**: Achievement badges, daily streaks, and progress celebrations

### 🐾 Study Pal Companion
- **Animated Mascots**: Choose from 6 kawaii animals (cat, bunny, bear, dog, fox, panda)
- **Unique Animations**:
  - Cat: Blinking animation
  - Bunny: Hopping animation
  - Bear: Waving animation
  - Dog: Tail wagging animation
  - Fox: Head tilting animation
  - Panda: Gentle bobbing animation
- **Customization**: Name your Study Pal and toggle animations on/off
- **Motivational Messages**: Your Study Pal appears with encouragement throughout the app

### 🎨 Customization & Themes
- **6 Theme Colors**: Blue, Purple, Pink, Green, Orange, Red
- **Multi-language Support**: English, Spanish, French, German, Chinese, Japanese, Arabic
- **Personalization**: Custom username, Study Pal name and animal
- **Notifications**: Toggle push notifications on/off
- **Animation Settings**: Enable or disable mascot animations

### 📊 Progress Tracking & Stats
- **Total Tasks Completed**: Track your lifetime task completions
- **Daily Streaks**: Monitor consecutive days of task completion
- **Longest Streak**: See your best streak performance
- **Study Minutes**: Total time spent studying
- **Achievement Badges**: Unlock achievements for milestones

## Tech Stack

- **Framework**: React Native 0.76.7 with Expo SDK 53
- **Navigation**: React Navigation (Bottom Tabs)
- **State Management**: Zustand with AsyncStorage persistence
- **Styling**: NativeWind (TailwindCSS for React Native)
- **Animations**: React Native Reanimated v3
- **AI Integration**: OpenAI GPT-4 (Chat & Grammar Checking)
- **UI Components**: Expo Vector Icons, Linear Gradient
- **Date Handling**: date-fns

## Project Structure

```
src/
├── api/
│   ├── anthropic.ts           # Anthropic AI client
│   ├── openai.ts              # OpenAI client
│   ├── grok.ts                # Grok AI client
│   ├── chat-service.ts        # AI chat service wrapper
│   ├── transcribe-audio.ts    # Audio transcription
│   └── image-generation.ts    # Image generation
├── components/
│   └── StudyPal.tsx          # Animated mascot component
├── navigation/
│   └── BottomTabNavigator.tsx # Main app navigation
├── screens/
│   ├── OnboardingScreen.tsx   # Initial setup flow
│   ├── HomeScreen.tsx         # Dashboard with stats & quotes
│   ├── TasksScreen.tsx        # Task management
│   ├── CalendarScreen.tsx     # Calendar view
│   ├── TimerScreen.tsx        # Study/break timer
│   ├── AIHelperScreen.tsx     # AI chatbot
│   └── ProfileScreen.tsx      # Settings & customization
├── state/
│   ├── userStore.ts           # User preferences & settings
│   ├── taskStore.ts           # Task data management
│   ├── statsStore.ts          # User statistics
│   └── groupStore.ts          # Groups & collaboration (future)
├── types/
│   ├── index.ts               # TypeScript type definitions
│   └── ai.ts                  # AI-related types
└── utils/
    ├── cn.ts                  # Tailwind class merger
    ├── translations.ts        # Multi-language translations
    └── content.ts             # Motivational quotes & tips
```

## Key Features Implementation

### State Management
The app uses Zustand with AsyncStorage for persistent state:
- **User Store**: Language, theme, Study Pal config, notifications
- **Task Store**: All tasks with CRUD operations and filtering
- **Stats Store**: Achievements, streaks, study time tracking
- **Group Store**: Future collaboration features

### Multi-language Support
All UI text is translated through the `useTranslation` hook. Currently supports:
- English (en)
- Spanish (es)
- French (fr)
- German (de)
- Chinese (zh)
- Japanese (ja)
- Arabic (ar)

To add a new language, update `src/utils/translations.ts`.

### AI Integration
- Uses OpenAI GPT-4 for chat and grammar checking
- System prompts customized for each mode
- Responds in user's selected language
- Error handling with fallback messages

### Animations
Study Pal mascots use React Native Reanimated for smooth animations:
- Timing-based animations with easing
- Looping sequences for continuous movement
- Can be toggled on/off in settings

## Customization

### Adding New Animals
1. Add the animal type to `StudyPalAnimal` in `src/types/index.ts`
2. Add emoji and translation in `src/utils/translations.ts`
3. Add animation logic in `src/components/StudyPal.tsx`

### Adding New Theme Colors
1. Add color to `ThemeColor` type in `src/types/index.ts`
2. Add gradient colors to theme arrays in screens
3. Update translation keys if needed

### Adding New Languages
1. Add language code to `Language` type
2. Add full translation object in `src/utils/translations.ts`
3. Add quotes and tips in that language in `src/utils/content.ts`

## Future Enhancements

### Planned Features
- **Groups & Collaboration**: Student and teacher group features
- **Calendar Integration**: Sync with Google Calendar and Apple Calendar
- **Push Notifications**: Task reminders with custom alarm sounds
- **Mindfulness Breaks**: Classical music player and guided breathing
- **Resource Library**: Video and article suggestions from AI
- **Offline Mode**: Full functionality without internet
- **Data Export**: Export tasks and stats to CSV/PDF
- **Widgets**: Home screen widgets for quick task view
- **Dark Mode**: Full dark theme support (partial implementation)

## Development Notes

### Environment Variables
API keys are pre-configured in the Vibecode environment:
- `process.env.EXPO_PUBLIC_VIBECODE_OPENAI_API_KEY`
- `process.env.EXPO_PUBLIC_VIBECODE_ANTHROPIC_API_KEY`

### Best Practices
- Use double quotes for strings with apostrophes
- Avoid alerts; use custom modals instead
- All user-facing text should use `t()` translation function
- Use Pressable instead of TouchableOpacity
- Dismiss keyboard on scroll/tap outside input

### Performance
- Individual Zustand selectors to avoid re-renders
- Memoized calculations for progress bars
- Optimized FlatList/ScrollView rendering
- AsyncStorage for fast local data persistence

## Getting Started

The app runs automatically on Expo. No additional setup required.

## User Flow

1. **Onboarding**: Set username, name Study Pal, choose animal and theme
2. **Home**: View daily stats, motivational quote, and study tip
3. **Tasks**: Add and manage tasks with categories and due dates
4. **Calendar**: Visualize tasks on calendar, tap to view by date
5. **Timer**: Run study sessions with customizable durations
6. **AI Helper**: Ask questions or check grammar
7. **Profile**: Customize settings, view stats, manage preferences

## Credits

Built for students by AI, powered by:
- Vibecode (mobile app platform)
- OpenAI (AI assistance)
- Expo (React Native framework)
- React Native community packages

---

**Made with ❤️ for students everywhere**
