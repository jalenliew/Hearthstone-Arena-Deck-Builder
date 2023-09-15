const express = require('express');
const router = express.Router();
const cardServices = require('../../services/bnetServices/cardServices');

router.get('/single/:idorslug', cardServices.getCard);
router.get('/page', cardServices.getCardPage);

module.exports = router;