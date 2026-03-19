/**
 * SCRIPTS PRINCIPAUX - Azure Oasis (Luxe & Smart)
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. SÉLECTEURS ---
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('#mobile-menu');
    const navLinks = document.querySelector('#navLinks');

    // --- 2. GESTION DU MENU MOBILE (BURGER) ---
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('is-active');
        });

        // Fermer le menu si on clique sur un lien (essentiel sur mobile)
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('is-active');
            });
        });
    }

    // --- 3. GESTION DE LA NAVBAR AU SCROLL (EFFET GLASS) ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            // Style dynamique "Smart"
            navbar.style.background = "rgba(255, 255, 255, 0.95)";
            navbar.style.backdropFilter = "blur(10px)";
            navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,0.08)";
            navbar.style.padding = "15px 8%";
        } else {
            navbar.classList.remove('scrolled');
            // Retour au style transparent/initial
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
                // On utilise les classes Animate.css si disponibles, sinon un fondu standard
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Cibles d'animation
    document.querySelectorAll('.room-item, .service-card, .service-item, .contact-item').forEach(el => {
        // État initial avant animation
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

            // Récupération des données (Assure-toi que les IDs correspondent à ton HTML)
            const checkin = resForm.querySelector('input[type="date"]:first-of-type').value;
            const checkout = resForm.querySelectorAll('input[type="date"]')[1].value;
            const guests = resForm.querySelector('input[type="number"]').value;
            
            // On récupère le nom de l'hôtel depuis une variable ou le DOM
            const hotelName = "Azure Oasis Cotonou";
            const whatsappNum = "2290140434120"; // Ton numéro expert

            // Construction du message élégant
            const message = `✨ *NOUVELLE RÉSERVATION - ${hotelName}* ✨\n\n` +
                            `📅 *Arrivée :* ${checkin}\n` +
                            `📅 *Départ :* ${checkout}\n` +
                            `👥 *Nombre de personnes :* ${guests}\n\n` +
                            `Merci de me confirmer la disponibilité pour ces dates !`;

            const whatsappUrl = `https://wa.me/${whatsappNum}?text=${encodeURIComponent(message)}`;

            // Feedback visuel avant redirection
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

    // --- 6. SMOOTH SCROLL (SCROLL FLUIDE) ---
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
