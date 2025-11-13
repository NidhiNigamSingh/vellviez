const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaController');

router.get('/books/latest', mediaController.getLatestBooks);
router.get('/movies/now_playing', mediaController.getNowPlayingMovies);
router.get('/movies/popular', mediaController.getPopularMovies);
router.get('/movies/ott', mediaController.getOttMovies); // optional: ?region=US

module.exports = router;
