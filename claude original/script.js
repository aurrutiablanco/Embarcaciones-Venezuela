/*======================= SCRIPT DE ANTONIO (prefijo am-) =======================*/
document.addEventListener("DOMContentLoaded", () => {

    const navbar = document.getElementById("am-navbar");
    const mobileMenuBtn = document.getElementById("am-mobile-menu");
    const navLinks = document.getElementById("am-nav-links");

    mobileMenuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("am-active");
        navbar.classList.toggle("am-menu-open");
        const icon = mobileMenuBtn.querySelector("i");
        if(navLinks.classList.contains("am-active")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("am-active");
            navbar.classList.remove("am-menu-open");
            mobileMenuBtn.querySelector("i").classList.replace("fa-xmark", "fa-bars");
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
    });

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("am-scrolled");
        } else {
            navbar.classList.remove("am-scrolled");
        }
    });

    const currentYearSpan = document.getElementById("am-current-year");
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    const fadeElements = document.querySelectorAll(".am-fade-in-element");
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("am-visible");
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => { appearOnScroll.observe(element); });

    window.addEventListener("scroll", () => {
        fadeElements.forEach(element => {
            if (element.classList.contains("am-visible")) {
                const rect = element.getBoundingClientRect();
                if (rect.bottom < 150) {
                    element.classList.add("am-scrolled-past");
                } else {
                    element.classList.remove("am-scrolled-past");
                }
            }
        });
    });

    const accordionItems = document.querySelectorAll('.am-accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.am-accordion-header');
        header.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.am-accordion-item.am-active');
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('am-active');
                const activeIcon = currentlyActive.querySelector('i');
                activeIcon.classList.remove('fa-chevron-up');
                activeIcon.classList.add('fa-chevron-down');
            }
            item.classList.toggle('am-active');
            const icon = header.querySelector('i');
            if (item.classList.contains('am-active')) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    });

    const toggleButtons = document.querySelectorAll('.am-details-toggle');
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            const panelId = button.getAttribute('aria-controls');
            const panel = document.getElementById(panelId);
            
            button.setAttribute('aria-expanded', !isExpanded);
            if (!isExpanded) {
                panel.classList.add('am-open');
                panel.setAttribute('aria-hidden', 'false');
            } else {
                panel.classList.remove('am-open');
                panel.setAttribute('aria-hidden', 'true');
            }
        });
    });

    const fleetCards = document.querySelectorAll('.am-fleet-card');
    fleetCards.forEach(card => {
        const radioInputs = card.querySelectorAll('.am-radio-input');
        const ctaBtn = card.querySelector('.am-reserve-cta-btn');
        const vesselType = card.getAttribute('data-type');

        radioInputs.forEach(input => {
            input.addEventListener('change', (e) => {
                const selectedCapacity = e.target.value;
                const encodedMsg = encodeURIComponent(`Quiero reservar un${vesselType === 'Lancha' ? 'a' : ''} ${vesselType} para ${selectedCapacity}`);
                ctaBtn.setAttribute('href', `https://wa.me/tunumerode_whatsapp?text=${encodedMsg}`);
            });
        });
    });

    const tabs = document.querySelectorAll('[role="tab"]');
    const tabPanels = document.querySelectorAll('[role="tabpanel"]');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => {
                t.setAttribute('aria-selected', false);
                t.setAttribute('tabindex', '-1');
                t.classList.remove('am-active');
            });
            tabPanels.forEach(p => p.setAttribute('hidden', true));

            tab.setAttribute('aria-selected', true);
            tab.removeAttribute('tabindex');
            tab.classList.add('am-active');
            
            const controls = tab.getAttribute('aria-controls');
            document.getElementById(controls).removeAttribute('hidden');
        });

        tab.addEventListener('keydown', e => {
            let index = Array.from(tabs).indexOf(e.target);
            let dir = 0;

            if (e.key === 'ArrowLeft') {
                dir = index - 1;
            } else if (e.key === 'ArrowRight') {
                dir = index + 1;
            }

            if (dir !== 0) {
                e.preventDefault();
                if (dir < 0) dir = tabs.length - 1;
                if (dir >= tabs.length) dir = 0;
                
                tabs[dir].focus();
                tabs[dir].click();
            }
        });
    });
});

/*======================= SCRIPT DE ARMANDO (prefijo au-) =======================*/
document.addEventListener("DOMContentLoaded", () => {

    // 1. Manejo del Navbar Sticky y Menú Móvil
    const navbar = document.getElementById("au-navbar");
    const mobileMenuBtn = document.getElementById("au-mobile-menu");
    const navLinks = document.getElementById("au-nav-links");

    mobileMenuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("au-active");
        navbar.classList.toggle("au-menu-open");
        const icon = mobileMenuBtn.querySelector("i");
        if(navLinks.classList.contains("au-active")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("au-active");
            navbar.classList.remove("au-menu-open");
            mobileMenuBtn.querySelector("i").classList.replace("fa-xmark", "fa-bars");
        });
    });

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("au-scrolled");
        } else {
            navbar.classList.remove("au-scrolled");
        }
    });

    // 2. Año Dinámico en Footer
    const currentYearSpan = document.getElementById("au-current-year");
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // 3. Sistema de Revelación y Efecto "Scale-Down"
    const fadeElements = document.querySelectorAll(".au-fade-in-element");
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("au-visible");
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });

    window.addEventListener("scroll", () => {
        fadeElements.forEach(element => {
            if (element.classList.contains("au-visible")) {
                const rect = element.getBoundingClientRect();
                if (rect.bottom < 150) {
                    element.classList.add("au-scrolled-past");
                } else {
                    element.classList.remove("au-scrolled-past");
                }
            }
        });
    });

    // 4. Lógica del Acordeón (FAQ)
    const accordionItems = document.querySelectorAll('.au-accordion-item');
    accordionItems.forEach(item => {
        const header = item.querySelector('.au-accordion-header');
        header.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.au-accordion-item.au-active');
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('au-active');
                const activeIcon = currentlyActive.querySelector('i');
                activeIcon.classList.remove('fa-chevron-up');
                activeIcon.classList.add('fa-chevron-down');
            }
            item.classList.toggle('au-active');
            const icon = header.querySelector('i');
            if (item.classList.contains('au-active')) {
                icon.classList.remove('fa-chevron-down');
                icon.classList.add('fa-chevron-up');
            } else {
                icon.classList.remove('fa-chevron-up');
                icon.classList.add('fa-chevron-down');
            }
        });
    });

    // 5. Lógica de Despliegue de Detalles de Flota (NUEVO - ACCESIBILIDAD)
    const toggleButtons = document.querySelectorAll('.au-details-toggle');
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
    const track = document.querySelector('.au-slider-track');
    const cards = document.querySelectorAll('.au-testimonial-card');
    const prevBtn = document.querySelector('.au-prev-btn');
    const nextBtn = document.querySelector('.au-next-btn');
    const dotsContainer = document.querySelector('.au-slider-dots-container');

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
            dot.classList.add('au-dot');
            dot.setAttribute('aria-label', `Ir a la página ${i + 1}`);
            if (i === currentIndex) dot.classList.add('au-active');
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

        const dots = dotsContainer.querySelectorAll('.au-dot');
        dots.forEach((dot, idx) => {
            dot.classList.toggle('au-active', idx === currentIndex);
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
    const displayImg = document.getElementById('au-dest-display-img');
    const cardTitle = document.getElementById('au-card-title');
    const cardDesc = document.getElementById('au-card-desc');

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