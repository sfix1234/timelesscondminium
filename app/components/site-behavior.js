'use client';

import { useEffect } from 'react';

export default function SiteBehavior() {
  useEffect(() => {
    let cancelled = false;
    let propertySceneTrigger = null;
    let stagePhotoPinTrigger = null;
    let cleanupFns = [];
    let scrollObserver = null;

    const init = async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);
      const html = document.documentElement;
      html.classList.add('has-js');
      cleanupFns = [];
      const safeQuerySelector = (selector) => {
      if (!selector) return null;
      try {
        return document.querySelector(selector);
      } catch {
        return null;
      }
      };
      const createBezierEasing = (x1, y1, x2, y2) => {
      const calcBezier = (t, a1, a2) => (((1 - 3 * a2 + 3 * a1) * t + (3 * a2 - 6 * a1)) * t + (3 * a1)) * t;
      const getSlope = (t, a1, a2) => 3 * (1 - 3 * a2 + 3 * a1) * t * t + 2 * (3 * a2 - 6 * a1) * t + 3 * a1;
      const sampleCurveY = (t) => calcBezier(t, y1, y2);
      const sampleCurveX = (t) => calcBezier(t, x1, x2);
      const solveCurveX = (x) => {
        let t2 = x;
        for (let i = 0; i < 8; i += 1) {
          const sample = sampleCurveX(t2) - x;
          if (Math.abs(sample) < 1e-6) return t2;
          const d2 = getSlope(t2, x1, x2);
          if (Math.abs(d2) < 1e-6) break;
          t2 -= sample / d2;
        }
        let t0 = 0;
        let t1 = 1;
        t2 = x;
        while (t0 < t1) {
          const sample = sampleCurveX(t2);
          if (Math.abs(sample - x) < 1e-6) return t2;
          if (x > sample) t0 = t2;
          else t1 = t2;
          t2 = (t1 - t0) * 0.5 + t0;
        }
        return t2;
      };
      return (x) => sampleCurveY(solveCurveX(x));
    };
      const propertyInfoEase = createBezierEasing(0.16, 1, 0.3, 1);
      const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
      const on = (el, event, handler, options) => {
      if (!el) return;
      el.addEventListener(event, handler, options);
      cleanupFns.push(() => el.removeEventListener(event, handler, options));
      };

    const langToggle = document.getElementById('langToggle');
    const langMenu = document.getElementById('langMenu');
    const langItems = langMenu?.querySelectorAll('[data-lang]');
    let currentLang = 'ja';

    const applyLanguageBadge = (lang) => {
      currentLang = lang;
      const labelMap = { ja: 'JPN', en: 'ENG', koto: '江東語', yue: '広東語' };
      const htmlLangMap = { ja: 'ja', en: 'en', koto: 'zh-Hans', yue: 'zh-Hant' };
      if (langToggle) {
        langToggle.textContent = labelMap[lang] || 'JPN';
        langToggle.setAttribute('aria-label', 'Switch language');
      }
      html.lang = htmlLangMap[lang] || 'ja';
      langMenu?.classList.remove('is-open');
    };

    applyLanguageBadge('ja');

    function playAfter(selector, delay) {
      setTimeout(() => {
        document.querySelectorAll(selector).forEach((el) => {
          el.style.animationPlayState = 'running';
        });
      }, delay);
    }

    const heroStart = 0;
    playAfter('.jpn-badge__label', heroStart);
    playAfter('.jpn-badge__line', heroStart + 400);
    playAfter('.hamburger', heroStart + 200);
    playAfter('.center-block__title', heroStart + 500);
    playAfter('.hero__logo-overlay', heroStart + 900);

      on(langToggle, 'click', () => {
      langMenu?.classList.toggle('is-open');
      });

      langItems?.forEach((item) => {
      on(item, 'click', () => {
        const lang = item.getAttribute('data-lang');
        if (!lang || lang === currentLang) {
          langMenu?.classList.remove('is-open');
          return;
        }
        applyLanguageBadge(lang);
      });
      });

      on(document, 'click', (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      if (!target.closest('.jpn-badge')) {
        langMenu?.classList.remove('is-open');
      }
      });

      const observeVisibleSection = (el) => {
      if (!el) return;
      const thresholdAttr = Number.parseFloat(el.getAttribute('data-visible-threshold') || '');
      const threshold = Number.isFinite(thresholdAttr) ? thresholdAttr : 0.2;
      const rootMargin = el.getAttribute('data-visible-root-margin') || '0px';
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold, rootMargin });
      observer.observe(el);
      cleanupFns.push(() => observer.disconnect());
    };

    document.querySelectorAll('.story, .craftsmen, .stage, .registration').forEach((el) => observeVisibleSection(el));

    const stageTabs = document.querySelectorAll('.stage__tab');
    const stageSlides = document.querySelectorAll('.stage__slide');
    const stageInfos = document.querySelectorAll('.stage__info-block');

    const setActiveStage = (idx) => {
      if (!idx) return;

      stageTabs.forEach((t) => t.classList.toggle('is-active', t.dataset.tab === idx));
      stageSlides.forEach((s) => s.classList.toggle('is-active', s.dataset.slide === idx));
      stageInfos.forEach((i) => i.classList.toggle('is-active', i.dataset.info === idx));
    };

    stageTabs.forEach((tab) => {
      on(tab, 'click', () => {
        const idx = tab.dataset.tab;
        setActiveStage(idx);
      });
    });

    const hamburger = document.querySelector('.hamburger');
    const navOverlay = document.getElementById('navOverlay');
    const closeNavOverlay = () => {
      hamburger?.classList.remove('is-open');
      navOverlay?.classList.remove('is-open');
      html.classList.remove('no-scroll');
    };
    on(hamburger, 'click', () => {
      const isOpen = hamburger.classList.toggle('is-open');
      navOverlay?.classList.toggle('is-open', isOpen);
      html.classList.toggle('no-scroll', isOpen);
    });
    navOverlay?.querySelectorAll('.nav-overlay__link').forEach((link) => {
      on(link, 'click', (e) => {
        e.preventDefault();
        const targetSelector = link.getAttribute('data-target');
        const isPathNavigation = Boolean(targetSelector && targetSelector.startsWith('/'));
        let target =
          !isPathNavigation && targetSelector && targetSelector !== '#'
            ? safeQuerySelector(targetSelector)
            : null;

        const gatedRoot = target?.closest('.access-gate__content');
        const isTargetLocked = Boolean(
          gatedRoot &&
          (gatedRoot.classList.contains('is-locked') || gatedRoot.classList.contains('is-checking'))
        );
        if (isTargetLocked) {
          target = document.querySelector('.registration');
        }

        closeNavOverlay();
        if (isPathNavigation && targetSelector) {
          window.location.href = targetSelector;
          return;
        }
        if (target) {
          requestAnimationFrame(() => {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
        }
      });
    });

    const detailPanel = document.getElementById('detailPanel');
    const detailClose = document.getElementById('detailClose');
    const detailBody = detailPanel?.querySelector('.detail-panel__body');
    const detailOverlay = detailPanel?.querySelector('.detail-panel__overlay');
    const detailContents = detailPanel?.querySelectorAll('.detail-panel__content');
    const detailNextButtons = detailPanel?.querySelectorAll('.detail-panel__next');
    const viewMoreLinks = document.querySelectorAll('.stage__more-link');
    const artisanDetail = document.getElementById('artisanDetail');
    const artisanDetailClose = document.getElementById('artisanDetailClose');
    const artisanDetailOverlay = artisanDetail?.querySelector('.artisan-detail__overlay');
    const artisanDetailContents = artisanDetail?.querySelectorAll('.artisan-detail__content');
    const artisanMoreButtons = document.querySelectorAll('.artisan-card__more');
    const artisanMediaButtons = document.querySelectorAll('.artisan-card__media-button');
    let artisanScrollY = 0;

    function getActiveTabIdx() {
      const active = document.querySelector('.stage__tab.is-active');
      return active ? active.dataset.tab : '0';
    }

    function setActiveDetail(idx) {
      if (!idx) return;
      detailContents?.forEach((c) => c.classList.toggle('is-active', c.dataset.detail === idx));
      detailBody?.scrollTo({ top: 0, behavior: 'auto' });
    }

    function openDetail() {
      const idx = getActiveTabIdx();
      setActiveDetail(idx);
      detailPanel?.classList.add('is-open');
    }

    function closeDetail() {
      detailPanel?.classList.remove('is-open');
    }

    viewMoreLinks.forEach((link) => {
      on(link, 'click', (e) => {
        e.preventDefault();
        openDetail();
      });
    });

    on(detailClose, 'click', closeDetail);
    on(detailOverlay, 'click', closeDetail);
    detailNextButtons?.forEach((button) => {
      on(button, 'click', () => {
        const nextIdx = button.getAttribute('data-next-detail');
        if (!nextIdx) return;
        setActiveStage(nextIdx);
        setActiveDetail(nextIdx);
      });
    });

    function openArtisanDetail(idx) {
      closeDetail();
      artisanScrollY = window.scrollY;
      artisanDetailContents?.forEach((content) => content.classList.remove('is-active'));
      const activeContent = artisanDetail?.querySelector(`.artisan-detail__content[data-artisan-detail="${idx}"]`);
      activeContent?.classList.add('is-active');
      const iframe = activeContent?.querySelector('.artisan-detail__portrait-embed[data-src]');
      if (iframe && iframe instanceof HTMLIFrameElement && iframe.src === 'about:blank') {
        const src = iframe.getAttribute('data-src');
        if (src) iframe.src = src;
      }
      artisanDetail?.classList.add('is-open');
    }

    function closeArtisanDetail() {
      artisanDetail?.classList.remove('is-open');
      requestAnimationFrame(() => window.scrollTo({ top: artisanScrollY, left: 0, behavior: 'auto' }));
    }

    artisanMoreButtons.forEach((button) => {
      on(button, 'click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const idx = button.getAttribute('data-artisan');
        if (idx) openArtisanDetail(idx);
      });
    });

    artisanMediaButtons.forEach((button) => {
      on(button, 'click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const idx = button.getAttribute('data-artisan');
        if (idx) openArtisanDetail(idx);
      });
    });

    // Fallback: ensure artisan popup opens even if a browser/plugin interferes with button handlers.
    on(document, 'click', (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const trigger = target.closest('[data-artisan]');
      if (!trigger) return;
      e.preventDefault();
      e.stopPropagation();
      const idx = trigger.getAttribute('data-artisan');
      if (idx) openArtisanDetail(idx);
    }, true);

    on(artisanDetailClose, 'click', closeArtisanDetail);
    on(artisanDetailOverlay, 'click', closeArtisanDetail);
    on(document, 'keydown', (e) => {
      if (e.key === 'Escape' && artisanDetail?.classList.contains('is-open')) {
        closeArtisanDetail();
      }
    });

    const accessMapPin = document.querySelector('[data-map-pin]');
    const accessZoomWrap = document.querySelector('.property-access__zoom-wrap');

    on(accessMapPin, 'click', () => {
      if (!accessZoomWrap) return;
      accessZoomWrap.classList.add('is-visible');
    });

    const centerBlock = document.querySelector('.center-block:not(.hero__logo-overlay)');
    const floatingLogo = document.querySelector('.floating-logo');
    const storySection = document.querySelector('.story');
    const verticalCols = document.querySelectorAll('.story__vertical-col');
    const heroBg = document.querySelector('.hero__bg');
    const propertyHeader = document.querySelector('.property-hero__header');
    const craftsmenSection = document.querySelector('.craftsmen');
    const stagePhotoSection = document.querySelector('.stage-photo');
    const registrationSection = document.querySelector('.registration');
    const propertyKumaSection = document.getElementById('property-kuma');
    let stableViewportWidth = 0;
    let stableViewportHeight = 0;
    const measureViewport = () => ({
      width:
        window.visualViewport?.width
        ?? document.documentElement.clientWidth
        ?? window.innerWidth,
      height:
        window.visualViewport?.height
        ?? document.documentElement.clientHeight
        ?? window.innerHeight,
    });
    const getViewportHeight = () => {
      const { width, height } = measureViewport();
      const widthChanged = Math.abs(width - stableViewportWidth) > 1;

      if (!stableViewportHeight || widthChanged) {
        stableViewportWidth = width;
        stableViewportHeight = height;
        return stableViewportHeight;
      }

      // Keep the smallest viewport height on mobile so browser chrome changes
      // do not cause fixed elements to jitter during scroll.
      stableViewportHeight = Math.min(stableViewportHeight, height);
      return stableViewportHeight;
    };
      const updatePropertyScene = (sectionProgress, isSectionActive, isPinned) => {
      if (!propertyKumaSection) return;

      const revealStart = 0.12;
      const revealEnd = 0.5;
      const detailStart = 0.18;
      const detailEnd = 0.48;
      const floorImageStart = 0.8;
      const floorImageEnd = 0.99;

      const propertyInfoProgress = propertyInfoEase(
        clamp((sectionProgress - revealStart) / (revealEnd - revealStart), 0, 1)
      );
      const propertyInfoDetailProgress = propertyInfoEase(
        clamp((sectionProgress - detailStart) / (detailEnd - detailStart), 0, 1)
      );
      const propertyFloorImageProgress = propertyInfoEase(
        clamp((sectionProgress - floorImageStart) / (floorImageEnd - floorImageStart), 0, 1)
      );
      const propertyInfoOverlayOpacity = clamp((propertyInfoProgress - 0.12) / 0.28, 0, 1);
      const propertyInfoOverlayVisible = isSectionActive && propertyInfoProgress > 0.02;
      const propertyFloorImageVisible = propertyFloorImageProgress > 0.16;

      propertyKumaSection.style.setProperty('--property-info-progress', propertyInfoProgress.toFixed(4));
      propertyKumaSection.style.setProperty('--property-info-detail-progress', propertyInfoDetailProgress.toFixed(4));
      propertyKumaSection.style.setProperty('--property-floor-image-progress', propertyFloorImageProgress.toFixed(4));
      propertyKumaSection.style.setProperty('--property-info-overlay-opacity', propertyInfoOverlayOpacity.toFixed(4));
      propertyKumaSection.classList.toggle('is-property-info-active', propertyInfoOverlayVisible);
      propertyKumaSection.classList.toggle('is-kuma-pinned', isPinned);
      propertyKumaSection.classList.toggle('is-property-floor-image-active', propertyFloorImageVisible);
    };

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          try {
            const scrollY = window.scrollY;
            const vh = getViewportHeight();

            if (propertyHeader) {
              propertyHeader.classList.toggle('is-scrolled', scrollY > 72);
            }

            if (heroBg && !heroBg.classList.contains('hero__bg--video')) {
              heroBg.style.transform = `scale(${1 + scrollY * 0.0001}) translateY(${scrollY * 0.3}px)`;
            }

            if (centerBlock) {
              const cbFollowEnd = vh * 0.72;
              const cbProgress = Math.min(Math.max(scrollY / cbFollowEnd, 0), 1);
              const cbFollowY = cbProgress * vh * 0.18;
              if (scrollY <= 0) {
                centerBlock.style.opacity = '1';
                centerBlock.style.transform = 'translateY(0)';
              } else {
                centerBlock.style.opacity = String(1 - cbProgress);
                centerBlock.style.transform = `translateY(${cbFollowY}px)`;
              }
            }


            const setVerticalRevealed = (show) => {
              verticalCols.forEach((col) => col.classList.toggle('is-revealed', show));
            };

            // Read storyRect once and reuse
            const heroStoryScene = document.querySelector('.hero-story-scene');
            const sceneRect = heroStoryScene ? heroStoryScene.getBoundingClientRect() : null;
            const storyRect = storySection ? storySection.getBoundingClientRect() : null;
            if (floatingLogo && sceneRect) {
              const releaseTriggered = sceneRect.bottom <= vh + 18;
              floatingLogo.classList.toggle('is-released', releaseTriggered);
            }
            if (storyRect) {
              const storyRevealTriggered = storyRect.top <= vh * 0.78 && storyRect.bottom >= vh * 0.28;
              setVerticalRevealed(storyRevealTriggered);
            }

            if (craftsmenSection) {
              const rect = craftsmenSection.getBoundingClientRect();
              const start = vh * 0.14;
              const span = Math.max(rect.height - vh * 0.24, vh * 0.95);
              const progress = Math.min(Math.max((start - rect.top) / span, 0), 1);
              craftsmenSection.style.setProperty('--craftsmen-overlay-progress', progress.toFixed(3));

              if (!craftsmenSection.classList.contains('is-animated') && rect.top <= vh * 0.72) {
                craftsmenSection.classList.add('is-animated');
              }
            }

          } catch (error) {
            console.error('[site-behavior] scroll animation error', error);
          } finally {
            ticking = false;
          }
        });
        ticking = true;
      }
    };

      on(window, 'scroll', onScroll, { passive: true });
      on(window, 'resize', onScroll, { passive: true });
      on(window.visualViewport, 'resize', onScroll, { passive: true });
      onScroll();

      // 礎の匠カード: 左から順番にフェードイン
      const artisanFiveSection = document.querySelector('.artisans-five');
      if (artisanFiveSection) {
        const artisanFiveCards = artisanFiveSection.querySelectorAll('.artisan-card');
        if (artisanFiveCards.length) {
          gsap.set(artisanFiveCards, { autoAlpha: 0, yPercent: 8, willChange: 'transform, opacity' });
          const artisanObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                gsap.to(artisanFiveCards, {
                  autoAlpha: 1,
                  yPercent: 0,
                  duration: 0.6,
                  ease: 'sine.out',
                  stagger: 0.1,
                  onComplete: () => gsap.set(artisanFiveCards, { willChange: 'auto' }),
                });
                artisanObserver.disconnect();
              }
            });
          }, { threshold: 0.15 });
          artisanObserver.observe(artisanFiveSection);
          cleanupFns.push(() => artisanObserver.disconnect());
        }
      }

      // 彩の匠カード: 左から順番にフェードイン
      const artisanColorSection = document.querySelector('.artisans-color');
      if (artisanColorSection) {
        const artisanColorCards = artisanColorSection.querySelectorAll('.artisan-card');
        if (artisanColorCards.length) {
          gsap.set(artisanColorCards, { autoAlpha: 0, yPercent: 8, willChange: 'transform, opacity' });
          const colorObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                gsap.to(artisanColorCards, {
                  autoAlpha: 1,
                  yPercent: 0,
                  duration: 0.6,
                  ease: 'sine.out',
                  stagger: 0.1,
                  onComplete: () => gsap.set(artisanColorCards, { willChange: 'auto' }),
                });
                colorObserver.disconnect();
              }
            });
          }, { threshold: 0.45 });
          colorObserver.observe(artisanColorSection);
          cleanupFns.push(() => colorObserver.disconnect());
        }
      }


    if (propertyKumaSection) {
        const pinEnd = 0.985;
        updatePropertyScene(0, false, false);
        propertySceneTrigger = ScrollTrigger.create({
          trigger: propertyKumaSection,
          start: 'top top',
          end: 'bottom+=40% bottom',
          scrub: 1.9,
          onUpdate: (self) => {
            const sectionProgress = clamp(self.progress, 0, 1);
            const isPinned = self.isActive && sectionProgress < pinEnd;
            updatePropertyScene(sectionProgress, self.isActive, isPinned);
          },
          onLeave: () => updatePropertyScene(1, false, false),
          onLeaveBack: () => updatePropertyScene(0, false, false),
        });
      }

    };

    init();

    return () => {
      cancelled = true;
      scrollObserver?.disconnect();
      cleanupFns.forEach((fn) => fn());
      propertySceneTrigger?.kill();
      stagePhotoPinTrigger?.kill();
      const html = document.documentElement;
      html.classList.remove('no-scroll');
      html.classList.remove('has-js');
    };
  }, []);

  return null;
}
