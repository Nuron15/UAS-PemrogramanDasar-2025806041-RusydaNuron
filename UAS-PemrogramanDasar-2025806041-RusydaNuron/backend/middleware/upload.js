// Konfigurasi multer untuk menangani upload file foto.
// File disimpan ke folder frontend/uploads dengan nama unik
// (timestamp + nama asli) supaya tidak saling menimpa.

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../frontend/uploads'));
    },
    filename: (req, file, cb) => {
        const uniqueName = Date.now() + '-' + file.originalname.replace(/\s+/g, '_');
        cb(null, uniqueName);
    }
});

// Hanya izinkan file gambar (jpg, jpeg, png, gif)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const isValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    if (isValid) {
        cb(null, true);
    } else {
        cb(new Error('Hanya file gambar (jpg, jpeg, png, gif) yang diizinkan'));
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 } // maksimal 2MB
});

module.exports = upload;