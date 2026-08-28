(() => {
  const bar = document.querySelector('.reading-progress');
  const updateProgress = () => {
    if (!bar) return;
    const d = document.documentElement;
    const max = d.scrollHeight - d.clientHeight;
    bar.style.width = (max > 0 ? (d.scrollTop / max) * 100 : 0) + '%';
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
})();