const express = require('express');
const { getStatuses } = require('../controllers/status.js')
const router = express.Router();

router.get('/', getStatuses);

module.exports = router;