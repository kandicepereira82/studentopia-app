# Beta Testing Guide for Studentopia

Complete step-by-step guide to share your app with beta testers and collect feedback.

---

## 📱 iOS Beta Testing with TestFlight

### Step 1: Prepare Your App for TestFlight

#### 1.1 Build Your App for Production

```bash
# Navigate to your project directory
cd /home/user/workspace

# Install dependencies if needed
bun install

# Build the iOS app
npx expo prebuild --platform ios

# Or use EAS Build (recommended)
npx eas-cli build --platform ios --profile preview
```

#### 1.2 Configure app.json

Make sure your `app.json` has correct bundle identifier:

```json
{
  "expo": {
    "name": "Studentopia",
    "slug": "studentopia",
    "version": "1.0.0",
    "ios": {
      "bundleIdentifier": "com.yourcompany.studentopia",
      "buildNumber": "1.0.0",
      "supportsTablet": true
    }
  }
}
```

### Step 2: Set Up Apple Developer Account

#### 2.1 Enroll in Apple Developer Program
- Cost: $99/year
- Go to: https://developer.apple.com/programs/
- Click "Enroll"
- Complete registration (takes 24-48 hours)

#### 2.2 Create App in App Store Connect
1. Go to https://appstoreconnect.apple.com
2. Click "My Apps" → "+" → "New App"
3. Fill in:
   - **Platform:** iOS
   - **Name:** Studentopia
   - **Primary Language:** English
   - **Bundle ID:** com.yourcompany.studentopia (must match app.json)
   - **SKU:** studentopia-001 (unique identifier)
   - **User Access:** Full Access

### Step 3: Upload Build to TestFlight

#### Option A: Using EAS Build (Easiest - Recommended)

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo account
eas login

# Configure EAS
eas build:configure

# Submit build to TestFlight
eas submit --platform ios --latest
```

Follow prompts to enter:
- Apple ID
- App-specific password (generate at appleid.apple.com)
- Bundle identifier

#### Option B: Using Xcode

1. Open your project in Xcode:
   ```bash
   cd ios
   open Studentopia.xcworkspace
   ```

2. Select target device: "Any iOS Device"

3. Product → Archive

4. Window → Organizer → Upload to App Store

5. Wait 10-30 minutes for processing

### Step 4: Set Up TestFlight

#### 4.1 Add Beta Testers

**Internal Testing (up to 100 testers):**
1. Go to App Store Connect → TestFlight
2. Click your app → "Internal Testing"
3. Click "+" → Add Internal Testers
4. Enter emails of team members
5. They receive email invite instantly

**External Testing (up to 10,000 testers):**
1. Go to "External Testing"
2. Create a new group: "Studentopia Beta Group"
3. Add build to test
4. Add beta test information:
   - What to test
   - Feedback email
   - Privacy policy URL (required)
5. Submit for Beta App Review (takes 24-48 hours)
6. Once approved, add tester emails

#### 4.2 Invite Testers

Option 1: **Email Invites**
- Add email addresses in TestFlight
- Testers receive invite email
- They tap "View in TestFlight"
- Install TestFlight app from App Store
- Install Studentopia

Option 2: **Public Link** (External Testing only)
- TestFlight → Select Group → Enable Public Link
- Share link: `https://testflight.apple.com/join/ABC123XYZ`
- Anyone with link can join (up to 10,000)

### Step 5: Beta Tester Instructions (iOS)

Send this to your testers:

```
🎉 You're invited to beta test Studentopia!

STEP 1: Install TestFlight
- Open App Store on your iPhone
- Search "TestFlight"
- Install the TestFlight app (free, by Apple)

STEP 2: Accept Invite
- Check your email for TestFlight invite
- Tap "View in TestFlight" button
- Or use this link: [INSERT YOUR PUBLIC LINK]

STEP 3: Install Studentopia
- TestFlight app will open
- Tap "Accept" then "Install"
- Studentopia will appear on your home screen

STEP 4: Start Testing!
- Open Studentopia and explore
- Try all features
- Report bugs using feedback form

Questions? Reply to this email!
```

---

## 🤖 Android Beta Testing with Google Play

### Step 1: Prepare Your App for Google Play

#### 1.1 Build Your App for Production

```bash
# Navigate to your project directory
cd /home/user/workspace

# Build the Android app
npx expo prebuild --platform android

# Or use EAS Build (recommended)
npx eas-cli build --platform android --profile preview
```

#### 1.2 Configure app.json

```json
{
  "expo": {
    "android": {
      "package": "com.yourcompany.studentopia",
      "versionCode": 1,
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#4CAF50"
      }
    }
  }
}
```

### Step 2: Set Up Google Play Console

#### 2.1 Create Google Play Developer Account
- Cost: $25 one-time fee
- Go to: https://play.google.com/console
- Click "Sign up"
- Pay registration fee
- Complete verification (instant)

#### 2.2 Create App in Google Play Console
1. Click "Create app"
2. Fill in:
   - **App name:** Studentopia
   - **Default language:** English (United States)
   - **App or game:** App
   - **Free or paid:** Free
3. Accept declarations
4. Click "Create app"

### Step 3: Upload Build to Google Play

#### Option A: Using EAS Build (Easiest)

```bash
# Submit build to Google Play
eas submit --platform android --latest
```

Follow prompts:
- Google Service Account JSON key
- Track: Internal testing

#### Option B: Manual Upload

1. Generate signed APK/AAB:
   ```bash
   cd android
   ./gradlew bundleRelease
   ```

2. Go to Google Play Console
3. Select app → Internal testing
4. Click "Create new release"
5. Upload AAB file from:
   `android/app/build/outputs/bundle/release/app-release.aab`

### Step 4: Set Up Internal Testing Track

#### 4.1 Configure Internal Testing
1. Google Play Console → Select app
2. Left menu → Testing → Internal testing
3. Click "Create new release"
4. Upload your AAB file
5. Add release notes:
   ```
   Beta Release v1.0.0

   Test all features:
   - Task management
   - Pomodoro timer
   - AI study assistant
   - Mindfulness exercises
   - Study rooms
   - Companion customization

   Please report any bugs or issues!
   ```
6. Click "Review release"
7. Click "Start rollout to Internal testing"

#### 4.2 Add Beta Testers

**Create Tester List:**
1. Testing → Internal testing → Testers tab
2. Click "Create email list"
3. List name: "Studentopia Beta Testers"
4. Add emails (one per line):
   ```
   tester1@gmail.com
   tester2@gmail.com
   tester3@gmail.com
   ```
5. Click "Save changes"

**Or Use Google Group:**
1. Create Google Group at groups.google.com
2. Name it: "studentopia-beta-testers@googlegroups.com"
3. Add members to group
4. In Play Console, add the group email

### Step 5: Share Testing Link

#### 5.1 Get Opt-In URL
1. Internal testing → Testers tab
2. Copy "Copy link" under opt-in URL
3. Looks like: `https://play.google.com/apps/internaltest/1234567890`

#### 5.2 Beta Tester Instructions (Android)

Send this to your testers:

```
🎉 You're invited to beta test Studentopia!

STEP 1: Accept Beta Invite
- Open this link on your Android phone: [INSERT OPT-IN URL]
- Tap "Become a tester"
- Tap "Download it on Google Play"

STEP 2: Install Studentopia
- Google Play Store will open
- Tap "Install"
- Studentopia will appear on your home screen

STEP 3: Start Testing!
- Open Studentopia and explore
- Try all features
- Report bugs using feedback form

Note: You'll see "Internal test" badge in Play Store

Questions? Reply to this email!
```

---

## 📋 Beta Testing Process

### Week 1: Initial Testing

#### Day 1: Send Invites
- Send TestFlight/Play Store invites to 5-10 testers
- Include testing instructions
- Set expectation: 1-2 weeks of testing

#### Day 2-3: Onboarding Check
- Follow up with testers
- Confirm they installed successfully
- Answer any setup questions

#### Day 4-7: Active Testing
- Monitor feedback channels
- Respond to bug reports within 24 hours
- Track issues in spreadsheet/Notion

### Week 2: Iterate and Improve

#### Day 8-10: Fix Critical Bugs
- Prioritize crashes and blockers
- Upload new build to TestFlight/Play Store
- Notify testers of update

#### Day 11-14: Collect Feedback
- Send feedback survey
- Schedule 15-min calls with 2-3 testers
- Analyze usage patterns

---

## 📝 Feedback Collection Methods

### Method 1: In-App Feedback Form

Add a feedback button in Settings:

```typescript
// In SettingsScreen.tsx
const handleSendFeedback = () => {
  Linking.openURL('mailto:feedback@studentopia.app?subject=Beta Feedback');
};

// Add this button in Settings:
<Pressable
  onPress={handleSendFeedback}
  className="rounded-2xl p-4 mb-3"
  style={{ backgroundColor: theme.primary }}
>
  <View className="flex-row items-center justify-center">
    <Ionicons name="mail-outline" size={20} color="white" />
    <Text className="text-white font-semibold ml-2">Send Feedback</Text>
  </View>
</Pressable>
```

### Method 2: Google Form Survey

Create form at forms.google.com with these questions:

```
Beta Testing Survey - Studentopia

1. How would you rate your overall experience? (1-5 stars)

2. What features did you use most?
   □ Task Management
   □ Pomodoro Timer
   □ AI Study Assistant
   □ Mindfulness
   □ Study Rooms
   □ Companion Customization

3. Did you encounter any bugs or issues?
   (Open text)

4. What features were confusing or hard to use?
   (Open text)

5. What features are you most excited about?
   (Open text)

6. What's missing? What would you like to see added?
   (Open text)

7. Would you recommend Studentopia to a friend? (1-10)

8. Any other comments?
   (Open text)
```

Share link: `https://forms.gle/ABC123XYZ`

### Method 3: TestFlight Feedback (iOS Only)

Testers can shake device → Send Beta Feedback
- Automatic screenshot capture
- Device info included
- Goes to App Store Connect → TestFlight → Feedback

### Method 4: 1-on-1 User Interviews

Schedule 15-minute Zoom calls:

**Interview Script:**
```
Thanks for testing Studentopia!

Warm-up (2 min):
- What grade/year are you in?
- What study apps do you currently use?

App Tour (10 min):
- Can you open Studentopia and show me around?
- Walk me through how you added your first task
- Show me your favorite feature
- Is there anything confusing?

Wrap-up (3 min):
- What would make you use this daily?
- Would you pay for this app?
- Who else should try this?
```

---

## 🐛 Bug Tracking Template

Create a spreadsheet to track issues:

| ID | Reporter | Date | Issue | Severity | Status | Build | Notes |
|----|----------|------|-------|----------|--------|-------|-------|
| 1 | Sarah M. | 1/15 | Timer not counting down | Critical | Fixed | 1.0.0 | Fixed in v1.0.1 |
| 2 | Mike T. | 1/16 | Dark mode colors off in Settings | Low | Open | 1.0.0 | |
| 3 | Emma L. | 1/16 | AI response takes too long | Medium | Investigating | 1.0.0 | Network issue? |

**Severity Levels:**
- **Critical:** App crashes, data loss, feature completely broken
- **High:** Major feature not working as expected
- **Medium:** Minor bug affecting user experience
- **Low:** UI polish, typos, edge cases

---

## 📊 Beta Testing Metrics to Track

### Quantitative Metrics
- Installation rate (invites sent vs installs)
- Daily active users
- Session length
- Feature usage rates
- Crash rate
- Bug reports per tester

### Qualitative Metrics
- Overall satisfaction (1-5 stars)
- Feature clarity (easy to use?)
- Performance perception (fast/slow?)
- Design appeal (love the UI?)
- Likelihood to recommend (NPS score)

---

## ✅ Beta Testing Checklist

### Before Launch
- [ ] Build uploaded to TestFlight/Play Store
- [ ] Privacy policy published
- [ ] Feedback form/survey created
- [ ] Beta tester emails collected (5-10 people)
- [ ] Testing instructions written
- [ ] Bug tracking spreadsheet ready

### Week 1
- [ ] Send invites to all testers
- [ ] Confirm all testers installed successfully
- [ ] Monitor feedback channels daily
- [ ] Respond to questions within 24 hours
- [ ] Track bugs in spreadsheet

### Week 2
- [ ] Fix critical bugs
- [ ] Upload new build (v1.0.1)
- [ ] Send feedback survey
- [ ] Schedule 2-3 user interviews
- [ ] Analyze feedback and prioritize features

### Before Public Launch
- [ ] All critical bugs fixed
- [ ] At least 80% tester satisfaction
- [ ] App Store screenshots finalized
- [ ] App description written
- [ ] Keywords optimized
- [ ] Support email ready
- [ ] Marketing materials prepared

---

## 👥 Recruiting Beta Testers

### Where to Find Testers

**1. Friends & Family**
- Start with 3-5 people you know
- High engagement, honest feedback
- Mix of students, teachers, parents

**2. Reddit Communities**
- r/studying (300K members)
- r/GetStudying (100K members)
- r/productivity (2M members)
- r/college (1M members)
- Post: "Looking for beta testers for new study app"

**3. Discord Servers**
- Study Together servers
- Productivity Discord communities
- Student Discord servers
- Offer early access as incentive

**4. Twitter/X**
- Tweet: "Building a study companion app with 25 cute animals 🐾 Looking for 10 beta testers! DM if interested"
- Use hashtags: #betatesters #studyapp #productivity

**5. Product Hunt**
- Create "Coming Soon" page
- Collect email signups
- Announce beta testing

**6. University/School Groups**
- Facebook groups for students
- WhatsApp study groups
- Student organization newsletters
- Ask teachers to share with classes

### Beta Tester Recruitment Email Template

```
Subject: Beta Test Studentopia - New Study Companion App 🎓

Hi [Name],

I'm launching Studentopia, a new study productivity app, and I'd love your feedback!

WHAT IS IT?
Studentopia helps students stay organized with:
- Task management with calendar sync
- Pomodoro focus timer
- AI study assistant (ChatGPT, Claude, Grok)
- Mindfulness & breathing exercises
- Study rooms to collaborate with friends
- 25 adorable animal companions 🐾

WHY BETA TEST?
- Be the first to try it (before public launch)
- Shape the product with your feedback
- Free lifetime premium access
- Your name in credits (if you want!)

TIME COMMITMENT:
- Install app (5 min)
- Use for 1-2 weeks
- Fill out short survey (5 min)
- Optional: 15-min feedback call

PLATFORMS:
iOS and Android

Interested? Reply to this email and I'll send you the TestFlight/Play Store link!

Best,
[Your Name]
Founder, Studentopia
```

---

## 🎁 Beta Tester Incentives

### Reward Ideas

**Free Version:**
- Early access badge in app
- Name in credits
- Influence product roadmap

**Paid Version:**
- Lifetime premium access (worth $29.99)
- Exclusive "Beta Tester" achievement
- First to get new features

**Other Incentives:**
- $10 Amazon gift card for completed survey
- Entered into raffle for $50 gift card
- Free Studentopia merch (stickers, t-shirt)
- Personal thank you video
- LinkedIn recommendation

---

## 📱 Alternative Beta Testing Platforms

### BetaList (betalist.com)
- Submit your app to directory
- Get featured to 200K+ early adopters
- Free or $149 for premium listing

### BetaBound (betabound.com)
- Community of beta testers
- Free to post projects
- Good for finding engaged testers

### Centercode (centercode.com)
- Professional beta testing platform
- Costs $99-499/month
- Better for larger betas (50+ testers)

### Testfairy (testfairy.com)
- Alternative to TestFlight
- Better analytics and video recordings
- Free for up to 200 testers

---

## 🚀 Quick Start Guide

**Fastest way to get 5 beta testers today:**

1. **Build & Upload** (2 hours)
   - Run `eas build --platform ios --profile preview`
   - Run `eas submit --platform ios`
   - Wait for TestFlight processing

2. **Recruit Testers** (1 hour)
   - Text 3 friends who are students
   - Post in r/studying subreddit
   - Tweet looking for beta testers

3. **Send Invites** (30 min)
   - Add emails to TestFlight
   - Send testing instructions
   - Create feedback Google Form

4. **Monitor** (ongoing)
   - Check feedback daily
   - Respond to questions
   - Track bugs

5. **Iterate** (1 week)
   - Fix critical bugs
   - Upload new build
   - Thank testers

**Total time to first tester:** 3-4 hours

---

## 💡 Pro Tips

1. **Start Small**
   - 5 engaged testers > 50 inactive testers
   - Focus on quality feedback

2. **Set Expectations**
   - Tell testers what to focus on
   - Give them specific tasks
   - Set testing timeline (1-2 weeks)

3. **Make it Easy**
   - Clear installation instructions
   - Simple feedback form
   - Respond to questions quickly

4. **Show Appreciation**
   - Thank testers publicly
   - Implement their suggestions
   - Keep them updated on progress

5. **Iterate Fast**
   - Fix bugs within 24-48 hours
   - Ship updates weekly
   - Show testers their impact

6. **Build Excitement**
   - Share behind-the-scenes progress
   - Tease new features
   - Create FOMO for public launch

---

## 🎯 Success Criteria

**You're ready for public launch when:**

✅ 5+ beta testers completed testing
✅ 80%+ satisfaction rating
✅ Zero critical bugs
✅ All core features working
✅ App Store screenshots ready
✅ Description written
✅ Support system in place
✅ Privacy policy published

**Typical beta testing timeline:**
- Week 1: Recruitment & onboarding (5-10 testers)
- Week 2: Active testing & bug fixes
- Week 3: Feedback collection & iteration
- Week 4: Final polish & prepare for launch

---

## 📧 Sample Follow-Up Emails

### Day 3: Check-In Email
```
Subject: How's Studentopia going?

Hi [Name],

Just checking in! Have you had a chance to install Studentopia?

If you're stuck, here's the TestFlight link again:
[LINK]

Let me know if you have any questions!

Best,
[Your Name]
```

### Day 7: Feedback Request
```
Subject: Quick favor - 5 min survey?

Hi [Name],

You've been using Studentopia for a week now! 🎉

Could you fill out this quick survey (5 min)?
[GOOGLE FORM LINK]

Your feedback will directly shape the app.

Thank you!
[Your Name]
```

### Day 14: Thank You Email
```
Subject: Thank you for beta testing! 🙏

Hi [Name],

Beta testing is wrapping up and I wanted to say THANK YOU!

Your feedback helped:
- Fix 12 bugs
- Improve the UI
- Add 3 new features

As a thank you, you'll get:
- Lifetime premium access (worth $29.99)
- Beta Tester badge in the app
- Early access to all new features

The public launch is February 1st. I'll keep you posted!

Gratefully,
[Your Name]
```

---

**You're all set to start beta testing! 🚀**

Start with 5 close friends/family, get their feedback, iterate, then expand to 10-20 public beta testers before launch.
