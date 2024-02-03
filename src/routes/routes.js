const express = require('express');
const prompController = require('../controllers/prompController');
const router = express.Router();

router.post('/api/promt', prompController.sendText);

module.exports = router;