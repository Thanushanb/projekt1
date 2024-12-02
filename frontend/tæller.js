// Initial værdi for plastik i havene
let totalPlastic = 0;
// Ton plastik per minut
const plasticPerMinute = 15;

// Funktion til at opdatere tælleren
function updateCounter() {
    // Øg plastikmængden med plastik per sekund
    totalPlastic += plasticPerMinute / 60; // Del med 60 for at få sekunder
    document.getElementById('plasticCounter').innerText = totalPlastic.toFixed(2) + ' ton'; // To decimaler
}

// Opdater tælleren hvert sekund
setInterval(updateCounter, 1000);