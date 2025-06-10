class SoundManager {
  private clickSound: HTMLAudioElement;
  private keyboardSound: HTMLAudioElement;

  constructor() {
    this.clickSound = new Audio('./public/mouse-click.mp3');
    this.clickSound.preload = 'auto';
    this.clickSound.volume = 0.3;

    this.keyboardSound = new Audio('./public/keyboard-click.mp3');
    this.keyboardSound.preload = 'auto';
    this.keyboardSound.volume = 0.2; // Slightly quieter for typing
  }

  playClickSound() {
    // Reset the audio to the beginning in case it's already playing
    this.clickSound.currentTime = 0;
    this.clickSound.play().catch(error => {
      // Handle autoplay restrictions gracefully
      console.log('Audio play failed:', error);
    });
  }

  playKeyboardSound() {
    // Reset the audio to the beginning for rapid typing
    this.keyboardSound.currentTime = 0;
    this.keyboardSound.play().catch(error => {
      // Handle autoplay restrictions gracefully
      console.log('Keyboard audio play failed:', error);
    });
  }
}

export const soundManager = new SoundManager();