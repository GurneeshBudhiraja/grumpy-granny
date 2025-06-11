import { SoundManagerInterface } from '../../shared/types';

class SoundManager implements SoundManagerInterface {
  private clickSound: HTMLAudioElement;
  private keyboardSound: HTMLAudioElement;
  private noSignalSound: HTMLAudioElement;
  private backgroundMusic: HTMLAudioElement;
  private isInitialized: boolean = false;
  private currentNoSignalAudio: HTMLAudioElement | null = null;

  constructor() {
    // Use correct paths without './public/' prefix
    this.clickSound = new Audio('/mouse-click.mp3');
    this.clickSound.preload = 'auto';
    this.clickSound.volume = 0.5;

    this.keyboardSound = new Audio('/keyboard-click.mp3');
    this.keyboardSound.preload = 'auto';
    this.keyboardSound.volume = 0.4;

    this.noSignalSound = new Audio('/no-signal-sound.mp3');
    this.noSignalSound.preload = 'auto';
    this.noSignalSound.volume = 0.5; // Reduced from 0.7

    this.backgroundMusic = new Audio('/game-theme-song.mp3');
    this.backgroundMusic.preload = 'auto';
    this.backgroundMusic.volume = 0.08; // Reduced from 0.15 to 0.08
    this.backgroundMusic.loop = true; // Loop the background music
  }

  async playClickSound(): Promise<void> {
    try {
      // Clone and play to avoid conflicts
      const audio = this.clickSound.cloneNode() as HTMLAudioElement;
      audio.volume = 0.5;
      await audio.play();
    } catch (error) {
      console.log('Click audio play failed:', error);
    }
  }

  async playKeyboardSound(): Promise<void> {
    try {
      // Clone and play to avoid conflicts
      const audio = this.keyboardSound.cloneNode() as HTMLAudioElement;
      audio.volume = 0.4;
      await audio.play();
    } catch (error) {
      console.log('Keyboard audio play failed:', error);
    }
  }

  async playNoSignalSound(): Promise<void> {
    try {
      // Initialize sounds first
      await this.initializeSounds();
      
      // Stop any currently playing no signal sound
      if (this.currentNoSignalAudio) {
        this.currentNoSignalAudio.pause();
        this.currentNoSignalAudio.currentTime = 0;
      }
      
      // Create new audio instance and track it
      this.currentNoSignalAudio = this.noSignalSound.cloneNode() as HTMLAudioElement;
      this.currentNoSignalAudio.volume = 0.5;
      await this.currentNoSignalAudio.play();
      
      // Stop the sound after exactly 500ms
      setTimeout(() => {
        if (this.currentNoSignalAudio) {
          this.currentNoSignalAudio.pause();
          this.currentNoSignalAudio.currentTime = 0;
          this.currentNoSignalAudio = null;
        }
      }, 500);
      
    } catch (error) {
      console.log('No signal audio play failed:', error);
    }
  }

  async playBackgroundMusic(): Promise<void> {
    try {
      // Initialize sounds first
      await this.initializeSounds();
      
      // Reset and play background music
      this.backgroundMusic.currentTime = 0;
      this.backgroundMusic.volume = 0.08; // Very low volume
      await this.backgroundMusic.play();
    } catch (error) {
      console.log('Background music play failed:', error);
    }
  }

  stopBackgroundMusic(): void {
    try {
      this.backgroundMusic.pause();
      this.backgroundMusic.currentTime = 0;
    } catch (error) {
      console.log('Background music stop failed:', error);
    }
  }

  // Initialize sounds on first user interaction
  async initializeSounds(): Promise<void> {
    if (this.isInitialized) return;
    
    try {
      // Load the audio files
      await Promise.all([
        new Promise<void>((resolve, reject) => {
          this.clickSound.addEventListener('canplaythrough', () => resolve(), { once: true });
          this.clickSound.addEventListener('error', reject, { once: true });
          this.clickSound.load();
        }),
        new Promise<void>((resolve, reject) => {
          this.keyboardSound.addEventListener('canplaythrough', () => resolve(), { once: true });
          this.keyboardSound.addEventListener('error', reject, { once: true });
          this.keyboardSound.load();
        }),
        new Promise<void>((resolve, reject) => {
          this.noSignalSound.addEventListener('canplaythrough', () => resolve(), { once: true });
          this.noSignalSound.addEventListener('error', reject, { once: true });
          this.noSignalSound.load();
        }),
        new Promise<void>((resolve, reject) => {
          this.backgroundMusic.addEventListener('canplaythrough', () => resolve(), { once: true });
          this.backgroundMusic.addEventListener('error', reject, { once: true });
          this.backgroundMusic.load();
        })
      ]);
      
      this.isInitialized = true;
      console.log('Sounds initialized successfully');
    } catch (error) {
      console.log('Sound initialization failed:', error);
    }
  }
}

export const soundManager = new SoundManager();