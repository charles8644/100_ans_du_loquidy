// Initialisation de la carte
var map = L.map('map').setView([48.8566, 2.3522], 13); // Exemple: Paris

// Ajouter un fond de carte
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Charger le GPX
var gpxFile = '100Loquidy.gpx'; // chemin vers ton fichier GPX

// Fonction pour décaler la latitude
function shiftLatLng(latlng, deltaLat, deltaLng) {
    return [latlng.lat + deltaLat, latlng.lng + deltaLng];
}

// On crée le GPX
var gpx = new L.GPX(gpxFile, {
    async: true,
    marker_options: {
        startIconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
        endIconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-red.png',
        shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png'
    },
    polyline_options: {
        color: 'orange',
        weight: 5,
        opacity: 0.7,
        lineCap: 'round'
    }
});

// Une fois le GPX chargé, on décale la trace
gpx.on('loaded', function(e) {
    var layers = gpx.getLayers(); // récupérer toutes les polylines
    layers.forEach(function(layer) {
        var newLatLngs = layer.getLatLngs().map(function(latlng) {
            return L.latLng( latlng.lat - 0.0015, latlng.lng ); // ici on descend le parcours de 0.0005°
        });
        layer.setLatLngs(newLatLngs);
    });

    map.fitBounds(e.target.getBounds()); // recentrer la carte
});

gpx.addTo(map);

// Animation Snake
gpx.on('add', function() {
    var polyline = gpx.getLayers()[0]; // récupérer la polyline
    polyline.snakeIn(); // animation du parcours
});