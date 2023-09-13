const express = require('express');
const router = express.Router();
const metaServices = require('../../services/bnetServices/metaServices');

router.get('/:type', metaServices.getMetadataByType);

module.exports = router;