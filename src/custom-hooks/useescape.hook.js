import { useEffect } from 'react';
/**
 * Detects escape key pressing and call event handler
 * @param {eventHandler} event handler to run when escape key pressed
 */
const useEscape = onEscape => {
  useEffect(() => {
    const handleEsc = event => {
      if (event.keyCode === 27) onEscape();
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
    // eslint-disable-next-line
  }, []);
};

export default useEscape;
