const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Ruta principal de prueba
app.get('/api/productos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM productos');
    res.json(result.rows);
  } catch (error) {
    console.error('ERROR EN POSTGRES:', error);
    res.status(500).json({ 
      error: 'Error al obtener los productos', 
      mensaje_real: error.message,
      codigo_error: error.code 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor de Coffeely listo en http://localhost:${PORT}`);
});