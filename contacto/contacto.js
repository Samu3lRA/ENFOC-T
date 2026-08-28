(() => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const nombre = String(data.get('nombre') || '').trim();
    const email = String(data.get('email') || '').trim();
    const mensaje = String(data.get('mensaje') || '').trim();

    const subject = encodeURIComponent(`Contacto ENFOCA-T — ${nombre}`);
    const body = encodeURIComponent(`Nombre: ${nombre}\nCorreo: ${email}\n\nMensaje:\n${mensaje}`);

    window.location.href = `mailto:contacto@enfoca-t.com?subject=${subject}&body=${body}`;
  });
})();
