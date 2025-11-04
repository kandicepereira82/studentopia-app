# Pixabay Music Integration Guide

## Overview

Your StudyPal app now includes a beautiful music player with a curated selection of calming, peaceful, and uplifting classical music from Pixabay. The music player features playback controls, volume adjustment, looping, and a mood-based filter system.

## Features

### Music Player Tab
- **Location**: New "Music" tab in bottom navigation (between Timer and AI Helper)
- **Icon**: Musical notes icon
- **6 Curated Tracks**: Pre-selected calming classical music perfect for studying

### Playback Controls
- **Play/Pause**: Large circular button for easy control
- **Stop**: Reset playback to beginning
- **Loop**: Toggle to repeat current track
- **Volume Slider**: Adjust volume from 0% to 100%
- **Progress Bar**: Scrub through the track with real-time position display
- **Time Display**: Shows current position and total duration

### Music Library
- **Mood Filters**: Filter by Calming, Uplifting, Peaceful, or All
- **Track Information**: Each track shows title, artist, mood, and genre
- **Currently Playing**: Active track is highlighted with theme color border

## How to Use Pixabay Music

Since Pixabay does not provide a direct API for music, you need to manually download and host the audio files. Here's how:

### Step 1: Download Music from Pixabay

1. Open the Music Player in your app
2. Tap on any track in the Music Library
3. In the modal that opens, tap "Open Pixabay Link"
4. This takes you to Pixabay where you can:
   - Preview the music
   - Download the MP3 file (100% royalty-free)
   - See license details

### Step 2: Host the Audio File

You have several options to host the downloaded MP3:

#### Option A: Cloud Storage (Recommended)
**Dropbox:**
1. Upload the MP3 to your Dropbox
2. Get the sharing link
3. Change `?dl=0` at the end to `?dl=1` to get direct download link

**Google Drive:**
1. Upload the MP3 to Google Drive
2. Right-click → Get link → Anyone with the link can view
3. Extract the FILE_ID from the link
4. Use this format: `https://drive.google.com/uc?export=download&id=FILE_ID`

**OneDrive:**
1. Upload the MP3 to OneDrive
2. Click Share → Copy link
3. Replace `redir` with `download` in the URL

#### Option B: GitHub (For developers)
1. Create a public GitHub repository
2. Upload the MP3 to the repo
3. Use the raw file URL: `https://raw.githubusercontent.com/username/repo/main/music.mp3`

#### Option C: Your Own Server
If you have web hosting, upload the MP3 and use its direct URL.

### Step 3: Load the Track in App

1. After uploading, copy the direct audio file URL
2. Return to the app and tap the track again
3. Paste the URL in the "Step 3" input field
4. Tap "Load & Play Music"
5. The track will load and start playing!

## Curated Music Tracks

### 1. Peaceful Piano
- **Mood**: Peaceful
- **Genre**: Piano
- **Duration**: 3 minutes
- **Best For**: Deep focus work

### 2. Calming Classical
- **Mood**: Calming
- **Genre**: Classical Orchestra
- **Duration**: 4 minutes
- **Best For**: Reading and comprehension

### 3. Uplifting Strings
- **Mood**: Uplifting
- **Genre**: Strings Ensemble
- **Duration**: 3:20 minutes
- **Best For**: Morning study sessions

### 4. Gentle Meditation
- **Mood**: Peaceful
- **Genre**: Ambient Classical
- **Duration**: 5 minutes
- **Best For**: Long study sessions, relaxation

### 5. Soft Piano Dreams
- **Mood**: Calming
- **Genre**: Piano Solo
- **Duration**: 3:40 minutes
- **Best For**: Evening study, winding down

### 6. Morning Sunrise
- **Mood**: Uplifting
- **Genre**: Classical Ensemble
- **Duration**: 3:10 minutes
- **Best For**: Starting your day with energy

## Technical Details

### Audio Service (`/src/services/musicService.ts`)
The app uses Expo AV for high-quality audio playback with features:
- Background audio playback (keeps playing when app is minimized)
- Playback status updates every 500ms
- Seeking/scrubbing support
- Volume control (0.0 to 1.0)
- Looping support
- iOS silent mode support (plays through even if phone is on silent)

### Music Player Screen (`/src/screens/MusicPlayerScreen.tsx`)
Beautiful UI with:
- Full theme integration (matches your selected theme)
- Now Playing card with large controls
- Scrollable music library
- Mood-based filtering
- In-app instructions
- Modal workflow for adding music

## Tips for Best Experience

1. **Download All 6 Tracks**: For seamless playlist experience
2. **Use High-Quality MP3s**: Pixabay offers multiple quality options
3. **Name Files Clearly**: When uploading, use descriptive names
4. **Test URLs**: Make sure the URL directly downloads the MP3 (not a webpage)
5. **Keep URLs Safe**: Save your music URLs somewhere for future use

## Troubleshooting

### Music Won't Load
- **Check URL**: Make sure it's a direct link to the MP3 file
- **Test in Browser**: Paste URL in browser - it should download immediately
- **Try Different Host**: Some cloud services have better compatibility

### Music Cuts Out
- **Check Connection**: Streaming requires stable internet
- **Use WiFi**: For best streaming experience
- **Download for Offline**: Consider using local file storage (future feature)

### No Sound
- **Check Volume**: Both app volume slider and phone volume
- **Check Silent Mode**: Music player bypasses iOS silent mode
- **Check Permissions**: Ensure app has audio permissions

## Future Enhancements

Potential features to add:
- Local file storage for offline playback
- Playlist creation and management
- Shuffle mode
- Background play with lock screen controls
- Auto-play next track
- Favorite tracks
- Sleep timer
- Equalizer settings

## Pixabay Music License

All music from Pixabay is:
- ✅ 100% Royalty-Free
- ✅ Free for commercial and non-commercial use
- ✅ No attribution required (but appreciated)
- ✅ Can be modified and used in derivative works

Perfect for your study app!

## Support

If you have questions about:
- **Pixabay**: Visit https://pixabay.com/service/faq/
- **App Features**: Check the app's in-built instructions
- **Technical Issues**: Review the troubleshooting section above

Enjoy your calming study music! 🎵📚
