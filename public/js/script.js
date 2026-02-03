// Navbar scroll effect
window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    if (window.scrollY > 50) {
        navbar.style.boxShadow = "0 5px 30px rgba(0, 0, 0, 0.15)";
    } else {
        navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.08)";
    }
});

// Form submission
document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Gracias por su mensaje. Nos pondremos en contacto con usted pronto.");
    this.reset();
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
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
