const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/gps', (req, res) => {
  const { id, latitude, longitude, timestamp } = req.body;
  console.log(`[BACKEND] Palomo ${id}: lat=${latitude} lon=${longitude} timestamp=${timestamp}`);
  res.status(200).json({ message: 'GPS position received' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API corriendo en http://localhost:${PORT}`));