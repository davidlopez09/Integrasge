// Navbar scroll effect with color change
window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    const heroSection = document.querySelector(".hero");
    const heroHeight = heroSection ? heroSection.offsetHeight : 700;

    // Cambiar color y sombra según la posición del scroll
    if (window.scrollY > heroHeight) {
        // Estamos fuera del hero - navbar más oscuro
        navbar.style.background = "rgba(244, 235, 235, 0.98)"; // Gris muy claro
        navbar.style.boxShadow = "0 5px 30px rgba(0, 0, 0, 0.15)";
    } else {
        // Estamos en el hero - navbar blanco puro
        navbar.style.background = "rgba(255, 255, 255, 0.98)";
        navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.08)";
    }
});

// Form submission
document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Gracias por su mensaje. Nos pondremos en contacto con usted pronto.");
    this.reset();
});

// Smooth scroll for navigation links con offset para navbar
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const targetId = this.getAttribute("href");
        const target = document.querySelector(targetId);

        if (target) {
            // Obtener la altura del navbar
            const navbarHeight = document.querySelector(".navbar").offsetHeight;

            // Calcular la posición con offset
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - -60;

            // Scroll suave a la posición ajustada
            window.scrollTo({
                top: targetPosition,
                behavior: "smooth",
            });
        }
    });
});

// Intersection Observer for animations
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

// WhatsApp redirect para botones de servicios
document.querySelectorAll(".whatsapp-btn").forEach((button) => {
    button.addEventListener("click", function (e) {
        e.preventDefault();

        const servicio = this.getAttribute("data-service");
        const mensaje = `Hola, vengo de su sitio web, necesito asesoría sobre el servicio ${servicio}`;

        // IMPORTANTE: Cambia el número por el tuyo (incluye código de país, sin +, sin espacios ni guiones)
        const numeroWhatsApp = "573103939734"; // ← ← ← Pon aquí tu número real

        const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

        window.open(url, "_blank");
    });
});

// Mostrar burbuja de WhatsApp al cargar la página
document.addEventListener("DOMContentLoaded", function () {
    const bubble = document.getElementById("whatsappBubble");

    if (bubble) {
        // Mostrar después de un pequeño retraso (para que no sea tan abrupto)
        setTimeout(() => {
            bubble.classList.add("show");
        }, 800); // 0.8 segundos después de cargar

        // Ocultar después de 5 segundos desde que apareció
        setTimeout(() => {
            bubble.classList.remove("show");
            // Opcional: eliminar del DOM después de la animación
            setTimeout(() => {
                bubble.style.display = "none";
            }, 500);
        }, 5800); // 800ms + 5000ms
    }
});
