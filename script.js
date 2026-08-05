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

    // 3. Sistema de Revelación y Efecto "Scale-Down" al Scrollear (Se aplica automáticamente al nuevo Collage)
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

});