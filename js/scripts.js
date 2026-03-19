/**
 * SCRIPTS PRINCIPAUX - Azure Oasis (Luxe & Smart)
 * Version avec Menu Burger "Trois Tirets" Fonctionnel
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. SÉLECTEURS ---
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('#mobile-menu'); // Les 3 tirets
    const navLinks = document.querySelector('#navLinks');     // La liste de liens

    // --- 2. GESTION DU MENU MOBILE (BURGER) ---
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation(); // Empêche la fermeture immédiate
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('is-active');
        });

        // Fermer le menu si on clique sur un lien
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('is-active');
            });
        });

        // Fermer le menu si on clique n'importe où ailleurs sur l'écran
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('is-active');
            }
        });
    }

    // --- 3. GESTION DE LA NAVBAR AU SCROLL (EFFET GLASS) ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.style.background = "rgba(255, 255, 255, 0.95)";
            navbar.style.backdropFilter = "blur(10px)";
            navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,0.08)";
            navbar.style.padding = "15px 8%";
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.background = "rgba(255, 255, 255, 0.1)"; 
            navbar.style.backdropFilter = "blur(5px)";
            navbar.style.padding = "20px 8%";
            navbar.style.boxShadow = "none";
        }
    });

    // --- 4. ANIMATION D'ENTRÉE DES ÉLÉMENTS (OBSERVER) ---
    const observerOptions = { threshold: 0.15 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    document.querySelectorAll('.room-item, .service-card, .service-item, .contact-item').forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.8s ease-out";
        observer.observe(el);
    });

    // --- 5. LOGIQUE DE RÉSERVATION WHATSAPP ---
    const resForm = document.getElementById('reservation-form');
    if (resForm) {
        resForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const checkin = resForm.querySelector('input[type="date"]:first-of-type').value;
            const checkout = resForm.querySelectorAll('input[type="date"]')[1].value;
            const guests = resForm.querySelector('input[type="number"]').value;
            
            const hotelName = "Azure Oasis Cotonou";
            const whatsappNum = "2290140434120"; 

            const message = `✨ *NOUVELLE RÉSERVATION - ${hotelName}* ✨\n\n` +
                            `📅 *Arrivée :* ${checkin}\n` +
                            `📅 *Départ :* ${checkout}\n` +
                            `👥 *Nombre de personnes :* ${guests}\n\n` +
                            `Merci de me confirmer la disponibilité pour ces dates !`;

            const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(message)}`;

            const btn = resForm.querySelector('button');
            btn.innerText = "Ouverture de WhatsApp...";
            btn.style.opacity = "0.7";

            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
                btn.innerText = "Confirmer ma demande";
                btn.style.opacity = "1";
            }, 800);
        });
    }

    // --- 6. SMOOTH SCROLL ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId !== "#") {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, 
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

});

/**
 * Fonction globale pour le bouton flottant WhatsApp
 */
function openWhatsApp() {
    const phone = "2290140434120";
    const msg = encodeURIComponent("Bonjour Azure Oasis, j'aimerais avoir des informations complémentaires sur vos suites.");
    window.open(`https://wa.me/${phone}?text=${msg}`, "_blank");
}
