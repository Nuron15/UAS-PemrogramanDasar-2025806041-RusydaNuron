// Controller untuk data kelas — logicnya sama seperti mahasiswaController.js,
// tapi menangani operasi CRUD untuk tabel kelas.

const kelasModel = require('../models/kelasModel');

const kelasController = {
    getAllKelas: async (req, res) => {
        try {
            const data = await kelasModel.getAll();
            res.json(data);
        } catch (error) {
            res.status(500).json({ message: 'Gagal mengambil data kelas', error: error.message });
        }
    },

    getKelasById: async (req, res) => {
        try {
            const data = await kelasModel.getById(req.params.id);
            if (!data) return res.status(404).json({ message: 'Kelas tidak ditemukan' });
            res.json(data);
        } catch (error) {
            res.status(500).json({ message: 'Gagal mengambil data kelas', error: error.message });
        }
    },

    createKelas: async (req, res) => {
        try {
            const { nama_kelas, wali_kelas } = req.body;
            if (!nama_kelas) {
                return res.status(400).json({ message: 'Nama kelas wajib diisi' });
            }
            const foto = req.file ? req.file.filename : null;
            const insertId = await kelasModel.create({ nama_kelas, wali_kelas, foto });
            res.status(201).json({ message: 'Kelas berhasil ditambahkan', id: insertId });
        } catch (error) {
            res.status(500).json({ message: 'Gagal menambahkan kelas', error: error.message });
        }
    },

    updateKelas: async (req, res) => {
        try {
            const { nama_kelas, wali_kelas } = req.body;
            const foto = req.file ? req.file.filename : null;
            await kelasModel.update(req.params.id, { nama_kelas, wali_kelas, foto });
            res.json({ message: 'Kelas berhasil diupdate' });
        } catch (error) {
            res.status(500).json({ message: 'Gagal mengupdate kelas', error: error.message });
        }
    },

    deleteKelas: async (req, res) => {
        try {
            await kelasModel.remove(req.params.id);
            res.json({ message: 'Kelas berhasil dihapus' });
        } catch (error) {
            res.status(500).json({ message: 'Gagal menghapus kelas', error: error.message });
        }
    }
};

module.exports = kelasController;