import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('ott'); // default category
  const navigate = useNavigate();

  const categories = [
    { key: 'ott', label: 'OTT', url: 'http://localhost:8080/api/movies/ott?region=US' },
    { key: 'popular', label: 'Popular', url: 'http://localhost:8080/api/movies/popular' },
    { key: 'now_playing', label: 'Now Playing', url: 'http://localhost:8080/api/movies/now_playing' },
  ];

  const fetchMovies = async (categoryKey) => {
    const categoryObj = categories.find(c => c.key === categoryKey);
    if (!categoryObj) return;

    setLoading(true);
    try {
      const res = await axios.get(categoryObj.url);
      setMovies(res.data);
    } catch (err) {
      console.error(`Failed to fetch ${categoryObj.label} movies:`, err);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(category);
  }, [category]);

  return (
    <div style={{ backgroundColor: '#f5f0e1', minHeight: '100vh', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Movies</h1>

      {/* Category Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '30px' }}>
        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() => setCategory(cat.key)}
            style={{
              padding: '10px 20px',
              fontWeight: category === cat.key ? 'bold' : 'normal',
              border: 'none',
              borderRadius: '5px',
              backgroundColor: category === cat.key ? '#e0cda9' : '#fff',
              cursor: 'pointer',
              boxShadow: '0px 2px 5px rgba(0,0,0,0.1)',
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px' }}>
          {movies.map(movie => (
            <div
              key={movie.id}
              style={{
                background: '#fff',
                padding: '10px',
                borderRadius: '10px',
                boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
                cursor: 'pointer'
              }}
              onClick={() => navigate(`/movies/${movie.id}`, { state: { movie } })}
            >
              <img
                src={movie.posterPath || 'https://via.placeholder.com/180x270?text=No+Image'}
                alt={movie.title}
                style={{ width: '100%', borderRadius: '5px' }}
              />
              <h3>{movie.title}</h3>
              <p>Release: {movie.releaseDate || 'N/A'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Movies;
