// Model untuk tabel kelas — sama fungsinya seperti mahasiswaModel.js,
// tapi khusus query untuk data kelas.

const db = require('../config/db');

const kelasModel = {
    getAll: async () => {
        const [rows] = await db.query('SELECT * FROM kelas');
        return rows;
    },

    getById: async (id) => {
        const [rows] = await db.query('SELECT * FROM kelas WHERE id = ?', [id]);
        return rows[0];
    },

    create: async (data) => {
        const { nama_kelas, wali_kelas, foto } = data;
        const [result] = await db.query(
            'INSERT INTO kelas (nama_kelas, wali_kelas, foto) VALUES (?, ?, ?)',
            [nama_kelas, wali_kelas, foto]
        );
        return result.insertId;
    },

    update: async (id, data) => {
        const { nama_kelas, wali_kelas, foto } = data;
        if (foto) {
            await db.query(
                'UPDATE kelas SET nama_kelas = ?, wali_kelas = ?, foto = ? WHERE id = ?',
                [nama_kelas, wali_kelas, foto, id]
            );
        } else {
            await db.query(
                'UPDATE kelas SET nama_kelas = ?, wali_kelas = ? WHERE id = ?',
                [nama_kelas, wali_kelas, id]
            );
        }
    },

    remove: async (id) => {
        await db.query('DELETE FROM kelas WHERE id = ?', [id]);
    }
};

module.exports = kelasModel;