'use client';

import { useState } from 'react';
import PropertyFloorImagePanel from './property-floor-image-panel';

const FLOORS = [
  {
    id: '1f',
    label: '1F',
    image: '/assets/images/propatyinfo/timelesscondminium-01.png'
  },
  {
    id: '2f',
    label: '2F',
    image: '/assets/images/propatyinfo/timelesscondminium-02.png'
  }
];

export default function PropertyFloorMapSwitcher() {
  const [activeFloor, setActiveFloor] = useState('1f');
  const activeFloorMap = FLOORS.find((floor) => floor.id === activeFloor) ?? FLOORS[0];

  return (
    <div className="property-info__detail-figure">
      <div className="property-info__detail-map">
        <p className="property-info__detail-label">Floor Map</p>

        <div className="property-info__floor-switch" role="tablist" aria-label="Floor selector">
          {FLOORS.map((floor) => {
            const isActive = floor.id === activeFloor;

            return (
              <button
                key={floor.id}
                type="button"
                className={`property-info__floor-button${isActive ? ' is-active' : ''}`}
                onClick={() => setActiveFloor(floor.id)}
                role="tab"
                aria-selected={isActive}
              >
                {floor.label}
              </button>
            );
          })}
        </div>

        <div className="property-info__detail-image-frame">
          <img
            src={activeFloorMap.image}
            alt={`THE SILENCE floor map ${activeFloorMap.label}`}
            className="property-info__detail-image"
          />
        </div>
      </div>

      <div className="property-info__detail-floor-image">
        <PropertyFloorImagePanel embedded />
      </div>
    </div>
  );
}
