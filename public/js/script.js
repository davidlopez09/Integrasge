// ============================================================================
// INTEGRASGE - JavaScript Completo (EmailJS corregido + feedback visual)
// ============================================================================

document.addEventListener("DOMContentLoaded", function () {
    // ────────────────────────────────────────────────
    // 1. MENÚ HAMBURGUESA RESPONSIVE
    // ────────────────────────────────────────────────
    const navContainer = document.querySelector(".nav-container");
    const navLinks = document.querySelector(".nav-links");

    if (navContainer && navLinks) {
        const menuToggle = document.createElement("button");
        menuToggle.className = "menu-toggle";
        menuToggle.setAttribute("aria-label", "Menú de navegación");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.innerHTML = `<span></span><span></span><span></span>`;

        const overlay = document.createElement("div");
        overlay.className = "nav-overlay";

        navContainer.appendChild(menuToggle);
        document.body.appendChild(overlay);

        function closeMenu() {
            navLinks.classList.remove("active");
            menuToggle.classList.remove("active");
            overlay.classList.remove("active");
            document.body.style.overflow = "";
            menuToggle.setAttribute("aria-expanded", "false");
        }

        menuToggle.addEventListener("click", () => {
            const isActive = navLinks.classList.toggle("active");
            menuToggle.classList.toggle("active");
            overlay.classList.toggle("active");
            document.body.style.overflow = isActive ? "hidden" : "";
            menuToggle.setAttribute("aria-expanded", isActive);
        });

        overlay.addEventListener("click", closeMenu);

        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", closeMenu);
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && navLinks.classList.contains("active")) {
                closeMenu();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 768 && navLinks.classList.contains("active")) {
                closeMenu();
            }
        });
    }

    // ────────────────────────────────────────────────
    // 2. NAVBAR SCROLL EFFECT
    // ────────────────────────────────────────────────
    const navbar = document.querySelector(".navbar");
    const hero = document.querySelector(".hero");

    if (navbar && hero) {
        window.addEventListener("scroll", () => {
            const heroHeight = hero.offsetHeight;
            if (window.scrollY > heroHeight - 100) {
                navbar.style.background = "rgba(244, 235, 235, 0.98)";
                navbar.style.boxShadow = "0 5px 30px rgba(0,0,0,0.15)";
            } else {
                navbar.style.background = "rgba(255, 255, 255, 0.98)";
                navbar.style.boxShadow = "0 2px 20px rgba(0,0,0,0.08)";
            }
        });
    }

    // ────────────────────────────────────────────────
    // 3. SMOOTH SCROLL PARA ENLACES INTERNOS
    // ────────────────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;

            const target = document.querySelector(targetId);
            if (target) {
                const navbarHeight = navbar?.offsetHeight || 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth",
                });
            }
        });
    });

    // ────────────────────────────────────────────────
    // 4. ANIMACIONES AL HACER SCROLL (service cards)
    // ────────────────────────────────────────────────
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }
            });
        },
        { threshold: 0.15, rootMargin: "0px 0px -80px 0px" },
    );

    document.querySelectorAll(".service-card").forEach((card) => {
        card.style.opacity = "0";
        card.style.transform = "translateY(40px)";
        card.style.transition = "all 0.7s ease-out";
        observer.observe(card);
    });

    // ────────────────────────────────────────────────
    // 5. BOTONES WHATSAPP DE SERVICIOS
    // ────────────────────────────────────────────────
    document.querySelectorAll(".whatsapp-btn").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            const servicio = btn.getAttribute("data-service") || "servicio";
            const mensaje = `Hola INTEGRASGE, vengo desde la web.\nEstoy interesado/a en: *${servicio}*`;
            const numero = "573103939734";
            const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
            window.open(url, "_blank");
        });
    });

    // ────────────────────────────────────────────────
    // 6. BURBUJA WHATSAPP (aparece y desaparece)
    // ────────────────────────────────────────────────
    const whatsappBubble = document.getElementById("whatsappBubble");
    if (whatsappBubble) {
        setTimeout(() => whatsappBubble.classList.add("show"), 1200);
        setTimeout(() => {
            whatsappBubble.classList.remove("show");
            setTimeout(() => {
                whatsappBubble.style.display = "none";
            }, 600);
        }, 6800);
    }

    // ────────────────────────────────────────────────
    // 7. FORMULARIO + EMAILJS + MENSAJE BONITO DE ÉXITO
    // ────────────────────────────────────────────────
    const contactForm = document.querySelector("#contactForm");
    const submitBtn = contactForm?.querySelector(".btn-submit");

    if (contactForm && submitBtn) {
        const SERVICE_ID = "service_0w8k1kq";
        const TEMPLATE_ID = "template_8n18ii5";
        const PUBLIC_KEY = "j-PJWXNDYNBwKstx1";

        emailjs.init({ publicKey: PUBLIC_KEY });

        // Crear elemento para notificación bonita (se agrega una sola vez)
        const successToast = document.createElement("div");
        successToast.id = "success-toast";
        successToast.innerHTML = `
        <div style="display:flex; align-items:center; gap:12px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <span>¡Mensaje enviado con éxito! Te contactaremos pronto.</span>
        </div>
    `;
        document.body.appendChild(successToast);

        contactForm.addEventListener("submit", function (e) {
            e.preventDefault();

            contactForm.classList.remove("success", "error");
            submitBtn.disabled = true;
            submitBtn.textContent = "Enviando...";

            const formData = {
                from_name: document.getElementById("name")?.value?.trim() || "",
                from_email: document.getElementById("email")?.value?.trim() || "",
                phone: document.getElementById("phone")?.value?.trim() || "",
                message: document.getElementById("message")?.value?.trim() || "",
                to_name: "Equipo INTEGRASGE",
                reply_to: document.getElementById("email")?.value || "",
                fecha: new Date().toLocaleString("es-CO", { timeZone: "America/Bogota" }),
            };

            if (!formData.from_name || !formData.from_email || !formData.message) {
                contactForm.classList.add("error");
                alert("Por favor completa: Nombre, Correo y Mensaje.");
                submitBtn.disabled = false;
                submitBtn.textContent = "Enviar Consulta";
                return;
            }

            emailjs
                .send(SERVICE_ID, TEMPLATE_ID, formData)
                .then((response) => {
                    console.log("ÉXITO:", response);

                    // Mostrar notificación bonita
                    successToast.classList.add("show-toast");

                    // Cambiar estilo del formulario
                    contactForm.classList.add("success");

                    // Resetear formulario
                    contactForm.reset();

                    // Cambiar texto del botón temporalmente
                    submitBtn.textContent = "¡Enviado! ✨";

                    // Ocultar toast y resetear todo después de 5 segundos
                    setTimeout(() => {
                        successToast.classList.remove("show-toast");
                        contactForm.classList.remove("success");
                        submitBtn.textContent = "Enviar Consulta";
                    }, 5000);
                })
                .catch((err) => {
                    console.error("ERROR:", err);
                    contactForm.classList.add("error");
                    alert("Hubo un problema al enviar. Intenta de nuevo o contáctanos por WhatsApp.");
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    if (!contactForm.classList.contains("success")) {
                        submitBtn.textContent = "Enviar Consulta";
                    }
                });
        });
    }
});
