class SoundManager {
  private clickSound: HTMLAudioElement;

  constructor() {
    this.clickSound = new Audio('./public/mouse-click.mp3');
    this.clickSound.preload = 'auto';
    this.clickSound.volume = 0.3; // Adjust volume as needed
  }

  playClickSound() {
    // Reset the audio to the beginning in case it's already playing
    this.clickSound.currentTime = 0;
    this.clickSound.play().catch(error => {
      // Handle autoplay restrictions gracefully
      console.log('Audio play failed:', error);
    });
  }
}

export const soundManager = new SoundManager();