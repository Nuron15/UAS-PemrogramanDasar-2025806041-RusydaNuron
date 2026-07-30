// File ini adalah "pintu masuk" utama backend.
// Menyalakan server Express, menggabungkan semua route jadi satu,
// dan menentukan port berapa yang dipakai.

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const pool = require('./config/db');

const mahasiswaRoutes = require('./routes/mahasiswaRoutes');
const kelasRoutes = require('./routes/kelasRoutes');
const statsRoutes = require('./routes/statsRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(require('path').join(__dirname, '../frontend/uploads')));

app.use('/api/mahasiswa', mahasiswaRoutes);
app.use('/api/kelas', kelasRoutes);
app.use('/api/nilai', require('./routes/nilaiRoutes'));
app.use('/api/stats', statsRoutes);

app.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT 1 + 1 AS result');
        res.json({
            message: 'Backend Student Management System jalan!',
            db_status: 'connected',
            test_query: rows[0].result
        });
    } catch (error) {
        res.status(500).json({
            message: 'Backend jalan, tapi database gagal connect',
            error: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});