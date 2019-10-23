import { useEffect } from 'react';

const useLockBodyScroll = () => {
  useEffect(() => {
    const body = document.querySelector('body')!;

    body.style.overflow = 'hidden';

    return () => {
      body.style.overflow = 'visible';
    };
  });
};

export default useLockBodyScroll;
