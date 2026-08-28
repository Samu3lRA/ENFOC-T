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

  const article = document.querySelector('.article-content');
  if (!article) return;

  const page = location.pathname.split('/').pop().toLowerCase();
  const imageMap = {
    'procrastinacion.html': [
      ['../TODO/fotos-03.png', 'La distracción como punto de partida'],
      ['../TODO/fotos-04.png', 'Un momento cotidiano de estudio']
    ],
    'atencion.html': [['../TODO/fotos-08.png', 'La atención frente a las distracciones']],
    'habitos.html': [['../TODO/fotos-09.png', 'Pequeñas acciones que construyen hábitos']],
    'organizacion.html': [['../TODO/fotos_Mesa de trabajo 1.png', 'Organizar el espacio también ayuda a organizar la mente']],
    'motivacion.html': [['../TODO/fotos-03.png', 'Empezar aunque la motivación no aparezca primero']],
    'sueno.html': [['../TODO/fotos-04.png', 'El descanso también forma parte del proceso']]
  };

  const images = imageMap[page] || [];
  const sections = article.querySelectorAll('section');
  images.forEach((item, index) => {
    const target = sections[Math.min(index, sections.length - 2)];
    if (!target || article.querySelector(`img[src="${item[0]}"]`)) return;
    const figure = document.createElement('figure');
    figure.className = 'article-image';
    figure.innerHTML = `<img src="${item[0]}" alt="${item[1]}" loading="lazy"><figcaption>${item[1]}</figcaption>`;
    target.after(figure);
  });
})();