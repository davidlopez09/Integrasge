// ============================================================================
// INTEGRASGE - JavaScript Completo con Menú Hamburguesa Responsive
// ============================================================================

// ============================================================================
// MENÚ HAMBURGUESA RESPONSIVE
// ============================================================================

document.addEventListener("DOMContentLoaded", function () {
    // Crear elementos del menú hamburguesa
    const navContainer = document.querySelector(".nav-container");
    const navLinks = document.querySelector(".nav-links");

    // Crear botón hamburguesa
    const menuToggle = document.createElement("button");
    menuToggle.className = "menu-toggle";
    menuToggle.setAttribute("aria-label", "Menú de navegación");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;

    // Crear overlay
    const overlay = document.createElement("div");
    overlay.className = "nav-overlay";

    // Insertar elementos
    navContainer.appendChild(menuToggle);
    document.body.appendChild(overlay);

    // Toggle del menú
    menuToggle.addEventListener("click", function () {
        const isActive = navLinks.classList.toggle("active");
        menuToggle.classList.toggle("active");
        overlay.classList.toggle("active");
        document.body.style.overflow = isActive ? "hidden" : "";
        menuToggle.setAttribute("aria-expanded", isActive);
    });

    // Cerrar menú al hacer clic en el overlay
    overlay.addEventListener("click", closeMenu);

    // Cerrar menú al hacer clic en un enlace
    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", function () {
            closeMenu();
        });
    });

    // Cerrar menú con tecla ESC
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && navLinks.classList.contains("active")) {
            closeMenu();
        }
    });

    // Función para cerrar el menú
    function closeMenu() {
        navLinks.classList.remove("active");
        menuToggle.classList.remove("active");
        overlay.classList.remove("active");
        document.body.style.overflow = "";
        menuToggle.setAttribute("aria-expanded", "false");
    }

    // Cerrar menú al cambiar tamaño de ventana (si se hace más grande)
    let resizeTimer;
    window.addEventListener("resize", function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            if (window.innerWidth > 768 && navLinks.classList.contains("active")) {
                closeMenu();
            }
        }, 250);
    });
});

// ============================================================================
// NAVBAR SCROLL EFFECT
// ============================================================================

window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    const heroSection = document.querySelector(".hero");
    const heroHeight = heroSection ? heroSection.offsetHeight : 700;

    // Cambiar color y sombra según la posición del scroll
    if (window.scrollY > heroHeight) {
        // Estamos fuera del hero - navbar más oscuro
        navbar.style.background = "rgba(244, 235, 235, 0.98)";
        navbar.style.boxShadow = "0 5px 30px rgba(0, 0, 0, 0.15)";
    } else {
        // Estamos en el hero - navbar blanco puro
        navbar.style.background = "rgba(255, 255, 255, 0.98)";
        navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.08)";
    }
});

// ============================================================================
// FORM SUBMISSION
// ============================================================================

const contactForm = document.querySelector("#contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Gracias por su mensaje. Nos pondremos en contacto con usted pronto.");
        this.reset();
    });
}

// ============================================================================
// SMOOTH SCROLL NAVIGATION
// ============================================================================

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");

        // Evitar error si el href es solo "#"
        if (targetId === "#") return;

        const target = document.querySelector(targetId);
        if (target) {
            // Obtener la altura del navbar
            const navbarHeight = document.querySelector(".navbar").offsetHeight;

            // Calcular la posición con offset
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight + 40;

            // Scroll suave a la posición ajustada
            window.scrollTo({
                top: targetPosition,
                behavior: "smooth",
            });
        }
    });
});

// ============================================================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

// Observe service cards
document.querySelectorAll(".service-card").forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "all 0.6s ease";
    observer.observe(card);
});

// ============================================================================
// WHATSAPP REDIRECT FOR SERVICE BUTTONS
// ============================================================================

document.querySelectorAll(".whatsapp-btn").forEach((button) => {
    button.addEventListener("click", function (e) {
        e.preventDefault();
        const servicio = this.getAttribute("data-service");
        const mensaje = `Hola, vengo de su sitio web, necesito asesoría sobre el servicio ${servicio}`;

        // IMPORTANTE: Cambia el número por el tuyo (incluye código de país, sin +, sin espacios ni guiones)
        const numeroWhatsApp = "573103939734";
        const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

        window.open(url, "_blank");
    });
});

// ============================================================================
// WHATSAPP BUBBLE ANIMATION
// ============================================================================

const whatsappBubble = document.getElementById("whatsappBubble");
if (whatsappBubble) {
    // Mostrar después de un pequeño retraso
    setTimeout(() => {
        whatsappBubble.classList.add("show");
    }, 800);

    // Ocultar después de 5 segundos
    setTimeout(() => {
        whatsappBubble.classList.remove("show");

        // Opcional: eliminar del DOM después de la animación
        setTimeout(() => {
            whatsappBubble.style.display = "none";
        }, 500);
    }, 5800);
}

// ============================================================================
// PREVENT BODY SCROLL WHEN MENU IS OPEN (adicional para iOS)
// ============================================================================

let scrollPosition = 0;

function disableScroll() {
    scrollPosition = window.pageYOffset;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = "100%";
}

function enableScroll() {
    document.body.style.position = "";
    document.body.style.top = "";
    window.scrollTo(0, scrollPosition);
}

// Aplicar al abrir/cerrar menú móvil
const menuToggleButton = document.querySelector(".menu-toggle");
if (menuToggleButton) {
    menuToggleButton.addEventListener("click", function () {
        if (document.querySelector(".nav-links").classList.contains("active")) {
            disableScroll();
        } else {
            enableScroll();
        }
    });
}

// ============================================================================
// CONSOLE INFO
// ============================================================================

console.log("%c🚀 INTEGRASGE Website", "color: #2e54a6; font-size: 20px; font-weight: bold;");
console.log("%cDesarrollado con ❤️ por Edutech Ltda", "color: #2aa5a8; font-size: 14px;");
