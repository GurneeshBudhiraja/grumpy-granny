import { useEffect, useRef, useState } from 'react';

type CursorType = 'windows' | 'granny';
type PointerType = 'default' | 'pointer';

export function useFakeCursor() {
  const imgRef = useRef<HTMLImageElement>(null);
  const [cursorType, setCursorType] = useState<CursorType>('windows');
  const [pointerType, setPointerType] = useState<PointerType>('default');

  useEffect(() => {
    // hide real cursor
    document.documentElement.style.cursor = 'none';
    document.body.style.cursor = 'none';

    // track movement
    const onMouseMove = (e: MouseEvent) => {
      if (imgRef.current) {
        imgRef.current.style.transform = `translate3d(${e.clientX}px,${e.clientY}px,0)`;
      }
    };

    // detect clickable targets
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as Element;
      const isClickable =
        target instanceof HTMLAnchorElement ||
        target instanceof HTMLButtonElement ||
        target.classList.contains('cursor-pointer') ||
        window.getComputedStyle(target).cursor === 'pointer';
      setPointerType(isClickable ? 'pointer' : 'default');
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', () => setPointerType('default'));

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', () => setPointerType('default'));
      document.documentElement.style.cursor = '';
      document.body.style.cursor = '';
    };
  }, []);

  // the floating <img> element you render
  const CursorImg = (
    <img
      ref={imgRef}
      src={
        cursorType === 'windows'
          ? pointerType === 'pointer'
            ? '/cursor/windows-cursor/pointer-cursor.png'
            : '/cursor/windows-cursor/normal-cursor.png'
          : pointerType === 'pointer'
            ? '/cursor/granny-cursor/granny-pointer.png'
            : '/cursor/granny-cursor/granny-face.png'
      }
      alt="cursor"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: cursorType === 'windows' ? 32 : 40,
        height: cursorType === 'windows' ? 32 : 40,
        pointerEvents: 'none', // never block real events
        transform: 'translate3d(-16px,-16px,0)', // center hotspot
        zIndex: 999999,
      }}
    />
  );

  return { setCursorType, CursorImg };
}
