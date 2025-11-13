const mediaService = require('../services/mediaService');

exports.getLatestBooks = async (req, res) => {
  try {
    const books = await mediaService.fetchLatestBooks();
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

exports.getNowPlayingMovies = async (req, res) => {
  try {
    const movies = await mediaService.fetchNowPlayingMovies();
    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch now playing movies' });
  }
};

exports.getPopularMovies = async (req, res) => {
  try {
    const movies = await mediaService.fetchPopularMovies();
    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch popular movies' });
  }
};

exports.getOttMovies = async (req, res) => {
  try {
    const region = req.query.region || process.env.TMDB_REGION || 'US';
    const movies = await mediaService.fetchOttMovies(region);
    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch OTT movies' });
  }
};
