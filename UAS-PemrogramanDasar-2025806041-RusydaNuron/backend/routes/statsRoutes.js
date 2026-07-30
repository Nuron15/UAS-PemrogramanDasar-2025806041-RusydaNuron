// Endpoint khusus untuk dashboard statistik: total mahasiswa,
// total kelas, dan rata-rata nilai. Query langsung ditulis di sini
// (tanpa model terpisah) karena hanya dipakai sekali dan sederhana.

const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/', async (req, res) => {
    try {
        const [[{ total_mahasiswa }]] = await pool.query('SELECT COUNT(*) AS total_mahasiswa FROM mahasiswa');
        const [[{ total_kelas }]] = await pool.query('SELECT COUNT(*) AS total_kelas FROM kelas');
        const [[{ rata_nilai }]] = await pool.query('SELECT ROUND(AVG(nilai_angka), 2) AS rata_nilai FROM nilai');

        res.json({ total_mahasiswa, total_kelas, rata_nilai: rata_nilai || 0 });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;