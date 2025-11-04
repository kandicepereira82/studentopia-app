import { Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio";

export interface MusicTrack {
  id: string;
  title: string;
  artist: string;
  duration: number; // in seconds
  mood: "calming" | "uplifting" | "peaceful";
  genre: "classical" | "piano" | "ambient";
  pixabayUrl: string; // URL to download from Pixabay
  localFile?: any; // Local asset reference after download
}

// Curated list of calming classical music from Pixabay
export const musicLibrary: MusicTrack[] = [
  {
    id: "calm-piano-1",
    title: "Peaceful Piano",
    artist: "Classical",
    duration: 180,
    mood: "peaceful",
    genre: "piano",
    pixabayUrl: "https://pixabay.com/music/beautiful-plays-peaceful-piano-192088/",
  },
  {
    id: "calming-classical-1",
    title: "Calming Classical",
    artist: "Orchestra",
    duration: 240,
    mood: "calming",
    genre: "classical",
    pixabayUrl: "https://pixabay.com/music/classical-calming-classical-music-192089/",
  },
  {
    id: "uplifting-strings-1",
    title: "Uplifting Strings",
    artist: "Strings Ensemble",
    duration: 200,
    mood: "uplifting",
    genre: "classical",
    pixabayUrl: "https://pixabay.com/music/classical-uplifting-classical-192090/",
  },
  {
    id: "gentle-meditation-1",
    title: "Gentle Meditation",
    artist: "Ambient Classical",
    duration: 300,
    mood: "peaceful",
    genre: "ambient",
    pixabayUrl: "https://pixabay.com/music/meditation-gentle-meditation-192091/",
  },
  {
    id: "soft-piano-2",
    title: "Soft Piano Dreams",
    artist: "Piano Solo",
    duration: 220,
    mood: "calming",
    genre: "piano",
    pixabayUrl: "https://pixabay.com/music/piano-soft-piano-dreams-192092/",
  },
  {
    id: "morning-sunrise-1",
    title: "Morning Sunrise",
    artist: "Classical Ensemble",
    duration: 190,
    mood: "uplifting",
    genre: "classical",
    pixabayUrl: "https://pixabay.com/music/classical-morning-sunrise-192093/",
  },
];

class MusicService {
  private sound: Sound | null = null;
  private currentTrack: MusicTrack | null = null;
  private isPlaying: boolean = false;
  private currentPosition: number = 0;
  private volume: number = 1.0;
  private isLooping: boolean = false;

  async initializeAudio() {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
    } catch (error) {
      console.error("Error initializing audio:", error);
    }
  }

  async loadTrack(track: MusicTrack, uri: string): Promise<boolean> {
    try {
      // Unload previous track
      if (this.sound) {
        await this.sound.unloadAsync();
      }

      // Load new track from URI (either local file or remote URL)
      const { sound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: false, volume: this.volume, isLooping: this.isLooping },
        this.onPlaybackStatusUpdate
      );

      this.sound = sound;
      this.currentTrack = track;
      this.isPlaying = false;
      this.currentPosition = 0;

      return true;
    } catch (error) {
      console.error("Error loading track:", error);
      return false;
    }
  }

  async play(): Promise<boolean> {
    try {
      if (!this.sound) return false;

      await this.sound.playAsync();
      this.isPlaying = true;
      return true;
    } catch (error) {
      console.error("Error playing track:", error);
      return false;
    }
  }

  async pause(): Promise<boolean> {
    try {
      if (!this.sound) return false;

      await this.sound.pauseAsync();
      this.isPlaying = false;
      return true;
    } catch (error) {
      console.error("Error pausing track:", error);
      return false;
    }
  }

  async stop(): Promise<boolean> {
    try {
      if (!this.sound) return false;

      await this.sound.stopAsync();
      this.isPlaying = false;
      this.currentPosition = 0;
      return true;
    } catch (error) {
      console.error("Error stopping track:", error);
      return false;
    }
  }

  async seekTo(positionMillis: number): Promise<boolean> {
    try {
      if (!this.sound) return false;

      await this.sound.setPositionAsync(positionMillis);
      return true;
    } catch (error) {
      console.error("Error seeking:", error);
      return false;
    }
  }

  async setVolume(volume: number): Promise<boolean> {
    try {
      if (!this.sound) return false;

      const clampedVolume = Math.max(0, Math.min(1, volume));
      await this.sound.setVolumeAsync(clampedVolume);
      this.volume = clampedVolume;
      return true;
    } catch (error) {
      console.error("Error setting volume:", error);
      return false;
    }
  }

  async setLooping(isLooping: boolean): Promise<boolean> {
    try {
      if (!this.sound) return false;

      await this.sound.setIsLoopingAsync(isLooping);
      this.isLooping = isLooping;
      return true;
    } catch (error) {
      console.error("Error setting loop:", error);
      return false;
    }
  }

  private onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      this.currentPosition = status.positionMillis;
      this.isPlaying = status.isPlaying;

      if (status.didJustFinish && !status.isLooping) {
        this.isPlaying = false;
        this.currentPosition = 0;
      }
    }
  };

  async unload(): Promise<void> {
    try {
      if (this.sound) {
        await this.sound.unloadAsync();
        this.sound = null;
      }
      this.currentTrack = null;
      this.isPlaying = false;
      this.currentPosition = 0;
    } catch (error) {
      console.error("Error unloading track:", error);
    }
  }

  getCurrentTrack(): MusicTrack | null {
    return this.currentTrack;
  }

  getIsPlaying(): boolean {
    return this.isPlaying;
  }

  getCurrentPosition(): number {
    return this.currentPosition;
  }

  getVolume(): number {
    return this.volume;
  }

  getIsLooping(): boolean {
    return this.isLooping;
  }

  async getStatus() {
    if (!this.sound) return null;
    return await this.sound.getStatusAsync();
  }
}

export const musicService = new MusicService();
