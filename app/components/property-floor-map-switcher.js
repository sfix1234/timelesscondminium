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
  const isFirstFloor = activeFloorMap.id === '1f';

  return (
    <div className="property-info__detail-figure">
      <div className="property-info__detail-map">
        <div className="property-info__detail-panel">
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
        </div>

        <div className="property-info__detail-image-frame">
          <img
            src={activeFloorMap.image}
            alt={`THE SILENCE floor map ${activeFloorMap.label}`}
            className={`property-info__detail-image${isFirstFloor ? ' property-info__detail-image--floor-1f' : ' property-info__detail-image--floor-2f'}`}
          />
          <div className="property-info__road-overlay" aria-hidden="true" style={{ display: isFirstFloor ? undefined : 'none' }}>
            <div className="property-info__road property-info__road--left">
              <span className="property-info__road-line property-info__road-line--outer"></span>
              <span className="property-info__road-label" data-ja="上七軒通り" data-en="Kamishichiken Street" data-zh-hans="上七轩通" data-zh-hant="上七軒通">上七軒通り</span>
              <span className="property-info__road-line property-info__road-line--inner"></span>
            </div>
            <div className="property-info__road property-info__road--right">
              <span className="property-info__road-line property-info__road-line--outer"></span>
              <span className="property-info__road-label" data-ja="五辻通り" data-en="Itsutsuji Street" data-zh-hans="五辻通" data-zh-hant="五辻通">五辻通り</span>
              <span className="property-info__road-line property-info__road-line--inner"></span>
            </div>
          </div>
        </div>
      </div>

      <div className="property-info__detail-floor-image">
        <PropertyFloorImagePanel embedded />
      </div>
    </div>
  );
}
