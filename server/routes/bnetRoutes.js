const express = require('express');
const router = express.Router();
const cards = require('./bnetRoutes/cardRoutes');
const metadata = require('./bnetRoutes/metaRoutes');

router.get('/', () => {

});

router.use('/cards', cards);
router.use('/metadata', metadata);

module.exports = router;