const express = require('express');
const { createReport, getMyReports, deleteReport } = require('../controllers/reportController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createReport);
router.get('/mine', protect, getMyReports)
router.delete('/:id', protect, deleteReport)

module.exports = router;