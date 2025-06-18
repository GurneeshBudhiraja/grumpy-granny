import { SoundManagerInterface } from '../../shared/types';

class SoundManager implements SoundManagerInterface {
  private clickSound: HTMLAudioElement;
  private keyboardSound: HTMLAudioElement;
  private themeSong: HTMLAudioElement | null = null;
  private isInitialized: boolean = false;

  constructor() {
    this.clickSound = new Audio('/mouse-click.mp3');
    this.clickSound.preload = 'auto';
    this.clickSound.volume = 0.5;

    this.keyboardSound = new Audio('/keyboard-click.mp3');
    this.keyboardSound.preload = 'auto';
    this.keyboardSound.volume = 0.15;

    // Initialize theme song
    this.themeSong = new Audio("/sounds/game-theme-song.mp3");
    this.themeSong.loop = true; // Loop the theme song
    this.themeSong.volume = 0.05;
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

  async playKeyboardSound(volume: number = 0.65): Promise<void> {
    try {
      // Clone and play to avoid conflicts
      const audio = this.keyboardSound.cloneNode() as HTMLAudioElement;
      audio.volume = volume; // Reduced volume for terminal typing
      await audio.play();
    } catch (error) {
      console.log('Keyboard audio play failed:', error);
    }
  }

  async playThemeSong(): Promise<void> {
    if (!this.themeSong) return;
    try {
      await this.themeSong.play();
    } catch (error) {
      console.log('Theme song play failed:', error);
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