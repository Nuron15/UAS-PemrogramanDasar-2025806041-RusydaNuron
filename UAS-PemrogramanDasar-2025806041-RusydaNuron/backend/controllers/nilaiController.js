const nilaiModel = require('../models/nilaiModel');

const nilaiController = {
    getAllNilai: async (req, res) => {
        try {
            const data = await nilaiModel.getAll();
            res.json(data);
        } catch (error) {
            res.status(500).json({ message: 'Gagal mengambil data nilai', error: error.message });
        }
    },

    getNilaiById: async (req, res) => {
        try {
            const data = await nilaiModel.getById(req.params.id);
            if (!data) return res.status(404).json({ message: 'Nilai tidak ditemukan' });
            res.json(data);
        } catch (error) {
            res.status(500).json({ message: 'Gagal mengambil data nilai', error: error.message });
        }
    },

    createNilai: async (req, res) => {
        try {
            const { mahasiswa_id, mata_kuliah, nilai_angka } = req.body;
            if (!mahasiswa_id || !mata_kuliah || nilai_angka === undefined) {
                return res.status(400).json({ message: 'Mahasiswa, mata kuliah, dan nilai wajib diisi' });
            }
            const insertId = await nilaiModel.create({ mahasiswa_id, mata_kuliah, nilai_angka });
            res.status(201).json({ message: 'Nilai berhasil ditambahkan', id: insertId });
        } catch (error) {
            res.status(500).json({ message: 'Gagal menambahkan nilai', error: error.message });
        }
    },

    updateNilai: async (req, res) => {
        try {
            const { mahasiswa_id, mata_kuliah, nilai_angka } = req.body;
            await nilaiModel.update(req.params.id, { mahasiswa_id, mata_kuliah, nilai_angka });
            res.json({ message: 'Nilai berhasil diupdate' });
        } catch (error) {
            res.status(500).json({ message: 'Gagal mengupdate nilai', error: error.message });
        }
    },

    deleteNilai: async (req, res) => {
        try {
            await nilaiModel.remove(req.params.id);
            res.json({ message: 'Nilai berhasil dihapus' });
        } catch (error) {
            res.status(500).json({ message: 'Gagal menghapus nilai', error: error.message });
        }
    }
};

module.exports = nilaiController;