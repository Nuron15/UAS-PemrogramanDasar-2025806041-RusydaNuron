// Route untuk endpoint kelas — sama fungsinya seperti mahasiswaRoutes.js,
// mengarahkan URL /api/kelas ke fungsi controller kelas.

const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const kelasController = require('../controllers/kelasController');

router.get('/', kelasController.getAllKelas);
router.get('/:id', kelasController.getKelasById);
router.post('/', upload.single('foto'), kelasController.createKelas);
router.put('/:id', upload.single('foto'), kelasController.updateKelas);
router.delete('/:id', kelasController.deleteKelas);

module.exports = router;