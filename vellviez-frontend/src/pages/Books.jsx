import React, { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import { useNavigate } from 'react-router-dom';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8080/api/books/latest')  // your backend endpoint
      .then(res => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const getBookImage = (book) => {
    return book.imageUrl 
      || `https://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`
      || 'https://via.placeholder.com/180x270?text=No+Image';
  };

  return (
    <div style={{backgroundColor: '#f5f0e1', minHeight: '100vh', padding: '20px'}}>
      <h1 style={{textAlign: 'center', marginBottom: '30px'}}>Books</h1>
      {loading ? <LoadingSpinner /> : (
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '20px'}}>
          {books.map(book => (
            <div
              key={book.id}
              style={{
                background: '#fff',
                padding: '10px',
                borderRadius: '10px',
                boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
                cursor: 'pointer'
              }}
              onClick={() => navigate(`/books/${book.id}`, { state: { book } })}
            >
              <img
                src={getBookImage(book)}
                alt={book.title}
                style={{width: '100%', borderRadius: '5px'}}
              />
              <h3>{book.title}</h3>
              <p>{book.authors ? book.authors.join(', ') : 'Unknown'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Books;
