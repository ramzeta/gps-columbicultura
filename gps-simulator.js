// gps-simulator.js

const axios = require('axios');
const Palomo = require('./palomos');

const NUM_PALOMOS = 5;
const palomos = [];

// Benimodo, Valencia como punto de partida
for (let i = 0; i < NUM_PALOMOS; i++) {
  palomos.push(new Palomo(
    `palomo_${i + 1}`,
    39.1900 + (Math.random() - 0.5) / 100,
    -0.5500 + (Math.random() - 0.5) / 100
  ));
}

async function sendPosition(palomo) {
  try {
    await axios.post('http://localhost:3000/gps', {
      id: palomo.id,
      latitude: palomo.latitude,
      longitude: palomo.longitude,
      timestamp: Date.now(),
    });
  } catch (err) {
    console.error(`Error enviando posición de ${palomo.id}:`, err.message);
  }
}

async function startSimulation() {
  setInterval(async () => {
    for (const palomo of palomos) {
      palomo.moveRandom();
      await sendPosition(palomo);
      palomo.age += 1;
      if (palomo.age >= palomo.maxAge) process.exit(0);
    }
  }, 5000);
}

startSimulation();
