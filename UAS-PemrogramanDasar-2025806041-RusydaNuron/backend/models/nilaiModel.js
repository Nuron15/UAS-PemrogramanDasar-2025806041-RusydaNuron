const db = require('../config/db');

const nilaiModel = {
    getAll: async () => {
        const [rows] = await db.query(`
            SELECT nilai.*, mahasiswa.nama, mahasiswa.nim
            FROM nilai
            LEFT JOIN mahasiswa ON nilai.mahasiswa_id = mahasiswa.id
            ORDER BY nilai.id DESC
        `);
        return rows;
    },

    getById: async (id) => {
        const [rows] = await db.query('SELECT * FROM nilai WHERE id = ?', [id]);
        return rows[0];
    },

    create: async (data) => {
        const { mahasiswa_id, mata_kuliah, nilai_angka } = data;
        const [result] = await db.query(
            'INSERT INTO nilai (mahasiswa_id, mata_kuliah, nilai_angka) VALUES (?, ?, ?)',
            [mahasiswa_id, mata_kuliah, nilai_angka]
        );
        return result.insertId;
    },

    update: async (id, data) => {
        const { mahasiswa_id, mata_kuliah, nilai_angka } = data;
        await db.query(
            'UPDATE nilai SET mahasiswa_id = ?, mata_kuliah = ?, nilai_angka = ? WHERE id = ?',
            [mahasiswa_id, mata_kuliah, nilai_angka, id]
        );
    },

    remove: async (id) => {
        await db.query('DELETE FROM nilai WHERE id = ?', [id]);
    }
};

module.exports = nilaiModel;