class SoundManager {
  private clickSound: HTMLAudioElement;
  private keyboardSound: HTMLAudioElement;
  private isInitialized: boolean = false;

  constructor() {
    // Use correct paths without './public/' prefix
    this.clickSound = new Audio('/mouse-click.mp3');
    this.clickSound.preload = 'auto';
    this.clickSound.volume = 0.5;

    this.keyboardSound = new Audio('/keyboard-click.mp3');
    this.keyboardSound.preload = 'auto';
    this.keyboardSound.volume = 0.4;
  }

  async playClickSound() {
    try {
      // Clone and play to avoid conflicts
      const audio = this.clickSound.cloneNode() as HTMLAudioElement;
      audio.volume = 0.5;
      await audio.play();
    } catch (error) {
      console.log('Click audio play failed:', error);
    }
  }

  async playKeyboardSound() {
    try {
      // Clone and play to avoid conflicts
      const audio = this.keyboardSound.cloneNode() as HTMLAudioElement;
      audio.volume = 0.4;
      await audio.play();
    } catch (error) {
      console.log('Keyboard audio play failed:', error);
    }
  }

  // Initialize sounds on first user interaction
  async initializeSounds() {
    if (this.isInitialized) return;
    
    try {
      // Load the audio files
      await Promise.all([
        new Promise((resolve, reject) => {
          this.clickSound.addEventListener('canplaythrough', resolve, { once: true });
          this.clickSound.addEventListener('error', reject, { once: true });
          this.clickSound.load();
        }),
        new Promise((resolve, reject) => {
          this.keyboardSound.addEventListener('canplaythrough', resolve, { once: true });
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