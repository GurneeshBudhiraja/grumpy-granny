import { useEffect } from "react";
import { soundManager } from "../utils/soundManager";



export function useThemeSong() {

  useEffect(() => {
    const onClick = async () => {
      // Initialize sounds on first interaction
      await soundManager.initializeSounds();
      await soundManager.playThemeSong()

    };

    // Add keydown listener to the document
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('click', onClick);
    };
  }, []);

}
