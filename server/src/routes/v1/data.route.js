const express = require('express');
const dataController = require('../../controllers/data.controller');
const auth = require('../../middlewares/auth');
const router = express.Router();

router.get('/stats', auth('stats'), dataController.getStatistics);

module.exports = router;
