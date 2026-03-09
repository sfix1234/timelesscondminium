'use client';

import { useMemo, useRef, useState } from 'react';

export default function PropertyCompare({ beforeSrc, afterSrc, beforeAlt, afterAlt }) {
  const [split, setSplit] = useState(70);
  const wrapRef = useRef(null);
  const compareStyle = useMemo(() => ({ '--split': `${split}%` }), [split]);
  const clamp = (v) => Math.max(0, Math.min(100, v));

  const updateFromClientX = (clientX) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect || rect.width <= 0) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setSplit(clamp(next));
  };

  const onPointerDown = (e) => {
    e.currentTarget.setPointerCapture?.(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const onPointerMove = (e) => {
    if ((e.buttons & 1) !== 1) return;
    updateFromClientX(e.clientX);
  };

  return (
    <div
      ref={wrapRef}
      className="property-compare"
      style={compareStyle}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
    >
      <div className="property-compare__layer property-compare__layer--after">
        <img src={afterSrc} alt={afterAlt} className="property-compare__image property-compare__image--after-base" />
      </div>
      <span className="property-compare__tag property-compare__tag--before">BEFORE</span>
      <div className="property-compare__layer property-compare__before">
        <img src={beforeSrc} alt={beforeAlt} className="property-compare__image property-compare__image--before" />
      </div>
      <span className="property-compare__tag property-compare__tag--after">AFTER</span>
      <div className="property-compare__handle">
        <span className="property-compare__handle-dot">
          <span className="property-compare__chev">‹</span>
          <span className="property-compare__chev">›</span>
        </span>
      </div>
      <input
        className="property-compare__range"
        type="range"
        min="0"
        max="100"
        value={split}
        onChange={(e) => setSplit(Number(e.target.value))}
        aria-label="Before After slider"
      />
    </div>
  );
}
