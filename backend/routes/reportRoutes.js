const express = require('express');
const { createReport, getMyReports, deleteReport, getAllReports } = require('../controllers/reportController');
const { protect, requireRole } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createReport);
router.get('/mine', protect, getMyReports)
router.get('/', protect, requireRole('Coordinator'), getAllReports);
router.delete('/:id', protect, deleteReport)

module.exports = router;