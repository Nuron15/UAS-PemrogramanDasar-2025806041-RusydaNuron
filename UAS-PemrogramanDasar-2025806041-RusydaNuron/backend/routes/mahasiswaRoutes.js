// "Route" mendefinisikan alamat URL API, lalu mengarahkannya ke
// fungsi controller yang sesuai. File ini yang membuat endpoint
// seperti GET /api/mahasiswa benar-benar bisa diakses.

const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const mahasiswaController = require('../controllers/mahasiswaController');

router.get('/', mahasiswaController.getAllMahasiswa);
router.get('/:id', mahasiswaController.getMahasiswaById);
router.post('/', upload.single('foto'), mahasiswaController.createMahasiswa);
router.put('/:id', upload.single('foto'), mahasiswaController.updateMahasiswa);
router.delete('/:id', mahasiswaController.deleteMahasiswa);

module.exports = router;