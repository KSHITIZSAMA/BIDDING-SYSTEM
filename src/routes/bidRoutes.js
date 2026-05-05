const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const { placeBid } = require('../controllers/bidController');

router.post('/place', placeBid); // ✅ correct
router.post('/place', authMiddleware, placeBid);

module.exports = router;