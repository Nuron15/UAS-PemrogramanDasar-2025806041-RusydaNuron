const express = require('express');
const router = express.Router();
const nilaiController = require('../controllers/nilaiController');

router.get('/', nilaiController.getAllNilai);
router.get('/:id', nilaiController.getNilaiById);
router.post('/', nilaiController.createNilai);
router.put('/:id', nilaiController.updateNilai);
router.delete('/:id', nilaiController.deleteNilai);

module.exports = router;