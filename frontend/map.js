// Initialiserer et kort ved at oprette en ny instans af Leaflet's map-objekt og angiver startplacering og zoomniveau
const map = L.map('map', {
}).setView([56.1629, 10.2039], 7); // Kortet centreres på koordinaterne (56.1629, 10.2039) med et zoomniveau på 7

// Tilføjer et lag med kortfliser fra OpenStreetMap for at give kortet et visuelt layout
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { 
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors', // Viser hvem der har leveret kortdata
    noWrap: true // Forhindrer kortet i at blive gentaget udenfor dets grænser (ingen gentagelse på verdensgrænsen)
}).addTo(map); // Tilføjer dette lag til kortet

// Henter data fra en GeoJSON-fil for at tilføje punkter eller geometrier til kortet
fetch('Geo.geojson') // Starter en hentning af filen 'Geo.geojson'
    .then(response => response.json()) // Konverterer det modtagne svar til JSON-format
    .then(data => { // Når data er blevet hentet og konverteret, fortsæt med følgende kode
        // Opretter en gruppe til at håndtere markørklynger (sammenklumpning af markører for at optimere visning)
        const markers = L.markerClusterGroup();

        // Opretter et GeoJSON-lag baseret på de hentede data og tilpasser dets udseende og funktioner
        const geoJsonLayer = L.geoJSON(data, {
            // Angiver hvordan hvert GeoJSON-punkt skal præsenteres som en markør
            pointToLayer: function (feature, latlng) {
                return L.marker(latlng); // For hver punkt-type oprettes en markør på dets placering
            },
            // Definerer, hvad der skal ske for hver enkelt GeoJSON-feature
            onEachFeature: function (feature, layer) {
                if (feature.properties) { // Tjekker om feature har egenskaber
                    let popupContent = "<b>Detaljer:</b><br>"; // Starter en popup med overskriften 'Detaljer:'
                    for (const key in feature.properties) { // Løber gennem alle egenskaber
                        popupContent += `${key}: ${feature.properties[key]}<br>`; // Tilføjer hver egenskab til popup'en
                    }
                    layer.bindPopup(popupContent); // Binder popup'en med indholdet til laget
                }
            }
        });
        // Tilføjer GeoJSON-laget (alle markører) til markeringsklyngen
        markers.addLayer(geoJsonLayer);

        // Tilføjer den samlede markeringsklynge til kortet
        map.addLayer(markers);
    })
    .catch(error => console.error('Error loading the GeoJSON file:', error)); // Hvis der opstår en fejl under hentning af GeoJSON-filen, logges den her
