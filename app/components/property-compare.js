'use client';

import { useMemo, useRef, useState } from 'react';

export default function PropertyCompare({ beforeSrc, afterSrc, beforeAlt, afterAlt, hotspots = [] }) {
  const [split, setSplit] = useState(70);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const wrapRef = useRef(null);
  const compareStyle = useMemo(() => ({ '--split': `${split}%` }), [split]);
  const clamp = (v) => Math.max(0, Math.min(100, v));

  const updateFromClientX = (clientX) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect || rect.width <= 0) return;
    const next = ((clientX - rect.left) / rect.width) * 100;
    setSplit(clamp(next));
  };

  return (
    <div
      ref={wrapRef}
      className="property-compare"
      style={compareStyle}
      onPointerMove={(e) => {
        if (!isDragging) return;
        updateFromClientX(e.clientX);
      }}
      onPointerUp={() => setIsDragging(false)}
      onPointerCancel={() => setIsDragging(false)}
    >
      <div className="property-compare__layer property-compare__layer--after">
        <img src={afterSrc} alt={afterAlt} className="property-compare__image property-compare__image--after-base" />
      </div>
      {hotspots.length > 0 ? (
        <div className="property-compare__hotspots">
          {hotspots.map((point, index) => {
            const isActive = activeHotspot === index;
            return (
              <button
                key={`${point.title}-${index}`}
                type="button"
                className={`property-compare__hotspot${isActive ? ' is-active' : ''}`}
                style={{ '--point-x': `${point.x}%`, '--point-y': `${point.y}%` }}
                onPointerDown={(e) => e.stopPropagation()}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveHotspot(isActive ? null : index);
                }}
                aria-expanded={isActive}
                aria-label={`${point.title}: ${point.description}`}
              >
                <span className="property-compare__hotspot-dot">{index + 1}</span>
              </button>
            );
          })}
        </div>
      ) : null}
      {activeHotspot !== null && hotspots[activeHotspot] ? (
        <div className="property-compare__popup" role="dialog" aria-live="polite">
          <button
            type="button"
            className="property-compare__popup-close"
            onClick={() => setActiveHotspot(null)}
            aria-label="説明を閉じる"
          >
            ×
          </button>
          <p className="property-compare__popup-title">{hotspots[activeHotspot].title}</p>
          <p className="property-compare__popup-text">{hotspots[activeHotspot].description}</p>
        </div>
      ) : null}
      <span className="property-compare__tag property-compare__tag--before">BEFORE</span>
      <div className="property-compare__layer property-compare__before">
        <img src={beforeSrc} alt={beforeAlt} className="property-compare__image property-compare__image--before" />
      </div>
      <span className="property-compare__tag property-compare__tag--after">AFTER</span>
      <div className="property-compare__handle">
        <span
          className="property-compare__handle-dot"
          onPointerDown={(e) => {
            e.stopPropagation();
            setActiveHotspot(null);
            setIsDragging(true);
            e.currentTarget.setPointerCapture?.(e.pointerId);
            updateFromClientX(e.clientX);
          }}
          onPointerMove={(e) => {
            if (!isDragging) return;
            updateFromClientX(e.clientX);
          }}
          onPointerUp={() => setIsDragging(false)}
          onPointerCancel={() => setIsDragging(false)}
        >
          <span className="property-compare__chev">‹</span>
          <span className="property-compare__chev">›</span>
        </span>
      </div>
    </div>
  );
}
