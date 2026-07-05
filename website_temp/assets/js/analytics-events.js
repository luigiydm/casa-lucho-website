/*
 * Eventos Umami — Casa Lucho.
 * Mide lo que importa para el negocio: clicks de contacto (WhatsApp = presupuesto
 * potencial), fotos de trabajos abiertas y hasta dónde leen la página.
 * Si Umami no cargó (adblocker, etc.) no hace nada.
 */
(function () {
  'use strict';

  function track(name, data) {
    if (window.umami && typeof window.umami.track === 'function') {
      window.umami.track(name, data);
    }
  }

  function ubicacionDe(el) {
    var contenedor = el.closest('section[id], header, footer');
    if (!contenedor) return 'otro';
    return contenedor.id || contenedor.tagName.toLowerCase();
  }

  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href]');
    if (!link) return;
    var href = link.getAttribute('href') || '';

    if (href.indexOf('whatsapp') !== -1 || href.indexOf('wa.me') !== -1) {
      track('contacto_whatsapp', { ubicacion: ubicacionDe(link) });
    } else if (href.indexOf('tel:') === 0) {
      track('contacto_telefono', { ubicacion: ubicacionDe(link) });
    } else if (href.indexOf('instagram') !== -1) {
      track('contacto_instagram', { ubicacion: ubicacionDe(link) });
    } else if (link.classList.contains('glightbox')) {
      var foto = href.split('/').pop();
      track('galeria_foto_abierta', { foto: foto });
    }
  });

  var tramos = [25, 50, 75, 100];
  var enviados = {};
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      ticking = false;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      var pct = Math.round((window.scrollY / max) * 100);
      tramos.forEach(function (t) {
        if (pct >= t && !enviados[t]) {
          enviados[t] = true;
          track('scroll_profundidad', { tramo: t + '%' });
        }
      });
    });
  }, { passive: true });
})();
