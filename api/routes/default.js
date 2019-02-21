const express = require('express');
const router = express.Router();

const defaultController = require('../controllers/default');

router.get('/', defaultController.home);

module.exports = router;