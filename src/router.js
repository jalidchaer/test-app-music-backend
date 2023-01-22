const express = require('express');
const router = express.Router();
const songController = require('./controllers/songController');

router
    .get('/search-track/:term', songController.getData)
    .post('/favorites', songController.saveFavorites)

module.exports = router;