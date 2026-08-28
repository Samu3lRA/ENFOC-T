(() => {
  const header = document.querySelector('.site-header');
  const menu = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');

  const setScrolled = () => {
    header?.classList.toggle('scrolled', window.scrollY > 40);
  };

  setScrolled();
  window.addEventListener('scroll', setScrolled, { passive: true });

  menu?.addEventListener('click', () => {
    if (!nav) return;
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });

  nav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menu?.setAttribute('aria-expanded', 'false');
    });
  });

  const currentPath = window.location.pathname.replace(/\\/g, '/').replace(/\/$/, '') || '/';
  nav?.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute('href');
    if (!href || href.startsWith('#') || href.startsWith('http')) return;
    try {
      const target = new URL(href, window.location.href);
      const targetPath = target.pathname.replace(/\/$/, '') || '/';
      link.classList.toggle('active', targetPath === currentPath);
    } catch (_) {}
  });

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const revealItems = document.querySelectorAll(
    '.section-kicker,.problem-layout,.about-heading,.principles,.resource-grid,.blog-top,.articles,.manifesto-grid,.cta-content'
  );

  if (!('IntersectionObserver' in window)) {
    revealItems.forEach((el) => { el.style.opacity = '1'; });
    return;
  }

  const reveal = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.animate(
        [
          { opacity: 0, transform: 'translateY(24px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ],
        { duration: 750, easing: 'cubic-bezier(.2,.75,.25,1)', fill: 'forwards' }
      );
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08 });

  revealItems.forEach((el) => {
    el.style.opacity = '0';
    reveal.observe(el);
  });
})();
