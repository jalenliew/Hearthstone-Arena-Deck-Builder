const express = require('express');
const router = express.Router();
const deckServices = require('../../services/bnetServices/deckServices');

router.get('/code', deckServices.getDeckByCode);
router.get('/list', deckServices.getDeckByList);

module.exports = router;