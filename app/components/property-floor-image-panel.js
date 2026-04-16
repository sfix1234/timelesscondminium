'use client';

import { useState, useRef, useEffect } from 'react';

const IMAGE_ANNOTATIONS = {
  entrance: [
    {
      id: 'left',
      copy: ['エントランス左側、黒竹を映す漆喰が趣を添える'],
      copyEn: ['Plaster walls reflecting black bamboo lend an air of elegance to the entrance'],
      copyZhHans: ['玄关左侧，映照黑竹的灰泥墙增添雅趣'],
      copyZhHant: ['玄關左側，映照黑竹的灰泥牆增添雅趣'],
      point: { x: 35, y: 49 },
      elbow: { x: 31, y: 20 },
      anchor: { x: 43, y: 20 },
      card: { top: '19%', left: '9%', width: '46%' }
    },
    {
      id: 'top',
      copy: ['京都の数寄屋の趣を受け継ぐ、吹き抜けのエントランス'],
      copyEn: ['A double-height entrance inheriting the spirit of Kyoto sukiya design'],
      copyZhHans: ['承袭京都数寄屋之趣的挑高玄关'],
      copyZhHant: ['承襲京都數寄屋之趣的挑高玄關'],
      point: { x: 50, y: 7 },
      elbow: { x: 56, y: 18 },
      anchor: { x: 63, y: 18 },
      card: { top: '17%', left: '19%', width: '40%' }
    },
    {
      id: 'right',
      copy: ['大仏師・江里康慧の手による、', '祈りを象徴するエントランスオブジェ'],
      copyEn: ['An entrance object symbolizing prayer,', 'crafted by master sculptor K\u014Dkei Eri'],
      copyZhHans: ['出自大佛师江里康慧之手，', '象征祈愿的玄关艺术品'],
      copyZhHant: ['出自大佛師江里康慧之手，', '象徵祈願的玄關藝術品'],
      point: { x: 67, y: 53 },
      elbow: { x: 76, y: 22 },
      anchor: { x: 66, y: 22 },
      card: { top: '21%', left: '22%', width: '38%' }
    }
  ],
  'dining-kitchen-living': [
    {
      id: 'main',
      copy: ['黒竹と白竹のスクリーンに、四季の花々が静かに迎える'],
      copyEn: ['Seasonal flowers greet quietly through a screen of black and white bamboo'],
      copyZhHans: ['黑竹与白竹构成的屏风间，四季花卉静然相迎'],
      copyZhHant: ['黑竹與白竹構成的屏風間，四季花卉靜然相迎'],
      point: { x: 68.5, y: 42 },
      elbow: { x: 57, y: 18 },
      anchor: { x: 46, y: 18 },
      card: { top: '17%', left: '8%', width: '38%' }
    },
    {
      id: 'pillar',
      copy: ['無数の柱を、金剛組の技で二本へ', '広々としたLDKを実現'],
      copyEn: ['Countless pillars reduced to two', 'by Kong\u014D Gumi\u2019s craftsmanship, creating a spacious LDK'],
      copyZhHans: ['以金刚组之技艺将无数立柱精减为两根，', '实现开阔宽敞的客餐厨空间'],
      copyZhHant: ['以金剛組之技藝將無數立柱精減為兩根，', '實現開闊寬敞的客餐廚空間'],
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
      copyEn: ['Original artwork by Rakush\u014D Hiroto'],
      copyZhHans: ['裕人砾翔的原创艺术作品'],
      copyZhHant: ['裕人礫翔的原創藝術作品'],
      point: { x: 87, y: 39 },
      elbow: { x: 74, y: 18 },
      anchor: { x: 62, y: 18 },
      card: { top: '16%', left: '18%', width: '40%' }
    }
  ],
  'inner-garden-a': [
    {
      id: 'top',
      copy: ['隈研吾氏の代名詞でもある連続したルーバーの大屋根'],
      copyEn: ['The signature continuous louver roof by Kengo Kuma'],
      copyZhHans: ['隈研吾标志性的连续百叶大屋顶'],
      copyZhHant: ['隈研吾標誌性的連續百葉大屋頂'],
      point: { x: 50, y: 16 },
      elbow: { x: 41, y: 19 },
      anchor: { x: 30, y: 19 },
      card: { top: '18%', left: '7%', width: '40%' }
    },
    {
      id: 'center',
      copy: ['アルマーニ / カーザの', 'ファブリックをガラスに挟んだ壁面'],
      copyEn: ['Armani / Casa fabric', 'sandwiched within glass wall panels'],
      copyZhHans: ['将Armani / Casa的织物', '夹于玻璃之中的壁面'],
      copyZhHant: ['將Armani / Casa的織物', '夾於玻璃之中的壁面'],
      point: { x: 50.8, y: 48 },
      elbow: { x: 38, y: 27 },
      anchor: { x: 27, y: 27 },
      card: { top: '26%', left: '6%', width: '40%' }
    },
    {
      id: 'bottom',
      copy: ['透かし障子を用いた、和の意匠'],
      copyEn: ['Japanese design with openwork sh\u014Dji screens'],
      copyZhHans: ['运用镂空障子的和风意匠'],
      copyZhHant: ['運用鏤空障子的和風意匠'],
      point: { x: 12.2, y: 58 },
      elbow: { x: 28, y: 43 },
      anchor: { x: 40, y: 43 },
      card: { top: '42%', left: '12%', width: '40%' }
    }
  ],
  'inner-garden-b': [
    {
      id: 'main',
      copy: ['壇落ちの滝より流れ出る水が、池へと満ちる'],
      copyEn: ['Water flowing from the cascading falls fills the pond'],
      copyZhHans: ['从坛落瀑布涌出的水流，注满池中'],
      copyZhHant: ['從壇落瀑布湧出的水流，注滿池中'],
      point: { x: 45, y: 80 },
      elbow: { x: 65, y: 22 },
      anchor: { x: 76, y: 22 },
      card: { top: '21%', left: '55%', width: '38%' }
    }
  ],
  'hiroma-hanare': [
    {
      id: 'main',
      copy: ['十一代和泉守兼定によるディスプレイ'],
      copyEn: ['Display featuring the sword of Izuminokami Kanesada, 11th generation'],
      copyZhHans: ['以第十一代和泉守兼定之刀为主题的陈列'],
      copyZhHant: ['以第十一代和泉守兼定之刀為主題的陳列'],
      point: { x: 41, y: 53 },
      elbow: { x: 55, y: 58 },
      anchor: { x: 66, y: 58 },
      card: { top: '58%', left: '55%', width: '38%' }
    }
  ],
  'tea-room-hanare': [
    {
      id: 'top',
      copy: ['竹をテーマとした茶室を、中村外二の技で蘇らせる'],
      copyEn: ['A bamboo-themed tea room revived by Nakamura Sotoji\u2019s craftsmanship'],
      copyZhHans: ['以竹为主题的茶室，经中村外二之技艺重现'],
      copyZhHant: ['以竹為主題的茶室，經中村外二之技藝重現'],
      point: { x: 30, y: 15 },
      elbow: { x: 20, y: 18 },
      anchor: { x: 10, y: 18 },
      card: { top: '17%', left: '2%', width: '38%' }
    },
  ],
  'bathroom-kura': [
    {
      id: 'main',
      copy: ['ここにしか存在しない、アルマーニ / カーザの家具'],
      copyEn: ['Armani / Casa furniture, exclusive to this residence'],
      copyZhHans: ['仅此一处的Armani / Casa家具'],
      copyZhHant: ['僅此一處的Armani / Casa家具'],
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
      copyEn: ['A fresh green bamboo objet, imbued with vitality'],
      copyZhHans: ['以青竹构成、蕴含鲜润生机的艺术品'],
      copyZhHant: ['以青竹構成、蘊含鮮潤生機的藝術品'],
      point: { x: 13.5, y: 50 },
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
    beforeSrc: '/assets/images/before/5before_sm.jpg',
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

function renderGalleryLabel(label) {
  return label.split(/(\d)(F)/g).map((part, index) => {
    if (part === 'F') {
      return <span key={`gallery-floor-suffix-${index}`}>{part}</span>;
    }

    if (/^\d$/.test(part)) {
      return (
        <span key={`gallery-floor-number-${index}`} className="property-floor-gallery__floor-number">
          {part}
        </span>
      );
    }

    return <span key={`gallery-floor-text-${index}`}>{part}</span>;
  });
}

export default function PropertyFloorImagePanel({ embedded = false }) {
  const [activeGalleryId, setActiveGalleryId] = useState(GALLERY_ITEMS[0].id);
  const [activeView, setActiveView] = useState('after');
  const [activeAnnotationId, setActiveAnnotationId] = useState('');
  const [lang, setLang] = useState('ja');
  const thumbsRef = useRef(null);

  useEffect(() => {
    const updateLang = () => setLang((document.documentElement.lang || 'ja').toLowerCase());
    updateLang();
    const observer = new MutationObserver(updateLang);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = thumbsRef.current;
    if (!container) return;
    const activeThumb = container.querySelector('.is-active');
    if (!activeThumb) return;
    // Only scroll the horizontal thumbnail strip, never the window.
    const target = activeThumb.offsetLeft + activeThumb.offsetWidth / 2 - container.clientWidth / 2;
    const maxScroll = container.scrollWidth - container.clientWidth;
    const next = Math.max(0, Math.min(maxScroll, target));
    container.scrollTo({ left: next, behavior: 'smooth' });
  }, [activeGalleryId]);
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
          <p className={`property-floor-gallery__current${isLongGalleryLabel ? ' property-floor-gallery__current--long' : ''}`}>{renderGalleryLabel(activeGalleryItem.label)}</p>
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
                        aria-label={(lang === 'zh-hant' && annotation.copyZhHant ? annotation.copyZhHant : lang === 'zh-hans' && annotation.copyZhHans ? annotation.copyZhHans : lang !== 'ja' && annotation.copyEn ? annotation.copyEn : annotation.copy).join('')}
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
                        {(lang === 'zh-hant' && activeAnnotation.copyZhHant ? activeAnnotation.copyZhHant : lang === 'zh-hans' && activeAnnotation.copyZhHans ? activeAnnotation.copyZhHans : lang !== 'ja' && activeAnnotation.copyEn ? activeAnnotation.copyEn : activeAnnotation.copy).map((line) => (
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

        <div className="property-floor-gallery__thumbnails" ref={thumbsRef} role="tablist" aria-label="Floor image gallery thumbnails">
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
