class SoundManager {
  private clickSound: HTMLAudioElement;
  private keyboardSound: HTMLAudioElement;

  constructor() {
    this.clickSound = new Audio('./public/mouse-click.mp3');
    this.clickSound.preload = 'auto';
    this.clickSound.volume = 0.3;

    this.keyboardSound = new Audio('./public/keyboard-click.mp3');
    this.keyboardSound.preload = 'auto';
    this.keyboardSound.volume = 0.2;
  }

  playClickSound() {
    // Reset to beginning and play
    this.clickSound.currentTime = 0;
    this.clickSound.play().catch(error => {
      console.log('Audio play failed:', error);
    });
  }

  playKeyboardSound() {
    // Reset to beginning and play
    this.keyboardSound.currentTime = 0;
    this.keyboardSound.play().catch(error => {
      console.log('Keyboard audio play failed:', error);
    });
  }

  // Method to preload all sounds (useful for user interaction)
  preloadSounds() {
    this.clickSound.load();
    this.keyboardSound.load();
  }
}

export const soundManager = new SoundManager();