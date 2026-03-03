'use client';

import { useEffect } from 'react';

export default function SiteBehavior() {
  useEffect(() => {
    const html = document.documentElement;

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
      tab.addEventListener('click', () => {
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

    hamburger?.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('is-open');
      navOverlay?.classList.toggle('is-open', isOpen);
      html.classList.toggle('no-scroll', isOpen);
    });

    navOverlay?.querySelectorAll('.nav-overlay__link').forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
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

    function getActiveTabIdx() {
      const active = document.querySelector('.stage__tab.is-active');
      return active ? active.dataset.tab : '0';
    }

    function openDetail() {
      const idx = getActiveTabIdx();
      detailContents?.forEach((c) => c.classList.remove('is-active'));
      detailPanel?.querySelector(`.detail-panel__content[data-detail="${idx}"]`)?.classList.add('is-active');
      detailPanel?.classList.add('is-open');
      html.classList.add('no-scroll');
    }

    function closeDetail() {
      detailPanel?.classList.remove('is-open');
      html.classList.remove('no-scroll');
    }

    viewMoreLink?.addEventListener('click', (e) => {
      e.preventDefault();
      openDetail();
    });

    detailClose?.addEventListener('click', closeDetail);
    detailOverlay?.addEventListener('click', closeDetail);

    const centerBlock = document.querySelector('.center-block');
    const bottomLogo = document.querySelector('.bottom-logo');
    const storyBrandName = document.querySelector('.story__brand-name');
    const storyBrandCondo = document.querySelector('.story__brand-condo');
    const verticalCols = document.querySelectorAll('.story__vertical-col');

    const floatingLogo = document.createElement('div');
    floatingLogo.className = 'floating-logo';
    floatingLogo.innerHTML = '<div class="floating-logo__main">The Timeless</div><div class="floating-logo__sub">Condominium</div>';
    document.body.appendChild(floatingLogo);

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const vh = window.innerHeight;

          const heroBg = document.querySelector('.hero__bg');
          if (heroBg) {
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

          const phase1Start = vh * 0.05;
          const phase1End = vh * 0.7;
          const fadeEnd = vh * 0.85;

          const setVerticalRevealed = (show) => {
            verticalCols.forEach((col) => col.classList.toggle('is-revealed', show));
          };

          if (bottomLogo && storyBrandName) {
            if (scrollY <= phase1Start) {
              bottomLogo.style.visibility = '';
              floatingLogo.style.opacity = '0';
              storyBrandName.classList.remove('is-revealed');
              storyBrandCondo?.classList.remove('is-revealed');
              setVerticalRevealed(false);
            } else if (scrollY <= phase1End) {
              const p = (scrollY - phase1Start) / (phase1End - phase1Start);
              const ease = p < 0.5 ? 2 * p * p : 1 - ((-2 * p + 2) ** 2) / 2;
              bottomLogo.style.visibility = 'hidden';
              floatingLogo.style.opacity = '1';
              const startY = vh * 0.85;
              const endY = vh * 0.42;
              const currentY = startY + (endY - startY) * ease;
              const scale = 1 - ease * 0.5;
              floatingLogo.style.top = `${currentY}px`;
              floatingLogo.style.transform = `translateX(-50%) scale(${scale})`;
              storyBrandName.classList.remove('is-revealed');
              storyBrandCondo?.classList.remove('is-revealed');
              setVerticalRevealed(false);
            } else if (scrollY <= fadeEnd) {
              const p2 = (scrollY - phase1End) / (fadeEnd - phase1End);
              bottomLogo.style.visibility = 'hidden';
              floatingLogo.style.opacity = String(1 - p2);
              floatingLogo.style.top = `${vh * 0.42}px`;
              floatingLogo.style.transform = 'translateX(-50%) scale(0.5)';
              storyBrandName.classList.remove('is-revealed');
              storyBrandCondo?.classList.remove('is-revealed');
              setVerticalRevealed(false);
            } else {
              bottomLogo.style.visibility = 'hidden';
              floatingLogo.style.opacity = '0';
              storyBrandName.classList.add('is-revealed');
              storyBrandCondo?.classList.add('is-revealed');
              setVerticalRevealed(true);
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      scrollObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
      floatingLogo.remove();
    };
  }, []);

  return null;
}
