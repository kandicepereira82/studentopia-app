# Calendar Integration Guide

StudyPal allows you to sync your tasks with Google Calendar and Apple Calendar for seamless productivity management across all your devices.

## 📱 Apple Calendar Integration (iOS)

### Method 1: Manual Export/Import

1. **Export Tasks from StudyPal**:
   - Go to Settings → Export Data
   - Select "Export as iCal (.ics)"
   - Save the file to your device

2. **Import to Apple Calendar**:
   - Open the exported .ics file
   - Tap "Add All" to import events
   - Choose which calendar to add them to
   - Tap "Done"

### Method 2: Using EventKit (Built-in)

StudyPal uses EventKit framework for native iOS calendar integration:

1. **Enable Calendar Sync in StudyPal**:
   - Go to Settings → Calendar Sync
   - Toggle "Sync with Apple Calendar"
   - Grant calendar permissions when prompted

2. **Choose Sync Options**:
   - Select which categories to sync (Homework, Projects, Exams)
   - Enable two-way sync for automatic updates
   - Set sync frequency (Instant, Hourly, Daily)

3. **View in Apple Calendar**:
   - Open Apple Calendar app
   - StudyPal tasks appear as events
   - Color-coded by category
   - Includes due dates and times

## 🌐 Google Calendar Integration

### Method 1: Manual Export/Import

1. **Export Tasks from StudyPal**:
   - Go to Settings → Export Data
   - Select "Export as iCal (.ics)"
   - Share the file to yourself via email or cloud storage

2. **Import to Google Calendar**:
   - Open Google Calendar on your computer
   - Click the gear icon → Settings
   - Select "Import & Export" from the left sidebar
   - Click "Select file from your computer"
   - Choose your .ics file
   - Select which calendar to add events to
   - Click "Import"

### Method 2: Using Calendar API (Coming Soon)

We're working on direct Google Calendar API integration:

1. **Connect Google Account**:
   - Go to Settings → Calendar Sync
   - Tap "Connect Google Calendar"
   - Sign in with your Google account
   - Grant StudyPal calendar permissions

2. **Configure Sync Settings**:
   - Choose calendar to sync with
   - Enable two-way sync
   - Set sync frequency
   - Select categories to sync

3. **Automatic Sync**:
   - Tasks automatically appear in Google Calendar
   - Updates sync in both directions
   - Completed tasks marked in both apps

## 🔄 Two-Way Sync Features

When enabled, two-way sync provides:

- **StudyPal → Calendar**: All tasks appear as calendar events
- **Calendar → StudyPal**: Events created in calendar sync back as tasks
- **Real-time Updates**: Changes sync instantly across devices
- **Completion Status**: Mark tasks complete in either app
- **Notifications**: Receive reminders from both apps

## ⚙️ Sync Settings

### Customization Options:

- **Sync Frequency**: Instant, Every 15 min, Hourly, Daily
- **Categories**: Choose which task categories to sync
- **Calendar Selection**: Pick specific calendars to sync with
- **Notification Preferences**: Manage how you receive reminders
- **Conflict Resolution**: Choose priority when edits conflict

## 🔔 Reminders & Notifications

StudyPal tasks synced to calendars include:

- Due date and time
- Task description
- Category tags
- Custom reminders (15 min, 1 hour, 1 day before)
- Location (if added)

## 🔐 Privacy & Permissions

### Required Permissions:

**iOS (Apple Calendar)**:
- Calendar Access: Read and write events
- Reminder Access: Create and manage reminders

**Android (Google Calendar)**:
- Calendar Access: Read and write events
- Internet Access: Sync with Google servers

### Data Privacy:

- Only task data you choose to sync is shared
- Sync data is encrypted in transit
- You can disconnect at any time
- Deleting tasks removes them from synced calendars

## ❓ Troubleshooting

### Tasks Not Syncing?

1. Check internet connection
2. Verify calendar permissions are granted
3. Ensure sync is enabled in Settings
4. Try manual refresh (pull down in Tasks screen)
5. Re-authenticate calendar connection

### Duplicate Events?

1. Disable duplicate sync settings
2. Remove old imported .ics files
3. Use only one sync method at a time
4. Contact support if issues persist

### Sync Conflicts?

When tasks are edited in both apps:
- StudyPal uses "Last Modified Wins" strategy
- Most recent change takes priority
- You'll be notified of conflicts
- Can manually resolve in Settings

## 📞 Support

Need help with calendar integration?

- In-app: Settings → Help & Support
- Email: support@studypal.app
- Documentation: docs.studypal.app/calendar-sync

## 🚀 Coming Soon

Planned calendar integration features:

- ✨ Direct Google Calendar API integration
- ✨ Microsoft Outlook Calendar sync
- ✨ Shared calendar for study groups
- ✨ Smart scheduling suggestions
- ✨ Calendar widget for home screen
- ✨ Recurring task patterns
