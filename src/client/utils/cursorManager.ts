interface CursorPosition {
  x: number;
  y: number;
}

interface CursorState {
  isPointer: boolean;
  isVisible: boolean;
}

class CursorManager {
  private cursorElement: HTMLElement | null = null;
  private cursorImage: HTMLImageElement | null = null;
  private position: CursorPosition = { x: 0, y: 0 };
  private state: CursorState = { isPointer: false, isVisible: true };
  private isInitialized = false;

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
    // Create cursor container
    this.cursorElement = document.createElement('div');
    this.cursorElement.id = 'custom-cursor';
    this.cursorElement.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 32px;
      height: 32px;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      transition: none;
    `;

    // Create cursor image
    this.cursorImage = document.createElement('img');
    this.cursorImage.style.cssText = `
      width: 100%;
      height: 100%;
      object-fit: contain;
    `;
    this.cursorImage.src = '/granny-face.png';
    this.cursorImage.alt = 'Custom Cursor';

    this.cursorElement.appendChild(this.cursorImage);
    document.body.appendChild(this.cursorElement);

    // Hide default cursor
    document.body.style.cursor = 'none';
    document.documentElement.style.cursor = 'none';

    // Add event listeners
    this.addEventListeners();
    this.isInitialized = true;
  }

  private addEventListeners() {
    // Track mouse movement
    document.addEventListener('mousemove', (e) => {
      this.updatePosition(e.clientX, e.clientY);
    });

    // Track mouse enter/leave
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
      this.cursorElement.style.left = `${x}px`;
      this.cursorElement.style.top = `${y}px`;
    }
  }

  private showCursor() {
    this.state.isVisible = true;
    if (this.cursorElement) {
      this.cursorElement.style.opacity = '1';
    }
  }

  private hideCursor() {
    this.state.isVisible = false;
    if (this.cursorElement) {
      this.cursorElement.style.opacity = '0';
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
    
    if (this.cursorImage) {
      this.cursorImage.src = isPointer ? '/granny-pointer.png' : '/granny-face.png';
    }
  }

  // Public methods
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