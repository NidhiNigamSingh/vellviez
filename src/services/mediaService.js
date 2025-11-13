const axios = require('axios');
const https = require('https');

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || '';
const TMDB_REGION = process.env.TMDB_REGION || 'US';

if (!TMDB_API_KEY) {
  console.warn('Warning: TMDB_API_KEY is not set. Movie endpoints will fail until you set it in .env');
}

// ----------------------
// Helper: Map Google Books
// ----------------------
const mapGoogleBook = (item) => {
  const info = item.volumeInfo || {};
  const id = item.id;
  const publishedDate = info.publishedDate || 'Unknown Date';

  return {
    id,
    title: info.title || 'Unknown Title',
    authors: info.authors || ['Unknown Author'],
    publisher: info.publisher || 'Unknown Publisher',
    publishedDate,
    description: info.description || 'No description available',
    infoLink: info.infoLink || '',
    imageUrl:
      info.imageLinks?.thumbnail ||
      `https://books.google.com/books/content?id=${id}&printsec=frontcover&img=1&zoom=1&source=gbs_api` ||
      'https://via.placeholder.com/180x270?text=No+Image',
  };
};

// ----------------------
// Helper: Map TMDB Movies
// ----------------------
const mapTmdbMovie = (movie) => ({
  id: movie.id,
  title: movie.title,
  overview: movie.overview,
  releaseDate: movie.release_date,
  posterPath: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '',
  popularity: movie.popularity,
});

// ----------------------
// Fetch Latest Books
// ----------------------
exports.fetchLatestBooks = async () => {
  try {
    const q = encodeURIComponent('subject:fiction'); // Change query if needed
    const url = `https://www.googleapis.com/books/v1/volumes?q=${q}&orderBy=newest&maxResults=20${
      GOOGLE_API_KEY ? '&key=' + GOOGLE_API_KEY : ''
    }`;

    console.log('Fetching Google Books from URL:', url);

    const agent = new https.Agent({ rejectUnauthorized: false });
    const resp = await axios.get(url, { httpsAgent: agent, timeout: 10000 });

    const items = resp.data.items || [];
    if (!items.length) console.warn('Google Books returned no items');

    // Sort by actual publishedDate (descending)
    const sortedItems = items.sort((a, b) => {
      const dateA = new Date(a.volumeInfo?.publishedDate || 0);
      const dateB = new Date(b.volumeInfo?.publishedDate || 0);
      return dateB - dateA; // newest first
    });

    return sortedItems.map(mapGoogleBook);
  } catch (err) {
    console.error('Google Books fetch failed. Full error details:', err);
    console.error('Response data (if any):', err?.response?.data);
    throw new Error('Google Books API fetch failed. Check logs above.');
  }
};

// ----------------------
// Fetch Now Playing Movies
// ----------------------
exports.fetchNowPlayingMovies = async () => {
  if (!TMDB_API_KEY) throw new Error('TMDB_API_KEY not configured');

  try {
    const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}&region=${TMDB_REGION}&language=en-US&page=1`;
    const agent = new https.Agent({ rejectUnauthorized: false });
    const resp = await axios.get(url, { httpsAgent: agent, timeout: 5000 });

    const results = resp.data.results || [];
    return results.map(mapTmdbMovie);
  } catch (err) {
    console.error('TMDB Now Playing fetch failed. Full error:', err);
    console.error('Response data (if any):', err?.response?.data);
    throw new Error('TMDB Now Playing API fetch failed. Check logs above.');
  }
};

// ----------------------
// Fetch Popular Movies
// ----------------------
exports.fetchPopularMovies = async () => {
  if (!TMDB_API_KEY) throw new Error('TMDB_API_KEY not configured');

  try {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`;
    const agent = new https.Agent({ rejectUnauthorized: false });
    const resp = await axios.get(url, { httpsAgent: agent, timeout: 5000 });

    const results = resp.data.results || [];
    return results.map(mapTmdbMovie);
  } catch (err) {
    console.error('TMDB Popular fetch failed. Full error:', err);
    console.error('Response data (if any):', err?.response?.data);
    throw new Error('TMDB Popular API fetch failed. Check logs above.');
  }
};

// ----------------------
// Fetch OTT Movies
// ----------------------
exports.fetchOttMovies = async (region = 'US') => {
  if (!TMDB_API_KEY) throw new Error('TMDB_API_KEY not configured');

  try {
    // Use TMDB "discover" endpoint with "watch_monetization_types=flatrate" for OTT streaming
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&watch_region=${region}&with_watch_monetization_types=flatrate&page=1`;

    const agent = new https.Agent({ rejectUnauthorized: false });
    const resp = await axios.get(url, { httpsAgent: agent, timeout: 5000 });

    const results = resp.data.results || [];
    return results.map(mapTmdbMovie);
  } catch (err) {
    console.error('TMDB OTT fetch failed. Full error:', err);
    console.error('Response data (if any):', err?.response?.data);
    throw new Error('TMDB OTT API fetch failed. Check logs above.');
  }
};