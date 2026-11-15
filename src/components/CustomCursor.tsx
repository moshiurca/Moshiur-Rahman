import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (isTouch || reducedMotion) return;

    const handleMove = (e: MouseEvent) => {
      setVisible(true);
      const x = e.clientX;
      const y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${x}px`;
        dotRef.current.style.top = `${y}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${x}px`;
        ringRef.current.style.top = `${y}px`;
      }

      const target = e.target as HTMLElement | null;
      const interactive = target?.closest('a, button, input, textarea, [data-tilt]');
      setIsActive(Boolean(interactive));
    };

    const handleLeave = () => setVisible(false);

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseleave', handleLeave);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed z-[9999] hidden h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f26522] shadow-[0_0_10px_#f26522] md:block"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`cursor-ring-spin pointer-events-none fixed z-[9998] hidden rounded-full transition-[width,height,border-color,box-shadow] duration-200 md:block ${
          isActive
            ? 'h-13 w-13 border-[1.5px] border-[#f26522] shadow-[0_0_16px_rgba(242,101,34,0.45)]'
            : 'h-9 w-9 border border-dashed border-[#f26522]/60'
        }`}
      />
    </>
  );
};
