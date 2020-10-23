const express = require('express');
const authRoute = require('./auth.route');
const docsRoute = require('./docs.route');
const dataRoute = require('./data.route');

const router = express.Router();

router.use('/auth', authRoute);
router.use('/data', dataRoute);
router.use('/docs', docsRoute);

module.exports = router;
