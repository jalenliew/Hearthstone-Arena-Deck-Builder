const express = require('express');
const router = express.Router();
const cards = require('./bnetRoutes/cardRoutes');

router.get('/', () => {

});

router.use('/cards', cards);

module.exports = router;