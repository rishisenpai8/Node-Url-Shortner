const express = require('express');
const {handleGenrateNewShortURL, handleGetAnlytics} = require('../controllers/url')

const router = express.Router();

router.post('/', handleGenrateNewShortURL);

router.get('/analytics/:shortId',handleGetAnlytics)

module.exports = router