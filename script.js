document.addEventListener("DOMContentLoaded", () => {

    // 1. Manejo del Navbar Sticky y Menú Móvil
    const navbar = document.getElementById("navbar");
    const mobileMenuBtn = document.getElementById("mobile-menu");
    const navLinks = document.getElementById("nav-links");

    mobileMenuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        navbar.classList.toggle("menu-open");
        const icon = mobileMenuBtn.querySelector("i");
        if(navLinks.classList.contains("active")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            navbar.classList.remove("menu-open");
            mobileMenuBtn.querySelector("i").classList.replace("fa-xmark", "fa-bars");
        });
    });

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    // 2. Año Dinámico en Footer
    const currentYearSpan = document.getElementById("current-year");
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // 3. Sistema de Revelación y Efecto "Scale-Down"
    const fadeElements = document.querySelectorAll(".fade-in-element");
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });

    window.addEventListener("scroll", () => {
        fadeElements.forEach(element => {
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

    // 4. Lógica del Acordeón (FAQ)
    const accordionItems = document.querySelectorAll('.accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.accordion-item.active');
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
                const activeIcon = currentlyActive.querySelector('i');
                activeIcon.classList.remove('fa-chevron-up');
                activeIcon.classList.add('fa-chevron-down');
            }
            item.classList.toggle('active');
            const icon = header.querySelector('i');
            if (item.classList.contains('active')) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    });

    // 5. Lógica de Despliegue de Detalles de Flota (NUEVO - ACCESIBILIDAD)
    const toggleButtons = document.querySelectorAll('.details-toggle');
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            const panelId = button.getAttribute('aria-controls');
            const panel = document.getElementById(panelId);
            
            button.setAttribute('aria-expanded', !isExpanded);
            
            if (!isExpanded) {
                panel.removeAttribute('hidden');
            } else {
                panel.setAttribute('hidden', '');
            }
        });
    });

});

document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.slider-track');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dotsContainer = document.querySelector('.slider-dots-container');

    if (!track || cards.length === 0) return;

    let currentIndex = 0;

    // Obtener la cantidad de tarjetas visibles según el ancho de pantalla
    const getVisibleCards = () => {
        if (window.innerWidth >= 992) return 3;
        if (window.innerWidth >= 600) return 2;
        return 1;
    };

    // Calcular la cantidad total de páginas de deslizamiento
    const getMaxIndex = () => Math.max(0, cards.length - getVisibleCards());

    // Crear los puntos dinámicamente
    const createDots = () => {
        dotsContainer.innerHTML = '';
        const totalDots = getMaxIndex() + 1;
        
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            dot.setAttribute('aria-label', `Ir a la página ${i + 1}`);
            if (i === currentIndex) dot.classList.add('active');
            dot.addEventListener('click', () => goToIndex(i));
            dotsContainer.appendChild(dot);
        }
    };

    // Mover el slider a un índice específico
    const goToIndex = (index) => {
        const maxIndex = getMaxIndex();
        currentIndex = Math.min(Math.max(index, 0), maxIndex);

        const cardWidth = cards[0].getBoundingClientRect().width;
        const gap = 24; // Corresponde al gap de 1.5rem en CSS
        const offset = (cardWidth + gap) * currentIndex;

        track.style.transform = `translateX(-${offset}px)`;

        updateControls();
    };

    // Actualizar estados de botones y puntos
    const updateControls = () => {
        const maxIndex = getMaxIndex();
        
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;

        const dots = dotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentIndex);
        });
    };

    // Event Listeners para botones
    prevBtn.addEventListener('click', () => goToIndex(currentIndex - 1));
    nextBtn.addEventListener('click', () => goToIndex(currentIndex + 1));

    // Ajustar slider al cambiar tamaño de la ventana
    window.addEventListener('resize', () => {
        createDots();
        goToIndex(currentIndex);
    });

    // Inicialización
    createDots();
    updateControls();
});


/* ==========================================================================
   INTERACCIÓN DE DESTINOS (ACTUALIZACIÓN DE IMAGEN Y TARJETA LATERAL)
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    // Textos mejorados para la tarjeta lateral
    const destinationsData = {
        sombrero: {
            title: "Cayo Sombrero",
            desc: "El ícono caribeño de Morrocoy. Famoso por sus dos extensas playas de arena blanca y aguas cristalinas turquesa, ideal para disfrutar un día de playa de nivel internacional.",
            image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80"
        },
        juanes: {
            title: "Los Juanes",
            desc: "La piscina natural más exclusiva. Un bajo transparente en mar abierto sin orilla, perfecto para escuchar música, degustar gastronomía marina y festejar desde la embarcación.",
            image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1000&q=80"
        },
        pescadores: {
            title: "Cayo Pescadores",
            desc: "Un santuario de calma absoluta. Conocido por sus aguas llanas, temperatura cálida y oleaje casi nulo. La opción perfecta para familias y grupos que buscan relajarse en privacidad.",
            image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1000&q=80"
        },
        bajo360: {
            title: "Bajo 360",
            desc: "Impresionante panorámica en el mar. Un banco de arena cristalino rodeado de tonos azules infinitos. El destino preferido para tomas increíbles con drone y fotografías únicas.",
            image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1000&q=80"
        }
    };

    const radioInputs = document.querySelectorAll('input[name="destination_select"]');
    const displayImg = document.getElementById('dest-display-img');
    const cardTitle = document.getElementById('card-title');
    const cardDesc = document.getElementById('card-desc');

    if (!radioInputs.length || !displayImg || !cardTitle || !cardDesc) return;

    radioInputs.forEach(radio => {
        radio.addEventListener('change', (e) => {
            const selectedKey = e.target.value;
            const data = destinationsData[selectedKey];

            if (!data) return;

            // Transición de opacidad para efecto suave
            displayImg.style.opacity = '0.3';
            cardTitle.style.opacity = '0';
            cardDesc.style.opacity = '0';

            setTimeout(() => {
                // Actualizar textos y fuente de imagen
                displayImg.src = data.image;
                displayImg.alt = data.title;
                cardTitle.textContent = data.title;
                cardDesc.textContent = data.desc;

                // Devolver opacidad
                displayImg.style.opacity = '1';
                cardTitle.style.opacity = '1';
                cardDesc.style.opacity = '1';
            }, 200);
        });
    });
});

/* ==========================================================================
   CARRUSEL DE IMÁGENES - SECCIÓN BENEFICIOS
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.benefits-slide');
    const dots = document.querySelectorAll('.benefits-dots .dot');
    const prevBtn = document.querySelector('.benefits-arrow.prev-slide');
    const nextBtn = document.querySelector('.benefits-arrow.next-slide');

    if (!slides.length) return;

    let currentSlide = 0;

    const updateCarousel = (index) => {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        currentSlide = index;
    };

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const nextIndex = (currentSlide + 1) % slides.length;
            updateCarousel(nextIndex);
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
            updateCarousel(prevIndex);
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => updateCarousel(index));
    });
});

