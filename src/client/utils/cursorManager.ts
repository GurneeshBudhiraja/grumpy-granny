interface CursorPosition {
  x: number;
  y: number;
}

interface CursorState {
  isPointer: boolean;
  isVisible: boolean;
  isInsideScreen: boolean;
  cursorType: 'windows' | 'granny';
}

class CursorManager {
  private cursorElement: HTMLElement | null = null;
  private cursorImage: HTMLImageElement | null = null;
  private position: CursorPosition = { x: 0, y: 0 };
  private state: CursorState = {
    isPointer: false,
    isVisible: true,
    isInsideScreen: false,
    cursorType: 'windows'
  };
  private isInitialized = false;
  private screenElement: HTMLElement | null = null;

  constructor() {
    this.init();
  }

  private init() {
    if (this.isInitialized) return;

    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.setupCursor());
    } else {
      this.setupCursor();
    }
  }

  private setupCursor() {
    this.createCustomCursor();
    this.findScreenElement();
    this.addEventListeners();
    this.isInitialized = true;
  }

  private createCustomCursor() {
    // Create custom cursor element for granny mode
    this.cursorElement = document.createElement('div');
    this.cursorElement.style.position = 'fixed';
    this.cursorElement.style.top = '0';
    this.cursorElement.style.left = '0';
    this.cursorElement.style.width = '32px';
    this.cursorElement.style.height = '32px';
    this.cursorElement.style.pointerEvents = 'none';
    this.cursorElement.style.zIndex = '9999';
    this.cursorElement.style.transition = 'opacity 0.1s ease';
    this.cursorElement.style.opacity = '0';

    // Create image element
    this.cursorImage = document.createElement('img');
    this.cursorImage.style.width = '100%';
    this.cursorImage.style.height = '100%';
    this.cursorImage.style.objectFit = 'contain';
    this.cursorImage.src = '/granny-cursor/granny-face.png';
    
    this.cursorElement.appendChild(this.cursorImage);
    document.body.appendChild(this.cursorElement);
  }

  private findScreenElement() {
    // Look for the CRT screen area - it's the div with the desktop background
    this.screenElement = document.querySelector('.bg-desktop-bg\\/90') as HTMLElement;

    if (this.screenElement) {
      // Add specific event listeners for screen area
      this.screenElement.addEventListener('mouseenter', () => {
        this.setInsideScreen(true);
      });

      this.screenElement.addEventListener('mouseleave', () => {
        this.setInsideScreen(false);
      });
    }
  }

  private addEventListeners() {
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
      this.updatePosition(e.clientX, e.clientY);
    });

    // Track mouse enter/leave document
    document.addEventListener('mouseenter', () => {
      this.showCursor();
    });

    document.addEventListener('mouseleave', () => {
      this.hideCursor();
    });

    // Track clickable elements
    document.addEventListener('mouseover', (e) => {
      this.checkClickableElement(e.target as Element);
    });

    document.addEventListener('mouseout', (e) => {
      this.checkClickableElement(e.target as Element, true);
    });
  }

  private updatePosition(x: number, y: number) {
    this.position = { x, y };
    if (this.cursorElement) {
      // Offset cursor to center it on the mouse position
      this.cursorElement.style.left = `${x - 16}px`;
      this.cursorElement.style.top = `${y - 16}px`;
    }
  }

  private showCursor() {
    this.state.isVisible = true;
    this.updateCursorVisibility();
  }

  private hideCursor() {
    this.state.isVisible = false;
    this.updateCursorVisibility();
  }

  private setInsideScreen(isInside: boolean) {
    this.state.isInsideScreen = isInside;
    this.updateCursorVisibility();
    this.updateScreenCursors();
  }

  private updateCursorVisibility() {
    if (!this.cursorElement) return;

    if (this.state.cursorType === 'granny') {
      // For granny mode, show custom cursor when visible
      if (this.state.isVisible) {
        this.cursorElement.style.opacity = '1';
      } else {
        this.cursorElement.style.opacity = '0';
      }
    } else {
      // Hide custom cursor when using Windows cursors
      this.cursorElement.style.opacity = '0';
    }
  }

  private updateScreenCursors() {
    const screenElement = document.querySelector('.bg-desktop-bg\\/90') as HTMLElement;
    if (!screenElement) return;

    if (this.state.cursorType === 'windows') {
      // Use Windows cursors inside screen
      screenElement.style.setProperty('cursor', 'url("/windows-cursor/normal-cursor.cur"), auto', 'important');

      // Update clickable elements to use Windows pointer cursor
      const clickableElements = screenElement.querySelectorAll('button, a, [role="button"], .cursor-pointer, input[type="button"], input[type="submit"], input[type="reset"], [onclick]');
      clickableElements.forEach(el => {
        (el as HTMLElement).style.setProperty('cursor', 'url("/windows-cursor/pointer-cursor.cur"), pointer', 'important');
      });
    } else {
      // Use granny cursors (handled by custom cursor element)
      screenElement.style.setProperty('cursor', 'none', 'important');

      // Hide default cursors for clickable elements
      const clickableElements = screenElement.querySelectorAll('button, a, [role="button"], .cursor-pointer, input[type="button"], input[type="submit"], input[type="reset"], [onclick]');
      clickableElements.forEach(el => {
        (el as HTMLElement).style.setProperty('cursor', 'none', 'important');
      });
    }

    // Set global cursor for outside screen area
    if (this.state.cursorType === 'granny') {
      // For granny mode, hide default cursor and let custom cursor handle it
      document.body.style.setProperty('cursor', 'none', 'important');
      document.documentElement.style.setProperty('cursor', 'none', 'important');

      // Set pointer cursor for clickable elements outside screen
      const globalClickableElements = document.querySelectorAll('button:not(.bg-desktop-bg\\/90 *), a:not(.bg-desktop-bg\\/90 *), [role="button"]:not(.bg-desktop-bg\\/90 *), .cursor-pointer:not(.bg-desktop-bg\\/90 *)');
      globalClickableElements.forEach(el => {
        (el as HTMLElement).style.setProperty('cursor', 'url("/windows-cursor/pointer-cursor.cur"), pointer', 'important');
      });
    } else {
      document.body.style.setProperty('cursor', 'url("/windows-cursor/normal-cursor.cur"), auto', 'important');
      document.documentElement.style.setProperty('cursor', 'url("/windows-cursor/normal-cursor.cur"), auto', 'important');
    }
  }

  private updateCursorImage() {
    if (!this.cursorImage) return;

    if (this.state.cursorType === 'granny') {
      // Use granny face for normal cursor, granny pointer for clickable elements
      this.cursorImage.src = this.state.isPointer ? '/granny-cursor/granny-pointer.png' : '/granny-cursor/granny-face.png';
    }
  }

  private checkClickableElement(element: Element, isLeaving = false) {
    if (!element) return;

    const isClickable = this.isElementClickable(element);

    if (isLeaving) {
      this.setPointerState(false);
    } else if (isClickable) {
      this.setPointerState(true);
    } else {
      this.setPointerState(false);
    }
  }

  private isElementClickable(element: Element): boolean {
    // Check for clickable elements
    const clickableSelectors = [
      'button',
      'a',
      '[role="button"]',
      '[onclick]',
      'input[type="button"]',
      'input[type="submit"]',
      'input[type="reset"]',
    ];

    // Check if element matches clickable selectors
    for (const selector of clickableSelectors) {
      if (element.matches(selector)) return true;
    }

    // Check for cursor-pointer class
    if (element.classList.contains('cursor-pointer')) return true;

    // Check computed style for cursor pointer
    const computedStyle = window.getComputedStyle(element);
    if (computedStyle.cursor === 'pointer') return true;

    // Check parent elements (up to 3 levels)
    let parent = element.parentElement;
    let level = 0;
    while (parent && level < 3) {
      if (this.isElementClickable(parent)) return true;
      parent = parent.parentElement;
      level++;
    }

    return false;
  }

  private setPointerState(isPointer: boolean) {
    if (this.state.isPointer === isPointer) return;

    this.state.isPointer = isPointer;
    this.updateCursorImage();
    this.updateCursorVisibility();
  }

  // Public methods
  public setCursorType(cursorType: 'windows' | 'granny') {
    this.state.cursorType = cursorType;
    this.updateCursorImage();
    this.updateCursorVisibility();
    this.updateScreenCursors();
  }

  public destroy() {
    if (this.cursorElement) {
      this.cursorElement.remove();
    }
    document.body.style.cursor = '';
    document.documentElement.style.cursor = '';
    this.isInitialized = false;
  }

  public setCustomCursor(imagePath: string) {
    if (this.cursorImage) {
      this.cursorImage.src = imagePath;
    }
  }
}

export const cursorManager = new CursorManager();