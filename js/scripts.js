/**
 * SCRIPTS PRINCIPAUX - Hôtel Oasis
 */

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. GESTION DU MENU AU SCROLL
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = "white";
            navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
            navbar.style.padding = "15px 8%";
        } else {
            navbar.style.background = "rgba(255, 255, 255, 0.95)";
            navbar.style.padding = "20px 8%";
            navbar.style.boxShadow = "none";
        }
    });

    // 2. ANIMATION D'ENTRÉE DES ÉLÉMENTS (Observer)
    const observerOptions = { threshold: 0.2 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                observer.unobserve(entry.target); // On anime une seule fois
            }
        });
    }, observerOptions);

    document.querySelectorAll('.room-card, .service-card, .card-level-1').forEach(el => {
        observer.observe(el);
    });

    // 3. LOGIQUE DE RÉSERVATION WHATSAPP
    const resForm = document.getElementById('reservation-form');
    if (resForm) {
        resForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Récupération des données du formulaire
            const arrivee = resForm.querySelector('#checkin').value;
            const depart = resForm.querySelector('#checkout').value;
            const chambre = resForm.querySelector('#room-type').value;
            const convives = resForm.querySelector('#guests').value;

            // Construction du message
            const message = `Bonjour *${CONFIG.hotelName}*, je souhaite effectuer une réservation :
            
📅 *Arrivée :* ${arrivee}
📅 *Départ :* ${depart}
🛌 *Type :* ${chambre}
👥 *Nombre :* ${convives} personnes.
            
Merci de me confirmer la disponibilité !`;

            // Encodage pour URL
            const whatsappUrl = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;

            // Redirection
            window.open(whatsappUrl, '_blank');
        });
    }

    // 4. GALERIE : PETIT EFFET DE ZOOM (Simulé)
    const galleryImgs = document.querySelectorAll('.gallery-container img');
    galleryImgs.forEach(img => {
        img.addEventListener('click', () => {
            alert("Ici, on pourrait ouvrir une Lightbox pour voir l'image en grand !");
        });
    });

});
// Smooth Scroll pour les liens d'ancrage
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80, // -80 pour ne pas cacher le haut sous la navbar glass
                behavior: 'smooth'
            });
        }
    });
});