# Studentopia - Screenshot Design Specifications

Detailed specifications for creating the 8 App Store screenshots with exact layout, colors, text, and design elements.

---

## 🎨 Overall Design System

### Typography
- **Title Font:** Poppins Bold, 48px
- **Description Font:** Poppins Medium, 28px
- **UI Text:** Poppins Regular/SemiBold (as in app)

### Layout
- **Canvas Size:** 1290 x 2796 px (iPhone 15 Pro Max)
- **Safe Area:** 100px padding from edges
- **Title Position:** Top 250px (centered)
- **Description Position:** Below title, 150px
- **Device Frame:** Use or omit (both options work)

### Background Treatment
- **Gradient overlay** with theme colors
- **Blur effect** on edges to focus attention
- **Drop shadows** for depth
- **Rounded corners** for all cards/elements

---

## 📱 Screenshot 1: Home Screen & Companion

### Title Overlay
**Text:** "Meet Your Study Companion"
**Position:** Top center, 200px from top
**Font:** Poppins Bold, 52px
**Color:** White with 80% opacity shadow

### Description
**Text:** "Choose from 25 adorable animals to keep you motivated"
**Position:** Below title
**Font:** Poppins Medium, 30px
**Color:** White 90%

### Screen Content
**View:** Home Screen (HomeScreen.tsx)

**Elements to Show:**
1. **Header Section** (top)
   - Greeting: "Good morning, Alex!"
   - Date: "Monday, January 15, 2025"
   - Study Pal visible on right

2. **Companion Card** (center-prominent)
   - Red Panda (large, animated pose)
   - Speech bubble: "You've got 5 tasks today! Let's crush them! 🎯"
   - Background: Nature theme green gradient

3. **Quick Stats** (below companion)
   - Today: 3/5 tasks completed
   - Streak: 7 days 🔥
   - Study time: 2h 15m

4. **Today's Tasks Preview** (bottom third)
   - 2-3 tasks visible
   - Math Homework (due today, high priority)
   - History Essay (due tomorrow)
   - "View All Tasks" button

**Theme:** Nature (green)
**Time:** Morning (9:30 AM)

### Background
- Soft green gradient (top to bottom)
- Subtle pattern texture
- Vignette darkening edges

### Overlay Graphics
- Small sparkle icons around companion
- Floating task checkmarks
- Subtle leaf decorations

---

## 📱 Screenshot 2: Task Management

### Title Overlay
**Text:** "Stay Organized Effortlessly"
**Position:** Top center
**Color:** White with shadow

### Description
**Text:** "Create tasks, set reminders, and sync with your calendar"
**Position:** Below title
**Color:** White 90%

### Screen Content
**View:** Tasks Screen (TasksScreen.tsx)

**Elements to Show:**
1. **Header**
   - "Tasks" title
   - Search bar
   - Filter icon
   - Add task button (highlighted with glow)

2. **Category Tabs** (horizontal scroll)
   - All (selected)
   - Homework (3 badge)
   - Exam (1 badge)
   - Project (2 badge)
   - Reading (1 badge)

3. **Task Cards** (5-6 visible)

   **Task 1:** (checked, completed)
   - ✅ Math Practice Problems
   - Category: Homework
   - Due: Today, 3:00 PM
   - Priority: High
   - Calendar synced icon

   **Task 2:** (unchecked, pending)
   - ⬜ Chemistry Lab Report
   - Category: Homework
   - Due: Tomorrow, 11:59 PM
   - Priority: High
   - Reminder icon (bell)

   **Task 3:** (unchecked, pending)
   - ⬜ History Chapter 8 Reading
   - Category: Reading
   - Due: Wednesday, Jan 17
   - Priority: Medium

   **Task 4:** (unchecked, pending)
   - ⬜ Spanish Vocabulary Quiz Prep
   - Category: Exam
   - Due: Friday, Jan 19
   - Priority: High
   - Calendar synced icon

   **Task 5:** (unchecked, pending)
   - ⬜ English Essay Outline
   - Category: Project
   - Due: Next Monday
   - Priority: Medium

4. **Bottom Stats**
   - "15 tasks completed this week"
   - "3 tasks due today"

**Theme:** Ocean (blue)

### Background
- Blue gradient
- Water ripple pattern (subtle)

### Callouts
- Arrow pointing to "Add Task" button
- Text: "Create in seconds"
- Arrow pointing to calendar sync icon
- Text: "Auto-syncs"

---

## 📱 Screenshot 3: Pomodoro Timer & Music

### Title Overlay
**Text:** "Focus with Pomodoro Timer"
**Position:** Top center
**Color:** White

### Description
**Text:** "Study sessions with background music & scheduled breaks"
**Position:** Below title
**Color:** White 90%

### Screen Content
**View:** Timer Screen (TimerScreen.tsx) - Active session

**Elements to Show:**
1. **Header**
   - "Focus Timer"
   - Mode: Focus (25 min selected)
   - Switch to Break button visible

2. **Timer Display** (large, center)
   - Circular progress ring (60% complete)
   - Time: 15:30 remaining
   - Animated breathing effect
   - Companion visible in center breathing along

3. **Control Buttons** (below timer)
   - Pause button (large, primary)
   - Stop button
   - Settings button

4. **Background Music Player** (bottom section, expanded)
   - "Now Playing: Calm Piano Study Music"
   - Progress bar at 2:15 / 4:30
   - Album art thumbnail
   - Previous | Play/Pause | Next controls
   - Volume slider
   - Playlist button (showing "Study Playlist - 8 songs")

5. **Session Info**
   - "Session 2 of 4"
   - "Total focus time today: 1h 15m"
   - Next break in: 15:30

**Theme:** Sunset (orange/pink gradient)

### Background
- Warm orange to pink gradient
- Soft glow effect around timer
- Sunset sky texture

### Animation Indicators
- Pulsing timer ring
- Breathing companion
- Music note particles floating

---

## 📱 Screenshot 4: AI Study Assistant

### Title Overlay
**Text:** "Get Instant Homework Help"
**Position:** Top center
**Color:** White

### Description
**Text:** "ChatGPT, Claude & Grok tutors available 24/7 in 14 languages"
**Position:** Below title
**Color:** White 90%

### Screen Content
**View:** AI Helper Screen (AIHelperScreen.tsx)

**Elements to Show:**
1. **Header**
   - "AI Study Assistant"
   - Model selector: ChatGPT (selected)
   - Language: English
   - New chat button

2. **Chat Interface** (conversation visible)

   **User Message:**
   - "Can you explain photosynthesis in simple terms?"
   - Time: 2:45 PM

   **AI Response:**
   - Profile pic: ChatGPT logo
   - "Of course! Photosynthesis is how plants make their own food using sunlight. Here's the simple version:

   🌱 Plants take in:
   - Sunlight (energy)
   - Water (from roots)
   - Carbon dioxide (from air)

   ⚡ They use chlorophyll (green stuff in leaves) to convert these into:
   - Glucose (sugar for food)
   - Oxygen (released into air)

   📝 The equation:
   6CO₂ + 6H₂O + sunlight → C₆H₁₂O₆ + 6O₂

   Think of it like a solar-powered food factory! 🏭☀️"

   - Helpful buttons: "Explain More" | "Quiz Me" | "Related Topics"
   - Time: 2:45 PM

3. **Input Area** (bottom)
   - Text input: "Ask anything..."
   - Attach image button
   - Send button
   - Character count: 0/2000

4. **Suggested Video** (card below AI response)
   - Thumbnail: Biology video
   - "Photosynthesis Explained"
   - Duration: 8:45
   - Views: 2.4M

**Theme:** Galaxy (purple gradient)

### Background
- Deep purple to blue gradient
- Starfield pattern
- Glowing particle effects

### Callouts
- Badge: "Powered by GPT-4o"
- Badge: "14 Languages"
- Arrow pointing to model selector: "Choose your AI"

---

## 📱 Screenshot 5: Mindfulness & Breathing

### Title Overlay
**Text:** "Take Care of Your Mental Health"
**Position:** Top center
**Color:** White

### Description
**Text:** "Guided breathing, meditation & stress relief techniques"
**Position:** Below title
**Color:** White 90%

### Screen Content
**View:** Mindfulness Screen (MindfulnessScreen.tsx) - Breathwork active

**Elements to Show:**
1. **Header**
   - "Mindfulness Break"
   - Companion icon (small, top right)
   - Info button

2. **Tabs**
   - Breathwork (selected)
   - Tips
   - Acupressure

3. **Breathing Circle** (large, center)
   - Circular animation (expanding/contracting)
   - Current phase: "Hold" (4 seconds)
   - Circle size: Large (inhale phase)
   - Soft glow effect
   - Companion visible inside circle, breathing along

4. **Instructions** (below circle)
   - "Breathe in... 2... 3... 4"
   - Exercise: Box Breathing (4-4-4-4)
   - Progress: Round 3 of 5

5. **Session Timer** (bottom)
   - Total time: 5:00 / 10:00 minutes
   - Rounds completed: 2 / 5
   - Pause | Stop buttons

6. **Info Card** (very bottom)
   - "Box Breathing helps reduce stress and anxiety by activating your parasympathetic nervous system"
   - Icon: Heart with pulse

**Theme:** Nature (soft mint green)

### Background
- Calming mint green gradient
- Soft bokeh circles
- Gentle wave pattern

### Visual Elements
- Expanding/contracting circle animation
- Companion breathing synchronously
- Peaceful color palette
- Minimal, zen design

---

## 📱 Screenshot 6: Study Rooms & Collaboration

### Title Overlay
**Text:** "Study Together in Real-Time"
**Position:** Top center
**Color:** White

### Description
**Text:** "Join live rooms, sync timers & chat with friends"
**Position:** Below title
**Color:** White 90%

### Screen Content
**View:** Live Session Screen (StudyRoomScreen.tsx) - Active session

**Elements to Show:**
1. **Header**
   - Room name: "Finals Study Group"
   - Status: "Live" (green badge)
   - Participants: 4/10
   - Leave button

2. **Participants Section** (top third)
   - List of 4 participants with avatars:
     - Alex (You) - Red Panda - Host 👑
     - Sarah - Fox - Studying
     - Mike - Cat - On Break
     - Emma - Owl - Studying
   - Each has Study Pal animal avatar
   - Status indicators (studying/break)

3. **Synchronized Timer** (center)
   - Circular timer: 18:45 remaining
   - Mode: Focus Session
   - All participants see same time
   - Host controls visible (Start/Pause/Stop)

4. **Chat Section** (bottom half)

   **Recent Messages:**
   - Emma: "Good luck everyone! 📚"
   - Mike: "Taking a quick break, back in 5"
   - Sarah: "Does anyone understand question 3?"
   - System: "Alex started the timer"
   - You: "Let's focus for 20 minutes!"

5. **Input Area**
   - Message input: "Type a message..."
   - Send button
   - Emoji button

6. **Action Bar** (bottom)
   - Invite friends button
   - Timer settings
   - Mute notifications
   - Room settings (host only)

**Theme:** Rainbow (colorful gradient)

### Background
- Vibrant rainbow gradient
- Confetti particles
- Energetic, collaborative feel

### Callouts
- Badge: "Synchronized Timer"
- Badge: "4 Active Users"
- Highlight: Host controls

---

## 📱 Screenshot 7: Customization & Themes

### Title Overlay
**Text:** "Make It Your Own"
**Position:** Top center
**Color:** White

### Description
**Text:** "8 beautiful themes, dark mode & companion customization"
**Position:** Below title
**Color:** White 90%

### Screen Content
**Split Screen Layout**

**Left Half: Light Mode**
- Background: Ocean theme (light blue)
- Companion: Fox with backpack
- UI: Light cards, white backgrounds

**Right Half: Dark Mode**
- Background: Ocean theme (dark blue)
- Same Fox with backpack
- UI: Dark cards, dark backgrounds

**Center Divider Line**
- Vertical split with gradient
- Icons: ☀️ (left) | 🌙 (right)

**Bottom Section: Theme Showcase**
- 8 circular theme swatches in a row:
  1. Nature (green)
  2. Ocean (blue)
  3. Galaxy (purple)
  4. Rainbow (multicolor)
  5. Sunset (orange/pink)
  6. Arctic (ice blue)
  7. Golden (yellow)
  8. Cherry (pink)
- Each labeled with theme name
- Selected: Ocean (both light & dark shown above)

**Overlay Panel: Companion Customization**
- Semi-transparent card floating
- Preview: Cat with glasses and hoodie
- Options visible:
  - Animal selector (25 animals)
  - Background color (18 colors)
  - Accessories (backpack, books, etc.)
  - Outfit (study hoodie selected)
  - Glasses toggle (ON)
  - Headphones toggle (OFF)

### Background
- Split gradient matching light/dark theme
- Theme color swatches at bottom
- Customization panel overlay

### Callouts
- "8 Themes" badge
- "Light & Dark" badge
- "25 Companions" badge
- "Endless Combinations" text

---

## 📱 Screenshot 8: Progress & Achievements

### Title Overlay
**Text:** "Track Your Growth"
**Position:** Top center
**Color:** White

### Description
**Text:** "View stats, streaks & unlock achievements"
**Position:** Below title
**Color:** White 90%

### Screen Content
**View:** Profile/Statistics Screen

**Elements to Show:**
1. **Header**
   - "My Progress"
   - Date range: "This Month"
   - Export data button

2. **Key Stats Cards** (3 large cards, horizontal)

   **Card 1: Tasks Completed**
   - Large number: 127
   - Label: "Tasks Completed"
   - Change: +23 from last month (↑)
   - Icon: Checkmark circle

   **Card 2: Current Streak**
   - Large number: 14 days 🔥
   - Label: "Current Streak"
   - Longest: 28 days
   - Icon: Fire

   **Card 3: Study Time**
   - Large number: 45h 30m
   - Label: "Total Focus Time"
   - Average: 1.5h/day
   - Icon: Timer

3. **Weekly Activity Graph** (bar chart)
   - X-axis: Mon-Sun
   - Y-axis: Study hours (0-4)
   - Bars showing: 2h, 3h, 1.5h, 2.5h, 3h, 0h, 4h
   - Highest day highlighted: Sunday (4h)

4. **Achievements Section**
   - Title: "Recent Achievements"
   - 4 achievement badges displayed:

     **Achievement 1: Task Master** ✅
     - "Complete 100 tasks"
     - Unlocked: Jan 12, 2025
     - Gold badge with checkmark

     **Achievement 2: Study Streak** 🔥
     - "Maintain 14-day streak"
     - Unlocked: Today!
     - Silver badge with fire

     **Achievement 3: Focus Champion** ⏱️
     - "Study for 40+ hours"
     - Unlocked: Jan 10, 2025
     - Bronze badge with timer

     **Achievement 4: Early Bird** 🌅
     - Locked (grayed out)
     - "Study before 7 AM for 7 days"
     - Progress: 2/7 days

5. **Companion Message** (bottom)
   - Companion saying: "You're doing amazing! Keep up the great work! 🌟"
   - Motivational quote

**Theme:** Golden (warm yellow/orange)

### Background
- Golden gradient (sunrise feel)
- Subtle trophy/star patterns
- Celebratory atmosphere

### Visual Elements
- Progress bars with animations
- Sparkle effects on achievements
- Confetti particles
- Rising graph indicators
- Trophy icons

### Callouts
- "127 Tasks Completed" highlight
- "14 Day Streak 🔥" highlight
- "45+ Hours Focused" highlight

---

## 🎨 Design Assets Needed

### Icons
- Checkmark (tasks)
- Fire (streak)
- Timer/Clock
- Calendar
- Music note
- Brain (AI)
- Heart (mindfulness)
- People (collaboration)
- Trophy (achievements)
- Star (rating/favorites)

### Companion Animals (Rendered)
- Red Panda (primary)
- Fox
- Cat
- Dog
- Owl
- Need all 25 in consistent style

### UI Elements
- Task cards
- Timer circles
- Progress bars
- Chat bubbles
- Modal overlays
- Button styles
- Tab bars

### Backgrounds
- Theme gradients (all 8)
- Texture patterns
- Particle effects
- Bokeh circles

---

## 📐 Export Settings

### File Format
- **PNG** (lossless, transparent support)
- **Color Profile:** sRGB
- **Resolution:** 72 DPI (screen)

### Optimization
- Compress with TinyPNG or ImageOptim
- Target file size: <500 KB per screenshot
- Maintain quality at 80-90%

### Naming Convention
```
screenshot_01_home.png
screenshot_02_tasks.png
screenshot_03_timer.png
screenshot_04_ai.png
screenshot_05_mindfulness.png
screenshot_06_collaboration.png
screenshot_07_customization.png
screenshot_08_progress.png
```

---

## 🎯 Design Principles

### Consistency
- Use actual app UI (no mockups)
- Match theme colors exactly
- Keep fonts consistent (Poppins)
- Maintain spacing/padding

### Clarity
- Single focus per screenshot
- Large, readable text (14px minimum)
- High contrast
- Clear hierarchy

### Appeal
- Vibrant colors
- Smooth gradients
- Professional polish
- Engaging visuals

### Authenticity
- Real data examples
- Realistic use cases
- Diverse user representation
- Relatable scenarios

---

## ✅ Screenshot Checklist

Before submitting, verify:

**Technical:**
- [ ] Correct dimensions (1290 x 2796 px)
- [ ] PNG format, sRGB color space
- [ ] File size under 500 KB each
- [ ] No transparency issues
- [ ] Text is readable at thumbnail size

**Content:**
- [ ] No personal information visible
- [ ] No placeholder text ("Lorem ipsum")
- [ ] No debug information
- [ ] Realistic dates (not far future/past)
- [ ] Proper grammar and spelling

**Design:**
- [ ] Title overlay readable
- [ ] Companion visible and cute
- [ ] Theme colors applied correctly
- [ ] UI elements not cut off
- [ ] Consistent style across all 8

**Branding:**
- [ ] App name mentioned
- [ ] Key features highlighted
- [ ] Unique value props clear
- [ ] Professional appearance
- [ ] Target audience appeal

---

## 🚀 Screenshot Testing

### A/B Test Ideas
Test different versions to see what converts better:

**Test 1: Companion Prominence**
- Version A: Large companion front and center
- Version B: UI-focused with companion smaller
- Metric: Install conversion rate

**Test 2: Text Overlay Style**
- Version A: Minimal text, focus on visuals
- Version B: Descriptive text with features listed
- Metric: Time on page

**Test 3: Color Schemes**
- Version A: Warm colors (sunset, golden)
- Version B: Cool colors (ocean, nature)
- Metric: Click-through rate

**Test 4: Feature Order**
- Version A: Tasks → Timer → AI → Social
- Version B: AI → Tasks → Social → Timer
- Metric: Feature discovery in-app

---

## 💡 Pro Tips

1. **Use Real Data**
   - Create realistic tasks with real subject names
   - Use actual dates (today, tomorrow, specific days)
   - Show genuine progress numbers

2. **Show Activity**
   - Active timers counting down
   - Recent chat messages
   - Notifications/badges
   - Live sessions in progress

3. **Highlight Unique Features**
   - 25 companions (not found elsewhere)
   - AI tutoring (competitive advantage)
   - Real-time collaboration (differentiator)
   - Mindfulness integration (holistic approach)

4. **Tell a Story**
   - Screenshot 1: Meet your companion
   - Screenshot 2: Get organized
   - Screenshot 3: Focus and study
   - Screenshot 4: Get help when stuck
   - Screenshot 5: Take care of mental health
   - Screenshot 6: Study with friends
   - Screenshot 7: Make it yours
   - Screenshot 8: Track your success

5. **Test on Device**
   - View screenshots on actual phone
   - Check readability at different brightness
   - Test with color-blind simulation
   - Verify on App Store/Play Store preview

---

**Ready to create stunning screenshots that convert! 📸✨**
