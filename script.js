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

  // Redes sociales flotantes: visibles en todas las páginas que cargan este script.
  if (!document.querySelector('.social-float')) {
    const socialFloat = document.createElement('div');
    socialFloat.className = 'social-float';
    socialFloat.setAttribute('aria-label', 'Redes sociales de ENFOCA-T');
    socialFloat.innerHTML = `
      <a href="https://www.youtube.com/channel/UCMo758xjA7BN_3cLCCcxAqA" target="_blank" rel="noopener noreferrer" aria-label="YouTube" title="YouTube">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.6 3.6 12 3.6 12 3.6s-7.6 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.8.5 9.4.5 9.4.5s7.6 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.9V8.1l6.8 3.9-6.8 3.9Z"/></svg>
      </a>
      <a href="https://www.instagram.com/enfocat.sena/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9Zm9.75 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/></svg>
      </a>
      <a href="https://www.facebook.com/profile.php?id=61594084869264" target="_blank" rel="noopener noreferrer" aria-label="Facebook" title="Facebook">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.6 1.7-1.6h1.8V4.8c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V11H7.5v3h2.8v8h3.2Z"/></svg>
      </a>`;
    document.body.appendChild(socialFloat);
  }

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
