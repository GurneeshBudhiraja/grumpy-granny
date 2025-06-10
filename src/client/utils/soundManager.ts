class SoundManager {
  private clickSoundPool: HTMLAudioElement[] = [];
  private keyboardSoundPool: HTMLAudioElement[] = [];
  private maxPoolSize = 5; // Maximum number of simultaneous sounds

  constructor() {
    // Create pools of audio elements for overlapping sounds
    this.initializeSoundPool();
  }

  private initializeSoundPool() {
    // Initialize click sound pool
    for (let i = 0; i < this.maxPoolSize; i++) {
      const clickSound = new Audio('./public/mouse-click.mp3');
      clickSound.preload = 'auto';
      clickSound.volume = 0.3;
      this.clickSoundPool.push(clickSound);
    }

    // Initialize keyboard sound pool
    for (let i = 0; i < this.maxPoolSize; i++) {
      const keyboardSound = new Audio('./public/keyboard-click.mp3');
      keyboardSound.preload = 'auto';
      keyboardSound.volume = 0.2;
      this.keyboardSoundPool.push(keyboardSound);
    }
  }

  private getAvailableSound(pool: HTMLAudioElement[]): HTMLAudioElement {
    // Find an available sound (not currently playing or finished playing)
    let availableSound = pool.find(sound => sound.ended || sound.paused);
    
    // If no available sound, use the first one and reset it
    if (!availableSound) {
      availableSound = pool[0];
    }
    
    return availableSound;
  }

  playClickSound() {
    const sound = this.getAvailableSound(this.clickSoundPool);
    
    // Reset to beginning and play
    sound.currentTime = 0;
    sound.play().catch(error => {
      console.log('Audio play failed:', error);
    });
  }

  playKeyboardSound() {
    const sound = this.getAvailableSound(this.keyboardSoundPool);
    
    // Reset to beginning and play
    sound.currentTime = 0;
    sound.play().catch(error => {
      console.log('Keyboard audio play failed:', error);
    });
  }

  // Method to preload all sounds (useful for user interaction)
  preloadSounds() {
    [...this.clickSoundPool, ...this.keyboardSoundPool].forEach(sound => {
      sound.load();
    });
  }
}

export const soundManager = new SoundManager();