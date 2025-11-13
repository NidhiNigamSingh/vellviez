import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BookDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const book = location.state?.book;

  if (!book) return <p style={{ textAlign: 'center' }}>Book not found</p>;

  const getBookImage = () => {
    return (
      book.imageUrl ||
      `https://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=2&source=gbs_api` ||
      'https://via.placeholder.com/400x600?text=No+Image'
    );
  };

  return (
    <div style={{ backgroundColor: '#f5f0e1', minHeight: '100vh', padding: '20px' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '20px' }}>← Back</button>
      <div
        style={{
          display: 'flex',
          gap: '40px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <img
          src={getBookImage()}
          alt={book.title}
          style={{
            borderRadius: '10px',
            width: '100%',
            maxWidth: '400px',  // increased width
            height: 'auto',
            boxShadow: '0px 4px 12px rgba(0,0,0,0.2)',
          }}
        />
        <div style={{ maxWidth: '700px' }}>
          <h1>{book.title}</h1>
          <p><strong>Author:</strong> {book.authors ? book.authors.join(', ') : 'Unknown'}</p>
          <p><strong>Publisher:</strong> {book.publisher || 'Unknown'}</p>
          <p><strong>Release Date:</strong> {book.publishedDate || 'Unknown'}</p>
          <p><strong>Overview:</strong> {book.description || 'No description available'}</p>
          {book.infoLink && (
            <p>
              <strong>More Info:</strong>{' '}
              <a href={book.infoLink} target="_blank" rel="noopener noreferrer">
                Link
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
