/**
 * AccesiBot - Carrusel de Video con Fundido Cruzado de 2s
 * Conformidad WCAG 2.2 AA (Criterios 2.1.1, 2.2.2, 2.4.7, 4.1.2)
 */

document.addEventListener("DOMContentLoaded", () => {
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

  /**
   * Ejecuta la transición de fundido entre los dos reproductores de video
   */
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

    // Preparar y reproducir el video entrante
    const source = nextVideo.querySelector("source");
    if (source) {
      source.src = slidesData[currentIndex].src;
      nextVideo.load();

      if (isPlaying && !prefersReducedMotion) {
        nextVideo.play().catch(() => {});
      }
    }

    // Intercambiar clases de opacidad (Fundido cruzado de 2 segundos)
    nextVideo.classList.add("active");
    currentVideo.classList.remove("active");

    // Detener el video saliente tras completar los 2s de transición
    setTimeout(
      () => {
        if (currentVideo !== nextVideo) {
          currentVideo.pause();
        }
      },
      prefersReducedMotion ? 0 : FADE_DURATION,
    );

    activeBufferIndex = nextBufferIndex;

    // Sincronizar estados de pestañas ARIA (WCAG 4.1.2)
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
      void activeTab.offsetWidth; // Reflow para reiniciar la animación CSS

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

  // Event Listeners
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

  // Inicialización forzada
  if (prefersReducedMotion) {
    isPlaying = false;
    togglePlayPause();
  } else {
    goToSlide(0, true);
  }
});
