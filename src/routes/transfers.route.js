const express = require('express');

const transferController = require('./../controllers/transfer.controllers');

const router = express.Router();

router.post('/', transferController.transfer);

module.exports = router;
