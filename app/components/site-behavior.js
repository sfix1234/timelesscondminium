'use client';

import { useEffect } from 'react';

export default function SiteBehavior() {
  useEffect(() => {
    let cancelled = false;
    let propertySceneTrigger = null;
    let floatingLogo = null;
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
    const i18nElements = document.querySelectorAll('[data-ja][data-en]');
    let currentLang = 'ja';

    const applyLanguage = (lang) => {
      if (lang === 'ja' || lang === 'en') {
        i18nElements.forEach((el) => {
          const next = lang === 'ja' ? el.getAttribute('data-ja') : el.getAttribute('data-en');
          if (next) el.innerHTML = next;
        });
      }
      currentLang = lang;
      html.lang = lang;
      if (langToggle) {
        const labelMap = { ja: 'JPN', en: 'ENG', koto: '江東語', yue: '広東語' };
        langToggle.textContent = labelMap[lang] || 'JPN';
        langToggle.setAttribute('aria-label', 'Switch language');
      }
      langMenu?.classList.remove('is-open');
    };

    applyLanguage('ja');

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
        if (lang) applyLanguage(lang);
      });
    });

    on(document, 'click', (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      if (!target.closest('.jpn-badge')) {
        langMenu?.classList.remove('is-open');
      }
    });

      scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          scrollObserver.unobserve(entry.target);
        }
      });
      }, { threshold: 0.2 });

    document.querySelectorAll('.story, .craftsmen, .stage, .registration').forEach((el) => scrollObserver.observe(el));

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
    const viewMoreLink = document.querySelector('.stage__more-link');
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

    on(viewMoreLink, 'click', (e) => {
      e.preventDefault();
      openDetail();
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

    const centerBlock = document.querySelector('.center-block:not(.hero__logo-overlay)');
    const storySection = document.querySelector('.story');
    const storyBrandName = document.querySelector('.story__brand-name');
    const verticalCols = document.querySelectorAll('.story__vertical-col');
    const heroBg = document.querySelector('.hero__bg');
    const craftsmenSection = document.querySelector('.craftsmen');
    const propertyKumaSection = document.getElementById('property-kuma');
      const updatePropertyScene = (sectionProgress, isSectionActive, isPinned) => {
      if (!propertyKumaSection) return;

      const revealStart = 0.18;
      const revealEnd = 0.6;
      const detailStart = 0.58;
      const detailEnd = 0.82;
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

      floatingLogo = document.createElement('div');
      floatingLogo.className = 'floating-logo';
      floatingLogo.innerHTML = '<div class="floating-logo__main"><img src="/assets/images/THE%20SILENCE_logo.png" alt="THE SILENCE" class="floating-logo__image" /></div>';
      document.body.appendChild(floatingLogo);

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          try {
            const scrollY = window.scrollY;
            const vh = window.innerHeight;

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

            if (storySection) {
              const rect = storySection.getBoundingClientRect();
              const riseDistance = vh * 0.18;
              const progress = Math.min(Math.max((vh - rect.top) / (vh * 0.82), 0), 1);
              const offset = (1 - progress) * riseDistance;
              storySection.style.transform = `translateY(${offset}px)`;
            }

            const revealStart = vh * 0.68;

            const setVerticalRevealed = (show) => {
              verticalCols.forEach((col) => col.classList.toggle('is-revealed', show));
            };

            if (storyBrandName) {
              if (scrollY <= revealStart) {
                floatingLogo.style.opacity = '0';
                storyBrandName.classList.remove('is-revealed');
                setVerticalRevealed(false);
              } else {
                floatingLogo.style.opacity = '0';
                storyBrandName.classList.add('is-revealed');
                setVerticalRevealed(true);
              }
            }

            if (craftsmenSection) {
              const rect = craftsmenSection.getBoundingClientRect();
              const start = vh * 0.14;
              const span = Math.max(rect.height - vh * 0.24, vh * 0.95);
              const progress = Math.min(Math.max((start - rect.top) / span, 0), 1);
              craftsmenSection.style.setProperty('--craftsmen-overlay-progress', progress.toFixed(3));
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
      onScroll();

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
      floatingLogo?.remove();
      const html = document.documentElement;
      html.classList.remove('no-scroll');
      html.classList.remove('has-js');
    };
  }, []);

  return null;
}
