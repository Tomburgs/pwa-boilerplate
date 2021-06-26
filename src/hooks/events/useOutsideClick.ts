import { RefObject, useEffect } from 'react';

export const useOutsideClick = (
  ref: RefObject<HTMLElement | null>,
  callback: () => void
): void => {
  useEffect(() => {
    const handler = (event: MouseEvent): void => {
      // Check if the mouse click was within the element's ref.
      if (!ref?.current?.contains(event?.target as Node)) {
        callback();
      }
    };

    window.addEventListener('mousedown', handler);

    return (): void => {
      window.removeEventListener('mousedown', handler);
    };
  }, [ref, callback]);
};
