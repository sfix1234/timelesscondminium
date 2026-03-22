'use client';

import { useEffect } from 'react';

export default function MapPopupBehavior() {
  useEffect(() => {
    const popup = document.getElementById('mapPopup');
    if (!popup) return;

    const openBtn = document.querySelector('[data-map-pin]');
    const closeBtns = popup.querySelectorAll('[data-map-close]');

    const open = () => {
      popup.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    };

    const close = () => {
      popup.classList.remove('is-open');
      document.body.style.overflow = '';
    };

    if (openBtn) openBtn.addEventListener('click', open);
    closeBtns.forEach((btn) => btn.addEventListener('click', close));

    return () => {
      if (openBtn) openBtn.removeEventListener('click', open);
      closeBtns.forEach((btn) => btn.removeEventListener('click', close));
      document.body.style.overflow = '';
    };
  }, []);

  return null;
}
