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
       2. AÑO DINÁMICO EN FOOTER
       ========================================================================== */
  const currentYearSpan = document.getElementById("current-year");
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  /* ==========================================================================
       3. SISTEMA DE REVELACIÓN AL SCROLL
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

    window.addEventListener("scroll", () => {
      fadeElements.forEach((element) => {
        if (element.classList.contains("visible")) {
          const rect = element.getBoundingClientRect();
          if (rect.bottom < 150) {
            element.classList.add("scrolled-past");
          } else {
            element.classList.remove("scrolled-past");
          }
        }
      });
    });
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
       6. CARRUSEL DE TESTIMONIOS
       ========================================================================== */
  const track = document.querySelector(".slider-track");
  const cards = document.querySelectorAll(".testimonial-card");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const dotsContainer = document.querySelector(".slider-dots-container");

  if (track && cards.length > 0 && dotsContainer && prevBtn && nextBtn) {
    let currentIndex = 0;

    const getVisibleCards = () => {
      if (window.innerWidth >= 992) return 3;
      if (window.innerWidth >= 600) return 2;
      return 1;
    };

    const getMaxIndex = () => Math.max(0, cards.length - getVisibleCards());

    const createDots = () => {
      dotsContainer.innerHTML = "";
      const totalDots = getMaxIndex() + 1;

      for (let i = 0; i < totalDots; i++) {
        const dot = document.createElement("button");
        dot.classList.add("dot");
        dot.setAttribute("aria-label", `Ir a la página ${i + 1}`);
        if (i === currentIndex) dot.classList.add("active");
        dot.addEventListener("click", () => goToIndex(i));
        dotsContainer.appendChild(dot);
      }
    };

    const goToIndex = (index) => {
      const maxIndex = getMaxIndex();
      currentIndex = Math.min(Math.max(index, 0), maxIndex);

      const cardWidth = cards[0].getBoundingClientRect().width;
      const gap = 24;
      const offset = (cardWidth + gap) * currentIndex;

      track.style.transform = `translateX(-${offset}px)`;
      updateControls();
    };

    const updateControls = () => {
      const maxIndex = getMaxIndex();
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex >= maxIndex;

      const dots = dotsContainer.querySelectorAll(".dot");
      dots.forEach((dot, idx) => {
        dot.classList.toggle("active", idx === currentIndex);
      });
    };

    prevBtn.addEventListener("click", () => goToIndex(currentIndex - 1));
    nextBtn.addEventListener("click", () => goToIndex(currentIndex + 1));

    window.addEventListener("resize", () => {
      createDots();
      goToIndex(currentIndex);
    });

    createDots();
    updateControls();
  }

  /* ==========================================================================
       7. SECCIÓN NUESTROS DESTINOS
       ========================================================================== */
  const destinationsData = {
    sombrero: {
      title: "Cayo Sombrero",
      desc: "El ícono caribeño de Morrocoy. Famoso por sus dos extensas playas de arena blanca y aguas cristalinas turquesa.",
      image: "img/cayo sombrero.jpg",
    },
    juanes: {
      title: "Los Juanes",
      desc: "La piscina natural más exclusiva. Un bajo transparente en mar abierto sin orilla, perfecto para festejar desde la embarcación.",
      image: "img/Juanes1.jpg",
    },
    pescadores: {
      title: "Cayo Pescadores",
      desc: "Un santuario de calma absoluta. Conocido por sus aguas llanas, temperatura cálida y oleaje casi nulo.",
      image: "img/pescadores.jpg",
    },
    bajo360: {
      title: "Bajo 360",
      desc: "Impresionante panorámica en el mar. Un banco de arena cristalino rodeado de tonos azules infinitos.",
      image: "img/BAJO 360.webp",
    },
  };

  const radioInputs = document.querySelectorAll(
    'input[name="destination_select"]',
  );
  const displayImg = document.getElementById("dest-display-img");
  const cardTitle = document.getElementById("card-title");
  const cardDesc = document.getElementById("card-desc"); // Opcional

  if (radioInputs.length && displayImg && cardTitle) {
    // Función para actualizar los datos en el DOM
    const setDestinationData = (key) => {
      const data = destinationsData[key];
      if (!data) return;

      displayImg.src = data.image;
      displayImg.alt = data.title;
      cardTitle.textContent = data.title;
      if (cardDesc && data.desc) {
        cardDesc.textContent = data.desc;
      }
    };

    // 1. Forzar la carga inicial de la imagen/texto según el botón marcado por defecto
    const initialChecked = document.querySelector(
      'input[name="destination_select"]:checked',
    );
    if (initialChecked) {
      setDestinationData(initialChecked.value);
    }

    // 2. Escuchar cambios al hacer clic en los otros botones
    radioInputs.forEach((radio) => {
      radio.addEventListener("change", (e) => {
        const selectedKey = e.target.value;

        displayImg.style.opacity = "0.3";
        cardTitle.style.opacity = "0";
        if (cardDesc) cardDesc.style.opacity = "0";

        setTimeout(() => {
          setDestinationData(selectedKey);

          displayImg.style.opacity = "1";
          cardTitle.style.opacity = "1";
          if (cardDesc) cardDesc.style.opacity = "1";
        }, 200);
      });
    });
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

    const updateCarousel = (index) => {
      slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });
      currentSlide = index;
    };

    if (nextBtnBenefits) {
      nextBtnBenefits.addEventListener("click", () => {
        const nextIndex = (currentSlide + 1) % slides.length;
        updateCarousel(nextIndex);
      });
    }

    if (prevBtnBenefits) {
      prevBtnBenefits.addEventListener("click", () => {
        const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        updateCarousel(prevIndex);
      });
    }

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => updateCarousel(index));
    });
  }

  /* ==========================================================================
       9. MODAL DE CONTACTO
       ========================================================================== */
  const botonesAbrir = document.querySelectorAll(".abrir-modal-contacto");
  const modal = document.getElementById("modalContacto");
  const botonCerrar = document.getElementById("cerrarModal");
  const reserveButtons = document.querySelectorAll(".reserve-btn");

  if (modal) {
    const openModal = (e) => {
      e.preventDefault();
      modal.classList.add("activo");
    };

    botonesAbrir.forEach((boton) => {
      boton.addEventListener("click", openModal);
    });

    // Añadimos los botones de reserva de la flota para que también abran el modal
    reserveButtons.forEach((button) => {
      button.addEventListener("click", openModal);
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
       10. COOKIES POP-UP / TERMS BANNER
       ========================================================================== */
  const banner = document.getElementById("terms-banner");
  const button = document.getElementById("accept-terms");

  if (banner && button) {
    // Comprueba si el usuario ya aceptó anteriormente
    if (localStorage.getItem("termsAccepted") === "true") {
      banner.classList.add("hidden");
    }

    // Al hacer clic, oculta el banner y guarda la preferencia
    button.addEventListener("click", () => {
      localStorage.setItem("termsAccepted", "true");
      banner.classList.add("hidden");
    });
  }

  /* ==========================================================================
       11. HERO CAROUSEL INTERACTIVO
       ========================================================================== */
  function initHeroCarousel() {
    const slidesData = [
      {
        src: "videos/DJI_0134.MP4",
        alt: "Video 1 de 3: Navegación exclusiva en yate de lujo por Morrocoy",
      },
      {
        src: "videos/DJI_0139.MP4",
        alt: "Video 2 de 3: Lanchas deportivas de alta velocidad en aguas cristalinas",
      },
      {
        src: "videos/DJI_0141.MP4",
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
