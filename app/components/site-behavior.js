'use client';

import { useEffect } from 'react';

export default function SiteBehavior() {
  useEffect(() => {
    const html = document.documentElement;
    html.classList.add('has-js');
    const cleanupFns = [];
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
    playAfter('.header__logo', heroStart + 200);
    playAfter('.hamburger', heroStart + 200);
    playAfter('.center-block__title', heroStart + 500);
    playAfter('.center-block__number', heroStart + 1000);
    playAfter('.center-block__line', heroStart + 1500);
    playAfter('.bottom-logo__main', heroStart + 800);
    playAfter('.bottom-logo__sub', heroStart + 1100);

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

    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          scrollObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.story, .craftsmen, .stage').forEach((el) => scrollObserver.observe(el));

    const stageTabs = document.querySelectorAll('.stage__tab');
    const stageSlides = document.querySelectorAll('.stage__slide');
    const stageInfos = document.querySelectorAll('.stage__info-block');

    stageTabs.forEach((tab) => {
      on(tab, 'click', () => {
        const idx = tab.dataset.tab;

        stageTabs.forEach((t) => t.classList.remove('is-active'));
        tab.classList.add('is-active');

        stageSlides.forEach((s) => s.classList.remove('is-active'));
        document.querySelector(`.stage__slide[data-slide="${idx}"]`)?.classList.add('is-active');

        stageInfos.forEach((i) => i.classList.remove('is-active'));
        document.querySelector(`.stage__info-block[data-info="${idx}"]`)?.classList.add('is-active');
      });
    });

    const hamburger = document.querySelector('.hamburger');
    const navOverlay = document.getElementById('navOverlay');
    const navOverlayClose = document.getElementById('navOverlayClose');

    on(hamburger, 'click', () => {
      const isOpen = hamburger.classList.toggle('is-open');
      navOverlay?.classList.toggle('is-open', isOpen);
      html.classList.toggle('no-scroll', isOpen);
    });

    on(navOverlayClose, 'click', () => {
      hamburger?.classList.remove('is-open');
      navOverlay?.classList.remove('is-open');
      html.classList.remove('no-scroll');
    });

    navOverlay?.querySelectorAll('.nav-overlay__link').forEach((link) => {
      on(link, 'click', (e) => {
        e.preventDefault();
        const targetSelector = link.getAttribute('data-target');
        if (targetSelector) {
          const target = document.querySelector(targetSelector);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
        hamburger?.classList.remove('is-open');
        navOverlay.classList.remove('is-open');
        html.classList.remove('no-scroll');
      });
    });

    const detailPanel = document.getElementById('detailPanel');
    const detailClose = document.getElementById('detailClose');
    const detailOverlay = detailPanel?.querySelector('.detail-panel__overlay');
    const detailContents = detailPanel?.querySelectorAll('.detail-panel__content');
    const viewMoreLink = document.querySelector('.stage__more-link');
    const artisanDetail = document.getElementById('artisanDetail');
    const artisanDetailClose = document.getElementById('artisanDetailClose');
    const artisanDetailOverlay = artisanDetail?.querySelector('.artisan-detail__overlay');
    const artisanDetailContents = artisanDetail?.querySelectorAll('.artisan-detail__content');
    const artisanMoreButtons = document.querySelectorAll('.artisan-card__more');
    const artisanMediaButtons = document.querySelectorAll('.artisan-card__media-button');

    function getActiveTabIdx() {
      const active = document.querySelector('.stage__tab.is-active');
      return active ? active.dataset.tab : '0';
    }

    function openDetail() {
      const idx = getActiveTabIdx();
      detailContents?.forEach((c) => c.classList.remove('is-active'));
      detailPanel?.querySelector(`.detail-panel__content[data-detail="${idx}"]`)?.classList.add('is-active');
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

    function openArtisanDetail(idx) {
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

    const centerBlock = document.querySelector('.center-block');
    const bottomLogo = document.querySelector('.bottom-logo');
    const storyBrandName = document.querySelector('.story__brand-name');
    const verticalCols = document.querySelectorAll('.story__vertical-col');
    const heroBg = document.querySelector('.hero__bg');
    const craftsmenSection = document.querySelector('.craftsmen');

    const floatingLogo = document.createElement('div');
    floatingLogo.className = 'floating-logo';
    floatingLogo.innerHTML = '<div class="floating-logo__main"><img src="/assets/images/THE%20SILENCE_logo.png" alt="THE SILENCE" class="floating-logo__image" /></div>';
    document.body.appendChild(floatingLogo);

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const vh = window.innerHeight;

          if (heroBg && !heroBg.classList.contains('hero__bg--video')) {
            heroBg.style.transform = `scale(${1 + scrollY * 0.0001}) translateY(${scrollY * 0.3}px)`;
          }

          if (centerBlock) {
            const cbFadeEnd = vh * 0.35;
            if (scrollY <= 0) {
              centerBlock.style.opacity = '1';
              centerBlock.style.transform = 'translateY(0)';
            } else if (scrollY <= cbFadeEnd) {
              const cbP = scrollY / cbFadeEnd;
              centerBlock.style.opacity = String(1 - cbP);
              centerBlock.style.transform = `translateY(${-cbP * 40}px)`;
            } else {
              centerBlock.style.opacity = '0';
              centerBlock.style.transform = 'translateY(-40px)';
            }
          }

          const moveStart = vh * 0.05;
          const revealStart = vh * 0.68;

          const setVerticalRevealed = (show) => {
            verticalCols.forEach((col) => col.classList.toggle('is-revealed', show));
          };

          if (bottomLogo && storyBrandName) {
            if (scrollY <= moveStart) {
              bottomLogo.style.visibility = '';
              floatingLogo.style.opacity = '0';
              storyBrandName.classList.remove('is-revealed');
              setVerticalRevealed(false);
            } else if (scrollY <= revealStart) {
              const p = (scrollY - moveStart) / (revealStart - moveStart);
              bottomLogo.style.visibility = 'hidden';
              floatingLogo.style.opacity = '1';
              const startY = vh * 0.85;
              const endY = vh * 1.05;
              const currentY = startY + (endY - startY) * p;
              floatingLogo.style.top = `${currentY}px`;
              floatingLogo.style.transform = 'translateX(-50%)';
              storyBrandName.classList.remove('is-revealed');
              setVerticalRevealed(false);
            } else {
              bottomLogo.style.visibility = 'hidden';
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

          ticking = false;
        });
        ticking = true;
      }
    };

    on(window, 'scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      scrollObserver.disconnect();
      cleanupFns.forEach((fn) => fn());
      floatingLogo.remove();
      html.classList.remove('has-js');
    };
  }, []);

  return null;
}
