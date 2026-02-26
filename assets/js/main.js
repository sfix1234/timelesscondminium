(() => {
  const intro = document.getElementById('intro');
  const html = document.documentElement;

  // Lock scroll during intro
  html.classList.add('no-scroll');

  // Helper: play a paused CSS animation after delay (ms)
  function playAfter(selector, delay) {
    setTimeout(() => {
      document.querySelectorAll(selector).forEach(el => {
        el.style.animationPlayState = 'running';
      });
    }, delay);
  }

  // === INTRO SEQUENCE ===
  setTimeout(() => intro.classList.add('step-1'), 300);
  setTimeout(() => intro.classList.add('step-2'), 2200);
  setTimeout(() => {
    intro.classList.add('step-3');
    html.classList.remove('no-scroll');
  }, 3000);
  setTimeout(() => intro.remove(), 4000);

  // === HERO STAGED ANIMATIONS ===
  const heroStart = 2400;

  playAfter('.jpn-badge__label', heroStart);
  playAfter('.jpn-badge__line', heroStart + 400);
  playAfter('.header__logo', heroStart + 200);
  playAfter('.hamburger', heroStart + 200);

  playAfter('.center-block__title', heroStart + 500);
  playAfter('.center-block__number', heroStart + 1000);
  playAfter('.center-block__line', heroStart + 1500);

  playAfter('.bottom-logo__main', heroStart + 800);
  playAfter('.bottom-logo__sub', heroStart + 1100);

  // === SCROLL-TRIGGERED ANIMATIONS ===
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        scrollObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.story, .craftsmen').forEach(el => scrollObserver.observe(el));

  // === HAMBURGER MENU ===
  const hamburger = document.querySelector('.hamburger');
  const navOverlay = document.getElementById('navOverlay');

  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('is-open');
    navOverlay.classList.toggle('is-open', isOpen);
    html.classList.toggle('no-scroll', isOpen);
  });

  navOverlay.querySelectorAll('.nav-overlay__link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      hamburger.classList.remove('is-open');
      navOverlay.classList.remove('is-open');
      html.classList.remove('no-scroll');
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navOverlay.classList.contains('is-open')) {
      hamburger.classList.remove('is-open');
      navOverlay.classList.remove('is-open');
      html.classList.remove('no-scroll');
    }
  });

  // === SCROLL MORPH: Logo shrink animation ===
  const bottomLogo = document.querySelector('.bottom-logo');
  const storyBrandName = document.querySelector('.story__brand-name');
  const storyBrandCondo = document.querySelector('.story__brand-condo');
  const verticalCols = document.querySelectorAll('.story__vertical-col');

  const floatingLogo = document.createElement('div');
  floatingLogo.className = 'floating-logo';
  floatingLogo.innerHTML = '<div class="floating-logo__main">The Timeless</div><div class="floating-logo__sub">Condominium</div>';
  document.body.appendChild(floatingLogo);

  // === PARALLAX + MORPH on scroll ===
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const vh = window.innerHeight;

        // Parallax
        const heroBg = document.querySelector('.hero__bg');
        if (heroBg) {
          heroBg.style.transform = 'scale(' + (1 + scrollY * 0.0001) + ') translateY(' + (scrollY * 0.3) + 'px)';
        }

        // Logo morph phases
        const phase1Start = vh * 0.05;
        const phase1End   = vh * 0.70;
        const fadeEnd     = vh * 0.85;

        function setVerticalRevealed(show) {
          verticalCols.forEach(function(col) {
            if (show) col.classList.add('is-revealed');
            else col.classList.remove('is-revealed');
          });
        }

        if (scrollY <= phase1Start) {
          bottomLogo.style.visibility = '';
          floatingLogo.style.opacity = '0';
          storyBrandName.classList.remove('is-revealed');
          if (storyBrandCondo) storyBrandCondo.classList.remove('is-revealed');
          setVerticalRevealed(false);
        } else if (scrollY <= phase1End) {
          var p = (scrollY - phase1Start) / (phase1End - phase1Start);
          var ease = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;

          bottomLogo.style.visibility = 'hidden';
          floatingLogo.style.opacity = '1';

          var startY = vh * 0.85;
          var endY = vh * 0.42;
          var currentY = startY + (endY - startY) * ease;
          var scale = 1 - ease * 0.5;

          floatingLogo.style.top = currentY + 'px';
          floatingLogo.style.transform = 'translateX(-50%) scale(' + scale + ')';

          storyBrandName.classList.remove('is-revealed');
          if (storyBrandCondo) storyBrandCondo.classList.remove('is-revealed');
          setVerticalRevealed(false);
        } else if (scrollY <= fadeEnd) {
          var p2 = (scrollY - phase1End) / (fadeEnd - phase1End);

          bottomLogo.style.visibility = 'hidden';
          floatingLogo.style.opacity = String(1 - p2);
          floatingLogo.style.top = (vh * 0.42) + 'px';
          floatingLogo.style.transform = 'translateX(-50%) scale(0.5)';

          storyBrandName.classList.remove('is-revealed');
          if (storyBrandCondo) storyBrandCondo.classList.remove('is-revealed');
          setVerticalRevealed(false);
        } else {
          bottomLogo.style.visibility = 'hidden';
          floatingLogo.style.opacity = '0';
          storyBrandName.classList.add('is-revealed');
          if (storyBrandCondo) storyBrandCondo.classList.add('is-revealed');
          setVerticalRevealed(true);
        }

        ticking = false;
      });
      ticking = true;
    }
  });
})();
