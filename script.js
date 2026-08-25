document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================================================
       1. NAVBAR STICKY Y MENÚ MÓVIL
       ========================================================================== */
  const navbar = document.getElementById("navbar");
  const mobileMenuBtn = document.getElementById("mobile-menu");
  const navLinks = document.getElementById("nav-links");

  if (mobileMenuBtn && navLinks && navbar) {
    mobileMenuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      navbar.classList.toggle("menu-open");
      const icon = mobileMenuBtn.querySelector("i");
      if (icon) {
        if (navLinks.classList.contains("active")) {
          icon.classList.remove("fa-bars");
          icon.classList.add("fa-xmark");
        } else {
          icon.classList.remove("fa-xmark");
          icon.classList.add("fa-bars");
        }
      }
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        navbar.classList.remove("menu-open");
        const icon = mobileMenuBtn.querySelector("i");
        if (icon) icon.classList.replace("fa-xmark", "fa-bars");
      });
    });

    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }

  /* ==========================================================================
       2. SISTEMA DE REVELACIÓN AL SCROLL
       ========================================================================== */
  const fadeElements = document.querySelectorAll(".fade-in-element");
  if (fadeElements.length > 0) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    fadeElements.forEach((element) => appearOnScroll.observe(element));
  }

  /* ==========================================================================
       4. ACORDEÓN (FAQ)
       ========================================================================== */
  const accordionItems = document.querySelectorAll(".accordion-item");
  accordionItems.forEach((item) => {
    const header = item.querySelector(".accordion-header");
    if (header) {
      header.addEventListener("click", () => {
        const currentlyActive = document.querySelector(
          ".accordion-item.active",
        );
        if (currentlyActive && currentlyActive !== item) {
          currentlyActive.classList.remove("active");
          const activeIcon = currentlyActive.querySelector(
            ".accordion-header i",
          );
          if (activeIcon) {
            activeIcon.classList.remove("fa-chevron-up");
            activeIcon.classList.add("fa-chevron-down");
          }
        }
        item.classList.toggle("active");
        const icon = header.querySelector("i");
        if (icon) {
          if (item.classList.contains("active")) {
            icon.classList.remove("fa-chevron-down");
            icon.classList.add("fa-chevron-up");
          } else {
            icon.classList.remove("fa-chevron-up");
            icon.classList.add("fa-chevron-down");
          }
        }
      });
    }
  });

  /* ==========================================================================
       5. DETALLES DE FLOTA (ACCESIBILIDAD)
       ========================================================================== */
  const toggleButtons = document.querySelectorAll(".details-toggle");
  toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const isExpanded = button.getAttribute("aria-expanded") === "true";
      const panelId = button.getAttribute("aria-controls");
      const panel = document.getElementById(panelId);

      button.setAttribute("aria-expanded", !isExpanded);
      if (panel) {
        if (!isExpanded) {
          panel.removeAttribute("hidden");
        } else {
          panel.setAttribute("hidden", "");
        }
      }
    });
  });

  /* ==========================================================================
       6. CARRUSEL DE TESTIMONIOS (CINTA CONTINUA HACIA LA IZQUIERDA)
       ========================================================================== */
  const track = document.querySelector(".slider-track");
  const testimonialSlider = document.querySelector(".testimonial-slider");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  if (track && testimonialSlider) {
    const originalCards = Array.from(
      track.querySelectorAll(".testimonial-card"),
    );

    if (originalCards.length > 0) {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const GAP_PX = 24; // 1.5rem, coincide con el gap del CSS
      const SECONDS_PER_CARD = 5;

      // Duplicamos el set de tarjetas para que el bucle sea perfecto e imperceptible.
      originalCards.forEach((card) => {
        const clone = card.cloneNode(true);
        clone.setAttribute("aria-hidden", "true");
        track.appendChild(clone);
      });

      let cardStep = 0;
      let originalSetWidth = 0;
      let speed = 0; // px por segundo
      let offset = 0;
      let isHovering = false;
      let manualBusy = false;
      let lastTimestamp = null;
      let manualResumeId = null;

      const measure = () => {
        const cardWidth = originalCards[0].getBoundingClientRect().width;
        cardStep = cardWidth + GAP_PX;
        originalSetWidth = originalCards.length * cardStep;
        speed = cardStep / SECONDS_PER_CARD;
        if (originalSetWidth > 0) {
          offset = ((offset % originalSetWidth) + originalSetWidth) % originalSetWidth;
        }
      };

      const tick = (timestamp) => {
        if (lastTimestamp === null) lastTimestamp = timestamp;
        const dt = (timestamp - lastTimestamp) / 1000;
        lastTimestamp = timestamp;

        if (!prefersReducedMotion && !isHovering && !manualBusy) {
          offset += speed * dt;
          if (offset >= originalSetWidth) offset -= originalSetWidth;
          track.style.transform = `translateX(-${offset}px)`;
        }

        requestAnimationFrame(tick);
      };

      const manualStep = (direction) => {
        if (manualResumeId) clearTimeout(manualResumeId);
        manualBusy = true;
        track.classList.add("manual-step");

        offset =
          ((offset + direction * cardStep) % originalSetWidth + originalSetWidth) %
          originalSetWidth;
        track.style.transform = `translateX(-${offset}px)`;

        manualResumeId = setTimeout(() => {
          track.classList.remove("manual-step");
          manualBusy = false;
        }, 550);
      };

      if (prevBtn) {
        prevBtn.addEventListener("click", () => manualStep(-1));
      }
      if (nextBtn) {
        nextBtn.addEventListener("click", () => manualStep(1));
      }

      testimonialSlider.addEventListener("mouseenter", () => {
        isHovering = true;
      });
      testimonialSlider.addEventListener("mouseleave", () => {
        isHovering = false;
      });

      window.addEventListener("resize", measure);

      measure();
      track.style.transform = `translateX(-${offset}px)`;
      requestAnimationFrame(tick);
    }
  }

  /* ==========================================================================
       7. SECCIÓN NUESTROS DESTINOS (AUTOPLAY + CROSSFADE + BARRA DE PROGRESO)
       ========================================================================== */
  const destinationsData = {
    sombrero: {
      title: "Cayo Sombrero",
      desc: "El ícono caribeño de Morrocoy. Famoso por sus dos extensas playas de arena blanca y aguas cristalinas turquesa.",
    },
    juanes: {
      title: "Los Juanes",
      desc: "La piscina natural más exclusiva. Un bajo transparente en mar abierto sin orilla, perfecto para festejar desde la embarcación.",
    },
    pescadores: {
      title: "Cayo Pescadores",
      desc: "Un santuario de calma absoluta. Conocido por sus aguas llanas, temperatura cálida y oleaje casi nulo.",
    },
    bajo360: {
      title: "Bajo 360",
      desc: "Impresionante panorámica en el mar. Un banco de arena cristalino rodeado de tonos azules infinitos.",
    },
  };

  const radioInputs = Array.from(
    document.querySelectorAll('input[name="destination_select"]'),
  );
  const destSlides = document.querySelectorAll(".dest-slide");
  const cardTitle = document.getElementById("card-title");
  const cardDesc = document.getElementById("card-desc");
  const destRadioGroup = document.querySelector(".dest-radio-group");

  if (radioInputs.length && destSlides.length && cardTitle && destRadioGroup) {
    const prefersReducedMotionDest = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const keys = radioInputs.map((radio) => radio.value);
    let currentIndex = Math.max(
      keys.indexOf(radioInputs.find((r) => r.checked)?.value),
      0,
    );
    let isHovering = false;

    const setDestinationText = (key) => {
      const data = destinationsData[key];
      if (!data) return;
      cardTitle.textContent = data.title;
      if (cardDesc && data.desc) cardDesc.textContent = data.desc;
    };

    const setActive = (index) => {
      currentIndex = index;
      const key = keys[currentIndex];

      destSlides.forEach((slide) => {
        slide.classList.toggle("active", slide.dataset.key === key);
      });

      radioInputs.forEach((radio, i) => {
        radio.checked = i === currentIndex;
      });

      setDestinationText(key);

      radioInputs.forEach((radio, i) => {
        const label = radio.closest(".dest-radio-item");
        if (!label) return;
        label.classList.remove("animating", "paused");

        if (i === currentIndex) {
          const fill = label.querySelector(".dest-progress-fill");
          if (fill) {
            // Reinicia la animación desde 0% en cada cambio de destino.
            fill.style.animation = "none";
            void fill.offsetWidth;
            fill.style.animation = "";
          }
          if (!prefersReducedMotionDest) {
            label.classList.add("animating");
            if (isHovering) label.classList.add("paused");
          }
        }
      });
    };

    const goNext = () => {
      setActive((currentIndex + 1) % keys.length);
    };

    // El avance automático está perfectamente sincronizado con la barra de
    // progreso: al completar su animación de 5s, dispara el cambio de destino.
    destRadioGroup.addEventListener("animationend", (e) => {
      if (e.animationName !== "destFillProgress") return;
      goNext();
    });

    const pauseActive = () => {
      destRadioGroup
        .querySelectorAll(".dest-radio-item.animating")
        .forEach((label) => label.classList.add("paused"));
    };

    const resumeActive = () => {
      if (isHovering || document.hidden) return;
      destRadioGroup
        .querySelectorAll(".dest-radio-item.animating.paused")
        .forEach((label) => label.classList.remove("paused"));
    };

    radioInputs.forEach((radio, i) => {
      radio.addEventListener("change", () => setActive(i));
    });

    if (!prefersReducedMotionDest) {
      destRadioGroup.addEventListener("mouseenter", () => {
        isHovering = true;
        pauseActive();
      });
      destRadioGroup.addEventListener("mouseleave", () => {
        isHovering = false;
        resumeActive();
      });

      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          pauseActive();
        } else {
          resumeActive();
        }
      });
    }

    setActive(currentIndex);
  }

  /* ==========================================================================
       8. CARRUSEL DE BENEFICIOS
       ========================================================================== */
  const slides = document.querySelectorAll(".benefits-slide");
  const dots = document.querySelectorAll(".benefits-dots .dot");
  const prevBtnBenefits = document.querySelector(".benefits-arrow.prev-slide");
  const nextBtnBenefits = document.querySelector(".benefits-arrow.next-slide");

  if (slides.length > 0) {
    let currentSlide = 0;
    let autoplayId = null;
    const AUTO_MS = 5000;
    const carouselEl = document.querySelector(".benefits-carousel");
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const updateCarousel = (index) => {
      slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });
      currentSlide = index;
    };

    const goNext = () => {
      updateCarousel((currentSlide + 1) % slides.length);
    };

    const stopAutoplay = () => {
      if (autoplayId !== null) {
        clearInterval(autoplayId);
        autoplayId = null;
      }
    };

    const startAutoplay = () => {
      if (prefersReducedMotion || slides.length < 2) return;
      stopAutoplay();
      autoplayId = setInterval(goNext, AUTO_MS);
    };

    const restartAutoplay = () => {
      stopAutoplay();
      startAutoplay();
    };

    if (nextBtnBenefits) {
      nextBtnBenefits.addEventListener("click", () => {
        goNext();
        restartAutoplay();
      });
    }

    if (prevBtnBenefits) {
      prevBtnBenefits.addEventListener("click", () => {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        updateCarousel(prevIndex);
        restartAutoplay();
      });
    }

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        updateCarousel(index);
        restartAutoplay();
      });
    });

    if (carouselEl && !prefersReducedMotion) {
      carouselEl.addEventListener("mouseenter", stopAutoplay);
      carouselEl.addEventListener("mouseleave", startAutoplay);
    }

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    });

    startAutoplay();
  }

  /* ==========================================================================
       9. MODAL DE CONTACTO
       ========================================================================== */
  const botonesAbrir = document.querySelectorAll(".abrir-modal-contacto");
  const modal = document.getElementById("modalContacto");
  const botonCerrar = document.getElementById("cerrarModal");

  if (modal) {
    const openModal = (e) => {
      e.preventDefault();
      modal.classList.add("activo");
    };

    botonesAbrir.forEach((boton) => {
      boton.addEventListener("click", openModal);
    });

    if (botonCerrar) {
      botonCerrar.addEventListener("click", () => {
        modal.classList.remove("activo");
      });
    }

    window.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("activo");
      }
    });
  }

  /* ==========================================================================
       10. RESERVA VÍA WHATSAPP (FLOTA)
       ========================================================================== */
  const bookingForms = document.querySelectorAll(".booking-form");
  const WHATSAPP_PHONE = "584244585512";

  bookingForms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const vesselType = form.getAttribute("data-vessel") || "embarcación";
      const selectedRadio = form.querySelector('input[type="radio"]:checked');
      const capacity = selectedRadio ? selectedRadio.value : "6";

      // Formateo de artículo dinámico
      let vesselPhrase = `un ${vesselType.toLowerCase()}`;
      if (vesselType.toLowerCase() === "lancha") {
        vesselPhrase = "una lancha";
      }

      const message = `Hola Embarcaciones Venezuela! Quiero reservar ${vesselPhrase} para ${capacity} personas, tienen disponibilidad?`;
      const encodedUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;

      window.open(encodedUrl, "_blank", "noopener,noreferrer");
    });
  });

  /* ==========================================================================
       11. COOKIES POP-UP / TERMS BANNER
       ========================================================================== */
  const banner = document.getElementById("terms-banner");
  const acceptBtn = document.getElementById("accept-terms");
  const closeBtn = document.getElementById("close-terms");
  const TERMS_STORAGE_KEY = "ev_terms_accepted";

  if (banner && acceptBtn) {
    const dismissTerms = () => {
      try {
        localStorage.setItem(TERMS_STORAGE_KEY, "true");
      } catch (error) {
        /* Si el almacenamiento está bloqueado, igual se cierra en esta visita */
      }
      banner.setAttribute("hidden", "");
      banner.classList.add("hidden");
    };

    let alreadyAccepted = false;
    try {
      alreadyAccepted = localStorage.getItem(TERMS_STORAGE_KEY) === "true";
    } catch (error) {
      alreadyAccepted = false;
    }

    if (!alreadyAccepted) {
      banner.removeAttribute("hidden");
      banner.classList.remove("hidden");
    }

    acceptBtn.addEventListener("click", dismissTerms);
    if (closeBtn) {
      closeBtn.addEventListener("click", dismissTerms);
    }
  }

  /* ==========================================================================
       12. TOOLTIP AUTOMÁTICO DEL BOTÓN DE WHATSAPP (SOLO MÓVIL)
       ========================================================================== */
  const whatsappFloat = document.querySelector(".whatsapp-float");
  if (whatsappFloat && window.matchMedia("(max-width: 768px)").matches) {
    setTimeout(() => {
      whatsappFloat.classList.add("show-tooltip");
      setTimeout(() => {
        whatsappFloat.classList.remove("show-tooltip");
      }, 5000);
    }, 10000);
  }

  /* ==========================================================================
       13. HERO CAROUSEL INTERACTIVO
       ========================================================================== */
  function initHeroCarousel() {
    const slidesData = [
      {
        src: "assets/videos/video-1.webm",
        alt: "Video 1 de 3: Navegación exclusiva en yate de lujo por Morrocoy",
      },
      {
        src: "assets/videos/video-2.webm",
        alt: "Video 2 de 3: Lanchas deportivas de alta velocidad en aguas cristalinas",
      },
      {
        src: "assets/videos/video-3.webm",
        alt: "Video 3 de 3: Recorrido VIP en peñeros ejecutivos en Cayo Sombrero",
      },
    ];

    const SLIDE_DURATION = 5000;
    const FADE_DURATION = 2000;
    let currentIndex = 0;
    let isPlaying = true;
    let slideTimer = null;
    let activeBufferIndex = 0;

    const videoBuffers = [
      document.getElementById("hero-video-1"),
      document.getElementById("hero-video-2"),
    ];
    const toggleBtn = document.getElementById("toggle-autoplay");
    const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
    const srAnnouncer = document.getElementById("sr-announcer");

    if (!videoBuffers[0] || !videoBuffers[1] || !toggleBtn) return;

    const iconPause = toggleBtn.querySelector(".icon-pause");
    const iconPlay = toggleBtn.querySelector(".icon-play");
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    function goToSlide(newIndex, force = false) {
      if (
        !force &&
        newIndex === currentIndex &&
        tabs[newIndex].classList.contains("animating")
      )
        return;

      currentIndex = newIndex;

      const currentVideo = videoBuffers[activeBufferIndex];
      const nextBufferIndex = 1 - activeBufferIndex;
      const nextVideo = videoBuffers[nextBufferIndex];

      const source = nextVideo.querySelector("source");
      if (source) {
        source.src = slidesData[currentIndex].src;
        nextVideo.load();

        if (isPlaying && !prefersReducedMotion) {
          nextVideo.play().catch(() => {});
        }
      }

      nextVideo.classList.add("active");
      currentVideo.classList.remove("active");

      setTimeout(
        () => {
          if (currentVideo !== nextVideo) {
            currentVideo.pause();
          }
        },
        prefersReducedMotion ? 0 : FADE_DURATION,
      );

      activeBufferIndex = nextBufferIndex;

      tabs.forEach((tab, index) => {
        const isSelected = index === currentIndex;
        tab.setAttribute("aria-selected", isSelected ? "true" : "false");
        tab.classList.remove("active", "animating", "paused", "completed");

        const fill = tab.querySelector(".progress-fill");
        if (fill) {
          fill.style.width = isSelected
            ? "0%"
            : index < currentIndex
              ? "100%"
              : "0%";
        }

        if (index < currentIndex) {
          tab.classList.add("completed");
        }
      });

      const activeTab = tabs[currentIndex];
      if (activeTab) {
        activeTab.classList.add("active");
        void activeTab.offsetWidth;

        if (isPlaying && !prefersReducedMotion) {
          activeTab.classList.add("animating");
        } else {
          activeTab.classList.add("paused");
        }
      }

      announceToScreenReader(slidesData[currentIndex].alt);
      resetTimer();
    }

    function nextSlide() {
      const nextIndex = (currentIndex + 1) % slidesData.length;
      goToSlide(nextIndex);
    }

    function resetTimer() {
      clearTimeout(slideTimer);
      if (isPlaying && !prefersReducedMotion) {
        slideTimer = setTimeout(nextSlide, SLIDE_DURATION);
      }
    }

    function togglePlayPause() {
      isPlaying = !isPlaying;
      toggleBtn.setAttribute("aria-pressed", (!isPlaying).toString());

      const activeVideo = videoBuffers[activeBufferIndex];

      if (isPlaying) {
        toggleBtn.setAttribute("aria-label", "Pausar rotación automática");
        if (iconPause) iconPause.style.display = "block";
        if (iconPlay) iconPlay.style.display = "none";
        if (activeVideo) activeVideo.play().catch(() => {});

        const activeTab = tabs[currentIndex];
        if (activeTab) {
          activeTab.classList.remove("paused");
          activeTab.classList.add("animating");
        }
        resetTimer();
        announceToScreenReader("Rotación automática reanudada");
      } else {
        toggleBtn.setAttribute("aria-label", "Reanudar rotación automática");
        if (iconPause) iconPause.style.display = "none";
        if (iconPlay) iconPlay.style.display = "block";
        if (activeVideo) activeVideo.pause();

        clearTimeout(slideTimer);
        const activeTab = tabs[currentIndex];
        if (activeTab) {
          activeTab.classList.remove("animating");
          activeTab.classList.add("paused");
        }
        announceToScreenReader("Rotación automática pausada");
      }
    }

    function announceToScreenReader(message) {
      if (srAnnouncer) {
        srAnnouncer.textContent = message;
      }
    }

    toggleBtn.addEventListener("click", togglePlayPause);

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const index = parseInt(tab.getAttribute("data-index"), 10);
        goToSlide(index);
      });
    });

    const tablist = document.querySelector('[role="tablist"]');
    if (tablist) {
      tablist.addEventListener("keydown", (e) => {
        let targetIndex = currentIndex;

        if (e.key === "ArrowRight") {
          targetIndex = (currentIndex + 1) % tabs.length;
        } else if (e.key === "ArrowLeft") {
          targetIndex = (currentIndex - 1 + tabs.length) % tabs.length;
        } else if (e.key === "Home") {
          targetIndex = 0;
        } else if (e.key === "End") {
          targetIndex = tabs.length - 1;
        } else {
          return;
        }

        e.preventDefault();
        tabs[targetIndex].focus();
        goToSlide(targetIndex);
      });
    }

    if (prefersReducedMotion) {
      isPlaying = false;
      togglePlayPause();
    } else {
      goToSlide(0, true);
    }
  }

  initHeroCarousel();
});
