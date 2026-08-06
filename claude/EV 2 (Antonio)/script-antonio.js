document.addEventListener("DOMContentLoaded", () => {

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
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
    });

    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            navbar.classList.remove("menu-open");
            mobileMenuBtn.querySelector("i").classList.replace("fa-xmark", "fa-bars");
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
    });

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });

    const currentYearSpan = document.getElementById("current-year");
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    const fadeElements = document.querySelectorAll(".fade-in-element");
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    fadeElements.forEach(element => { appearOnScroll.observe(element); });

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

    const toggleButtons = document.querySelectorAll('.details-toggle');
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            const isExpanded = button.getAttribute('aria-expanded') === 'true';
            const panelId = button.getAttribute('aria-controls');
            const panel = document.getElementById(panelId);
            
            button.setAttribute('aria-expanded', !isExpanded);
            if (!isExpanded) {
                panel.classList.add('open');
                panel.setAttribute('aria-hidden', 'false');
            } else {
                panel.classList.remove('open');
                panel.setAttribute('aria-hidden', 'true');
            }
        });
    });

    const fleetCards = document.querySelectorAll('.fleet-card');
    fleetCards.forEach(card => {
        const radioInputs = card.querySelectorAll('.radio-input');
        const ctaBtn = card.querySelector('.reserve-cta-btn');
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
                t.classList.remove('active');
            });
            tabPanels.forEach(p => p.setAttribute('hidden', true));

            tab.setAttribute('aria-selected', true);
            tab.removeAttribute('tabindex');
            tab.classList.add('active');
            
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