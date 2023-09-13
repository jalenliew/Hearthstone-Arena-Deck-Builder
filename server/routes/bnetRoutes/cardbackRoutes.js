const express = require('express');
const router = express.Router();
const cardbackServices = require('../../services/bnetServices/cardbackServices');

router.get('/single', cardbackServices.getCardback);
router.get('/page', cardbackServices.getCardbackPage);

module.exports = router;