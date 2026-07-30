// "Controller" adalah lapisan logic — menerima request dari route,
// melakukan validasi dasar, memanggil model, lalu mengembalikan
// response ke pengguna dalam format JSON beserta status code yang sesuai
// (200 sukses, 404 tidak ditemukan, 500 error server).

const mahasiswaModel = require('../models/mahasiswaModel');

const mahasiswaController = {
    getAllMahasiswa: async (req, res) => {
        try {
            const data = await mahasiswaModel.getAll();
            res.json(data);
        } catch (error) {
            res.status(500).json({ message: 'Gagal mengambil data mahasiswa', error: error.message });
        }
    },

    getMahasiswaById: async (req, res) => {
        try {
            const data = await mahasiswaModel.getById(req.params.id);
            if (!data) return res.status(404).json({ message: 'Mahasiswa tidak ditemukan' });
            res.json(data);
        } catch (error) {
            res.status(500).json({ message: 'Gagal mengambil data mahasiswa', error: error.message });
        }
    },

    createMahasiswa: async (req, res) => {
        try {
            const { nim, nama, email, jenis_kelamin, kelas_id } = req.body;
            if (!nim || !nama || !jenis_kelamin) {
                return res.status(400).json({ message: 'NIM, nama, dan jenis kelamin wajib diisi' });
            }
            const foto = req.file ? req.file.filename : null;
            const insertId = await mahasiswaModel.create({ nim, nama, email, jenis_kelamin, kelas_id, foto });
            res.status(201).json({ message: 'Mahasiswa berhasil ditambahkan', id: insertId });
        } catch (error) {
            res.status(500).json({ message: 'Gagal menambahkan mahasiswa', error: error.message });
        }
    },

    updateMahasiswa: async (req, res) => {
        try {
            const { nim, nama, email, jenis_kelamin, kelas_id } = req.body;
            const foto = req.file ? req.file.filename : null;
            await mahasiswaModel.update(req.params.id, { nim, nama, email, jenis_kelamin, kelas_id, foto });
            res.json({ message: 'Mahasiswa berhasil diupdate' });
        } catch (error) {
            res.status(500).json({ message: 'Gagal mengupdate mahasiswa', error: error.message });
        }
    },

    deleteMahasiswa: async (req, res) => {
        try {
            await mahasiswaModel.remove(req.params.id);
            res.json({ message: 'Mahasiswa berhasil dihapus' });
        } catch (error) {
            res.status(500).json({ message: 'Gagal menghapus mahasiswa', error: error.message });
        }
    }
};

module.exports = mahasiswaController;