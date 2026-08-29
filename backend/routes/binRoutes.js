const express = require('express');
const { createBin, getBins, updateBin, deleteBin } = require('../controllers/binController');
const { protect, requireRole } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', protect, getBins);
router.post('/', protect, requireRole('Coordinator'), createBin);
router.put('/:id', protect, requireRole('Coordinator'), updateBin);
router.delete('/:id', protect, requireRole('Coordinator'), deleteBin);

module.exports = router;