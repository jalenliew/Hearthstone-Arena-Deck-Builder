const express = require('express');
const router = express.Router();
const cardServices = require('../../services/bnetServices/cardServices');

router.get('/', cardServices.getCard);

module.exports = router;