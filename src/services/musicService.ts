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

// Curated list of calming classical music
// Using local assets for music files
export const musicLibrary: MusicTrack[] = [
  {
    id: "chopin-nocturne",
    title: "Chopin Nocturne",
    artist: "Chopin",
    duration: 300,
    mood: "peaceful",
    genre: "classical",
    pixabayUrl: "",
    localFile: require("../../assets/chopin-nocturne-op-9-no-2-slowed-rainmp3.mpeg"),
  },
  {
    id: "calm-soul-meditation",
    title: "Calm Soul Meditation",
    artist: "Meditation Music",
    duration: 240,
    mood: "calming",
    genre: "ambient",
    pixabayUrl: "",
    localFile: require("../../assets/calm-soul-meditation.mpeg"),
  },
  {
    id: "meditation-432hz",
    title: "432 Hz Meditation",
    artist: "Healing Frequencies",
    duration: 200,
    mood: "peaceful",
    genre: "ambient",
    pixabayUrl: "",
    localFile: require("../../assets/432-hz-meditation-short.mpeg"),
  },
  {
    id: "release-negative-energy",
    title: "Release Negative Energy",
    artist: "Healing Frequencies",
    duration: 300,
    mood: "uplifting",
    genre: "ambient",
    pixabayUrl: "",
    localFile: require("../../assets/432-528-hz-release-negative-energy-.mpeg"),
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

  async loadTrack(track: MusicTrack, uri?: string): Promise<boolean> {
    try {
      // Unload previous track
      if (this.sound) {
        await this.sound.unloadAsync();
      }

      // Priority: provided URI > localFile > pixabayUrl
      let audioSource: any;

      if (uri) {
        // Use provided URI string
        audioSource = { uri };
      } else if (track.localFile) {
        // Use local asset file (require'd module)
        audioSource = track.localFile;
      } else if (track.pixabayUrl) {
        // Use remote URL
        audioSource = { uri: track.pixabayUrl };
      } else {
        console.error("No audio source provided for track:", track.title);
        return false;
      }

      // Load new track
      const { sound } = await Audio.Sound.createAsync(
        audioSource,
        { shouldPlay: false, volume: this.volume, isLooping: this.isLooping },
        this.onPlaybackStatusUpdate
      );

      this.sound = sound;
      this.currentTrack = track;
      this.isPlaying = false;
      this.currentPosition = 0;

      return true;
    } catch (error: any) {
      console.error("Error loading track:", error);
      console.error("Track details:", { title: track.title, hasLocalFile: !!track.localFile, uri });

      // Provide more specific error messages
      if (error.message && error.message.includes('-11850')) {
        console.error("Server configuration error: The URL does not point to a valid audio file");
      }

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
