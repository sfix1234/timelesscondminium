'use client';

import { useState } from 'react';

const IMAGE_ANNOTATIONS = {
  entrance: [
    {
      id: 'left',
      copy: ['エントランス左側、', '黒竹を映す漆喰が趣を添える'],
      point: { x: 35, y: 49 },
      elbow: { x: 31, y: 20 },
      anchor: { x: 43, y: 20 },
      card: { top: '19%', left: '9%', width: '46%' }
    },
    {
      id: 'top',
      copy: ['京都の数寄屋の趣を受け継ぐ、', '吹き抜けのエントランス'],
      point: { x: 50, y: 7 },
      elbow: { x: 56, y: 18 },
      anchor: { x: 63, y: 18 },
      card: { top: '17%', left: '19%', width: '40%' }
    },
    {
      id: 'right',
      copy: ['大仏師・江里康慧の手による、', '祈りを象徴するエントランスオブジェ'],
      point: { x: 67, y: 53 },
      elbow: { x: 76, y: 22 },
      anchor: { x: 66, y: 22 },
      card: { top: '21%', left: '22%', width: '38%' }
    }
  ],
  'dining-kitchen-living': [
    {
      id: 'main',
      copy: ['黒竹と白竹のスクリーンに、', '四季の花々が静かに迎える'],
      point: { x: 68.5, y: 42 },
      elbow: { x: 57, y: 18 },
      anchor: { x: 46, y: 18 },
      card: { top: '17%', left: '8%', width: '38%' }
    },
    {
      id: 'pillar',
      copy: ['無数の柱を、金剛組の技で二本へ。', '広々としたLDKを実現'],
      point: { x: 44, y: 50 },
      elbow: { x: 65, y: 68 },
      anchor: { x: 78, y: 68 },
      card: { top: '67%', left: '60%', width: '38%' }
    }
  ],
  'dining': [],
  'master-bedroom': [
    {
      id: 'main',
      copy: ['裕人礫翔のオリジナルアート'],
      point: { x: 87, y: 39 },
      elbow: { x: 74, y: 18 },
      anchor: { x: 62, y: 18 },
      card: { top: '16%', left: '18%', width: '40%' }
    }
  ],
  'inner-garden-a': [
    {
      id: 'top',
      copy: ['隈研吾氏の代名詞でもある', '連続したルーバーの大屋根'],
      point: { x: 50.5, y: 11 },
      elbow: { x: 41, y: 19 },
      anchor: { x: 30, y: 19 },
      card: { top: '18%', left: '7%', width: '40%' }
    },
    {
      id: 'center',
      copy: ['アルマーニ / カーザの', 'ファブリックをガラスに挟んだ壁面'],
      point: { x: 50.8, y: 48 },
      elbow: { x: 38, y: 27 },
      anchor: { x: 27, y: 27 },
      card: { top: '26%', left: '6%', width: '40%' }
    },
    {
      id: 'bottom',
      copy: ['透かし障子を用いた、和の意匠'],
      point: { x: 12.2, y: 58 },
      elbow: { x: 28, y: 43 },
      anchor: { x: 40, y: 43 },
      card: { top: '42%', left: '12%', width: '40%' }
    }
  ],
  'inner-garden-b': [
    {
      id: 'main',
      copy: ['壇落ちの滝より流れ出る水が、', '池へと満ちる'],
      point: { x: 55, y: 95 },
      elbow: { x: 65, y: 22 },
      anchor: { x: 76, y: 22 },
      card: { top: '21%', left: '55%', width: '38%' }
    }
  ],
  'hiroma-hanare': [
    {
      id: 'main',
      copy: ['十一代和泉守兼定によるディスプレイ'],
      point: { x: 47, y: 60 },
      elbow: { x: 55, y: 58 },
      anchor: { x: 66, y: 58 },
      card: { top: '58%', left: '55%', width: '38%' }
    }
  ],
  'tea-room-hanare': [
    {
      id: 'top',
      copy: ['竹をテーマとした茶室を、', '中村外二の技で蘇らせる'],
      point: { x: 30, y: 8 },
      elbow: { x: 20, y: 18 },
      anchor: { x: 10, y: 18 },
      card: { top: '17%', left: '2%', width: '38%' }
    },
  ],
  'bathroom-kura': [
    {
      id: 'main',
      copy: ['ここにしか存在しない、', 'アルマーニ / カーザの家具'],
      point: { x: 68, y: 48 },
      elbow: { x: 65, y: 68 },
      anchor: { x: 76, y: 68 },
      card: { top: '67%', left: '58%', width: '38%' }
    }
  ],
  'bathroom-archive': [
    {
      id: 'main',
      copy: ['青竹による、みずみずしさを宿すオブジェ'],
      point: { x: 8.5, y: 46 },
      elbow: { x: 27, y: 21 },
      anchor: { x: 38, y: 21 },
      card: { top: '20%', left: '10%', width: '40%' }
    }
  ],
  'gallery-12': []
};

const GALLERY_ITEMS = [
  {
    id: 'entrance',
    label: 'ENTRANCE',
    beforeSrc: '/assets/images/before/1before_sm.jpg',
    afterSrc: '/assets/images/propatyinfo/1entrance_after.jpg'
  },
  {
    id: 'dining-kitchen-living',
    label: 'DINING KITCHEN LIVING ROOM / 主屋 1F',
    beforeSrc: '/assets/images/before/2before_sm.jpg',
    afterSrc: '/assets/images/propatyinfo/2dining_after.jpg'
  },
  {
    id: 'dining',
    label: 'DINING / 主屋 1F',
    beforeSrc: '/assets/images/before/3before_sm.jpg',
    afterSrc: '/assets/images/propatyinfo/3dining1F_after.jpg'
  },
  {
    id: 'bathroom-kura',
    label: 'DINING KITCHEN LIVING ROOM / 主屋 1F',
    beforeSrc: '/assets/images/before/4before_sm.jpg',
    afterSrc: '/assets/images/propatyinfo/4bathroom_after.jpg'
  },
  {
    id: 'master-bedroom',
    label: 'MASTER BEDROOM / 主屋 2F',
    beforeSrc: '/assets/images/before/5before_sm.png',
    afterSrc: '/assets/images/propatyinfo/5MASTERBEDROOM.jpg'
  },
  {
    id: 'inner-garden-a',
    label: 'INNER GARDEN / 庭',
    beforeSrc: '/assets/images/before/6before_sm.jpg',
    afterSrc: '/assets/images/propatyinfo/6innergarden_after.jpg'
  },
  {
    id: 'inner-garden-b',
    label: 'INNER GARDEN / 庭',
    beforeSrc: '/assets/images/before/7before_sm.jpg',
    afterSrc: '/assets/images/propatyinfo/7INNERGARDEN.jpg'
  },
  {
    id: 'hiroma-hanare',
    label: '大広間 / 離れ',
    beforeSrc: '/assets/images/before/8before_sm.jpg',
    afterSrc: '/assets/images/propatyinfo/8hiromahanare.jpg'
  },
  {
    id: 'tea-room-hanare',
    label: '茶室 / 離れ',
    beforeSrc: '/assets/images/before/9before_sm.jpg',
    afterSrc: '/assets/images/propatyinfo/9tyayahanare.jpg'
  },
  {
    id: 'bathroom-archive',
    label: 'BATHROOM / 蔵',
    beforeSrc: '/assets/images/before/10before_sm.jpg',
    afterSrc: '/assets/images/propatyinfo/10bathroom.jpg'
  }
];

export default function PropertyFloorImagePanel({ embedded = false }) {
  const [activeGalleryId, setActiveGalleryId] = useState(GALLERY_ITEMS[0].id);
  const [activeView, setActiveView] = useState('after');
  const [activeAnnotationId, setActiveAnnotationId] = useState('');
  const activeGalleryItem = GALLERY_ITEMS.find((item) => item.id === activeGalleryId) ?? GALLERY_ITEMS[0];
  const activeGalleryIndex = GALLERY_ITEMS.findIndex((item) => item.id === activeGalleryId);
  const activeGallerySrc = activeView === 'before' ? activeGalleryItem.beforeSrc : activeGalleryItem.afterSrc;
  const prevGalleryItem = GALLERY_ITEMS[(activeGalleryIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length];
  const nextGalleryItem = GALLERY_ITEMS[(activeGalleryIndex + 1) % GALLERY_ITEMS.length];
  const prevGallerySrc = activeView === 'before' ? prevGalleryItem.beforeSrc : prevGalleryItem.afterSrc;
  const nextGallerySrc = activeView === 'before' ? nextGalleryItem.beforeSrc : nextGalleryItem.afterSrc;
  const activeAnnotations = activeView === 'after' ? IMAGE_ANNOTATIONS[activeGalleryId] || [] : [];
  const activeAnnotation = activeAnnotations.find((annotation) => annotation.id === activeAnnotationId) ?? null;
  const isLongGalleryLabel = activeGalleryItem.label.length > 20;

  const goToGalleryItem = (nextIndex) => {
    const safeIndex = (nextIndex + GALLERY_ITEMS.length) % GALLERY_ITEMS.length;
    setActiveGalleryId(GALLERY_ITEMS[safeIndex].id);
    setActiveView('after');
    setActiveAnnotationId('');
  };

  return (
    <div className={`property-floor-image__panel${embedded ? ' property-floor-image__panel--embedded' : ''}`}>
      <h3 className="property-floor-image__heading">Floor Image</h3>

      <div className="property-floor-gallery">
        <div className="property-floor-gallery__meta">
          <p className={`property-floor-gallery__current${isLongGalleryLabel ? ' property-floor-gallery__current--long' : ''}`}>{activeGalleryItem.label}</p>
          <div className="property-floor-gallery__toggle" role="tablist" aria-label="Before after toggle">
            <button
              type="button"
              role="tab"
              aria-selected={activeView === 'before'}
              className={`property-floor-gallery__toggle-button${activeView === 'before' ? ' is-active' : ''}`}
              onClick={() => {
                setActiveView('before');
                setActiveAnnotationId('');
              }}
            >
              Before
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeView === 'after'}
              className={`property-floor-gallery__toggle-button${activeView === 'after' ? ' is-active' : ''}`}
              onClick={() => setActiveView('after')}
            >
              After
            </button>
          </div>
        </div>

        <div className="property-floor-gallery__viewer">
          <button
            type="button"
            className="property-floor-gallery__preview property-floor-gallery__preview--prev"
            onClick={() => goToGalleryItem(activeGalleryIndex - 1)}
            aria-label={`${prevGalleryItem.label} へ移動`}
          >
            <img
              src={prevGallerySrc}
              alt={prevGalleryItem.label}
              className="property-floor-gallery__preview-image"
            />
          </button>

          <div className="property-floor-gallery__stage">
            <div className="property-floor-gallery__frame">
              <button
                type="button"
                className="property-floor-gallery__nav property-floor-gallery__nav--prev"
                onClick={() => goToGalleryItem(activeGalleryIndex - 1)}
                aria-label="前の画像へ"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M12.5 4L6.5 10L12.5 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <img
                key={activeGalleryId}
                src={activeGallerySrc}
                alt={activeGalleryItem.label}
                className="property-floor-gallery__image"
              />
              <button
                type="button"
                className="property-floor-gallery__nav property-floor-gallery__nav--next"
                onClick={() => goToGalleryItem(activeGalleryIndex + 1)}
                aria-label="次の画像へ"
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M7.5 4L13.5 10L7.5 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              {activeAnnotations.length ? (
                <div className="property-floor-gallery__pointers">
                  {activeAnnotation ? (
                    <svg
                      className="property-floor-gallery__callout-line"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path
                        d={`M ${activeAnnotation.point.x} ${activeAnnotation.point.y} L ${activeAnnotation.elbow.x} ${activeAnnotation.elbow.y} L ${activeAnnotation.anchor.x} ${activeAnnotation.anchor.y}`}
                      />
                    </svg>
                  ) : null}

                  {activeAnnotations.map((annotation) => {
                    const isActive = annotation.id === activeAnnotation?.id;

                    return (
                      <button
                        key={annotation.id}
                        type="button"
                        className={`property-floor-gallery__pointer${isActive ? ' is-active' : ''}`}
                        style={{ left: `${annotation.point.x}%`, top: `${annotation.point.y}%` }}
                        onClick={() =>
                          setActiveAnnotationId((current) => (current === annotation.id ? '' : annotation.id))
                        }
                        aria-label={annotation.copy.join('')}
                        aria-pressed={isActive}
                      >
                        <span className="property-floor-gallery__pointer-core"></span>
                      </button>
                    );
                  })}

                  {activeAnnotation ? (
                    <div
                      className="property-floor-gallery__callout"
                      style={activeAnnotation.card}
                    >
                      <button
                        type="button"
                        className="property-floor-gallery__callout-close"
                        onClick={() => setActiveAnnotationId('')}
                        aria-label="注釈を閉じる"
                      >
                        <span></span>
                        <span></span>
                      </button>
                      <span className="property-floor-gallery__callout-accent"></span>
                      <div className="property-floor-gallery__callout-body">
                        {activeAnnotation.copy.map((line) => (
                          <p key={`${activeAnnotation.id}-${line}`} className="property-floor-gallery__callout-line-text">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>

          <button
            type="button"
            className="property-floor-gallery__preview property-floor-gallery__preview--next"
            onClick={() => goToGalleryItem(activeGalleryIndex + 1)}
            aria-label={`${nextGalleryItem.label} へ移動`}
          >
            <img
              src={nextGallerySrc}
              alt={nextGalleryItem.label}
              className="property-floor-gallery__preview-image"
            />
          </button>
        </div>

        <div className="property-floor-gallery__thumbnails" role="tablist" aria-label="Floor image gallery thumbnails">
          {GALLERY_ITEMS.map((item) => {
            const isActive = item.id === activeGalleryId;

            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`property-floor-gallery__thumb${isActive ? ' is-active' : ''}`}
                onClick={() => goToGalleryItem(GALLERY_ITEMS.findIndex((galleryItem) => galleryItem.id === item.id))}
              >
                <img
                  src={item.afterSrc}
                  alt={item.label}
                  className="property-floor-gallery__thumb-image"
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
