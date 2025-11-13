import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const MovieDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const movie = location.state?.movie;

  if (!movie) return <p style={{textAlign: 'center'}}>Movie not found</p>;

  return (
    <div style={{backgroundColor: '#f5f0e1', minHeight: '100vh', padding: '20px'}}>
      <button onClick={() => navigate(-1)} style={{marginBottom: '20px'}}>← Back</button>
      <div style={{display: 'flex', gap: '20px', flexWrap: 'wrap'}}>
        <img
          src={movie.posterPath || 'https://via.placeholder.com/300x450?text=No+Image'}
          alt={movie.title}
          style={{borderRadius: '10px', maxWidth: '300px'}}
        />
        <div style={{maxWidth: '600px'}}>
          <h1>{movie.title}</h1>
          <p><strong>Release Date:</strong> {movie.releaseDate}</p>
          <p><strong>Popularity:</strong> {movie.popularity}</p>
          <p><strong>Overview:</strong> {movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
