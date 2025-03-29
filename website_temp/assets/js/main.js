/**
* Template Name: Yummy
* Template URL: https://bootstrapmade.com/yummy-bootstrap-restaurant-website-template/
* Updated: Aug 07 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });



  document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM cargado, buscando elementos de video...");
    
    // Referencias a los elementos
    const videoModal = document.getElementById('videoModal');
    const workVideo = document.getElementById('workVideo');
    
    if (videoModal && workVideo) {
      console.log("Elementos encontrados, configurando eventos...");
      
      // Reproducir automáticamente cuando se abre el modal
      videoModal.addEventListener('shown.bs.modal', function () {
        console.log("Modal mostrado, intentando reproducir video...");
        try {
          var playPromise = workVideo.play();
          
          if (playPromise !== undefined) {
            playPromise.then(_ => {
              console.log("Reproducción iniciada correctamente");
            })
            .catch(error => {
              console.error("Error al reproducir video:", error);
            });
          }
        } catch (e) {
          console.error("Error en reproducción automática:", e);
        }
      });
      
      // Pausar el video cuando se cierra el modal
      videoModal.addEventListener('hidden.bs.modal', function () {
        console.log("Modal cerrado, pausando video...");
        workVideo.pause();
        workVideo.currentTime = 0; // Reiniciar el video al principio
      });
    } else {
      console.warn("No se encontraron los elementos necesarios:");
      console.warn("videoModal encontrado:", !!videoModal);
      console.warn("workVideo encontrado:", !!workVideo);
    }
  });

  // Función para enviar mensajes por WhatsApp desde el formulario
function sendWhatsApp() {
  const name = document.getElementById('whatsapp-name').value.trim();
  const phone = document.getElementById('whatsapp-phone').value.trim();
  const project = document.getElementById('whatsapp-project').value;
  const message = document.getElementById('whatsapp-message').value.trim();
  
  // Validación básica
  if (!name) {
    alert('Por favor ingresa tu nombre');
    return;
  }
  
  // Construcción del mensaje
  let whatsappText = `Hola, soy ${name}.`;
  if (phone) whatsappText += ` Mi teléfono es ${phone}.`;
  whatsappText += `\n\nMe interesa un presupuesto para: ${project}`;
  if (message) whatsappText += `\n\nDetalles: ${message}`;
  
  // Número de WhatsApp y URL
  const phoneNumber = "5491144052868";
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(whatsappText)}`;
  
  // Abrir WhatsApp
  window.open(whatsappUrl, '_blank');
}


  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();