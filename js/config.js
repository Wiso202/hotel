/**
 * CONFIGURATION GLOBALE DE L'HÔTEL
 * Modifiez les valeurs ici pour mettre à jour tout le site.
 */

const CONFIG = {
    // Informations Générales
    hotelName: "OASIS MAISON D'HÔTE",
    slogan: "Le luxe et la sérénité au cœur d'Akpakpa",
    address: "Lot 452, Quartier Akpakpa, Cotonou, Bénin",
    email: "contact@oasis-benin.bj",
    phone: "+229 01 40 43 41 20",
    whatsappNumber: "2290140434120", // Sans le '+' pour le lien direct

    // Réseaux Sociaux
    instagram: "https://instagram.com/oasis_benin",
    facebook: "https://facebook.com/oasisbenin",

    // Paramètres du Séjour
    checkInTime: "14:00",
    checkOutTime: "11:00",
    currency: "FCFA",

    // Liens de redirection
    googleMapsLink: "https://goo.gl/maps/votre-lien-ici"
};

/**
 * Script de mise à jour automatique des éléments HTML
 * Ce script cherche les IDs correspondants dans tes fichiers HTML et les remplit.
 */
document.addEventListener("DOMContentLoaded", () => {
    // Nom de l'hôtel
    const nameElements = document.querySelectorAll('[id^="hotel-name"]');
    nameElements.forEach(el => el.textContent = CONFIG.hotelName);

    // Slogan
    const sloganEl = document.getElementById('hotel-slogan');
    if(sloganEl) sloganEl.textContent = CONFIG.slogan;

    // Adresse
    const addrEl = document.getElementById('hotel-address');
    if(addrEl) addrEl.textContent = CONFIG.address;

    // Téléphone
    const telEl = document.getElementById('hotel-tel');
    if(telEl) {
        telEl.textContent = CONFIG.phone;
        telEl.href = `tel:${CONFIG.phone.replace(/\s/g, '')}`;
    }

    // WhatsApp
    const waLinks = document.querySelectorAll('.wa-link');
    waLinks.forEach(link => {
        link.href = `https://wa.me/${CONFIG.whatsappNumber}`;
    });
});