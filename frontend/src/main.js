import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const map = L.map('map').setView([39.1900, -0.5500], 14);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }).addTo(map);


const palomos = [];
let started = false;

function createPalomo(id) {
  return {
    id,
    latitude: 39.1900 + (Math.random() - 0.5) / 100,
    longitude: -0.5500 + (Math.random() - 0.5) / 100,
    polyline: L.polyline([], { color: '#' + Math.floor(Math.random()*16777215).toString(16) }).addTo(map),
    path: []
  };
}

document.getElementById('simulate').addEventListener('click', () => {
  if (started) return;
  started = true;

  for (let i = 0; i < 5; i++) {
    palomos.push(createPalomo(`Palomo_${i+1}`));
  }

  setInterval(async () => {
    for (const p of palomos) {
      p.latitude += (Math.random() - 0.5) / 500;
      p.longitude += (Math.random() - 0.5) / 500;
      p.path.push([p.latitude, p.longitude]);
      p.polyline.setLatLngs(p.path);

      await fetch('http://localhost:3000/api/gps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: p.id,
          latitude: p.latitude,
          longitude: p.longitude,
          timestamp: Date.now()
        })
      });
    }
  }, 3000);
});