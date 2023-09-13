const express = require('express');
const router = express.Router();
const cards = require('./bnetRoutes/cardRoutes');
const metadata = require('./bnetRoutes/metaRoutes');
const cardbacks = require('./bnetRoutes/cardbackRoutes');
const decks = require('./bnetRoutes/deckRoutes');

router.get('/', () => {

});

router.use('/cards', cards);
router.use('/metadata', metadata);
router.use('/cardbacks', cardbacks);
router.use('/decks', decks);

module.exports = router;