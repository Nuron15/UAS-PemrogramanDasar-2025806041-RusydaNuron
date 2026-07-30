// "Model" adalah lapisan yang isinya query SQL mentah untuk tabel mahasiswa:
// cara ambil, tambah, ubah, dan hapus data langsung ke database.
// Tidak ada logic lain di sini, murni interaksi ke tabel.

const db = require('../config/db');

const mahasiswaModel = {
    getAll: async () => {
        const [rows] = await db.query(`
            SELECT mahasiswa.*, kelas.nama_kelas 
            FROM mahasiswa 
            LEFT JOIN kelas ON mahasiswa.kelas_id = kelas.id
        `);
        return rows;
    },

    getById: async (id) => {
        const [rows] = await db.query('SELECT * FROM mahasiswa WHERE id = ?', [id]);
        return rows[0];
    },

    create: async (data) => {
        const { nim, nama, email, jenis_kelamin, kelas_id, foto } = data;
        const [result] = await db.query(
            'INSERT INTO mahasiswa (nim, nama, email, jenis_kelamin, kelas_id, foto) VALUES (?, ?, ?, ?, ?, ?)',
            [nim, nama, email, jenis_kelamin, kelas_id, foto]
        );
        return result.insertId;
    },

    update: async (id, data) => {
        const { nim, nama, email, jenis_kelamin, kelas_id, foto } = data;
        if (foto) {
            await db.query(
                'UPDATE mahasiswa SET nim = ?, nama = ?, email = ?, jenis_kelamin = ?, kelas_id = ?, foto = ? WHERE id = ?',
                [nim, nama, email, jenis_kelamin, kelas_id, foto, id]
            );
        } else {
            await db.query(
                'UPDATE mahasiswa SET nim = ?, nama = ?, email = ?, jenis_kelamin = ?, kelas_id = ? WHERE id = ?',
                [nim, nama, email, jenis_kelamin, kelas_id, id]
            );
        }
    },

    remove: async (id) => {
        await db.query('DELETE FROM mahasiswa WHERE id = ?', [id]);
    }
};

module.exports = mahasiswaModel;