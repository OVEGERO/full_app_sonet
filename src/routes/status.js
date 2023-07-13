const express = require('express');
const { getOnusStatuses } = require('../controllers/status.js')
const router = express.Router();

router.get('/', getOnusStatuses);

module.exports = router;