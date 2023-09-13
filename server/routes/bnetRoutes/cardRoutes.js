const express = require('express');
const router = express.Router();
const cardServices = require('../../services/bnetServices/cardServices');

router.get('/single', cardServices.getCard);
router.get('/page', cardServices.getCardByPage);

module.exports = router;