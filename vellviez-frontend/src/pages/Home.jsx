import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '/vellviez-logo.png';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{backgroundColor: '#f5f0e1', minHeight: '100vh', textAlign: 'center', paddingTop: '100px'}}>
      <img src={logo} alt="Vellviez Logo" style={{height: '80px', marginBottom: '30px'}} />
      <h1>Welcome to Vellviez</h1>
      <div style={{marginTop: '50px'}}>
        <button
          onClick={() => navigate('/books')}
          style={{margin: '20px', padding: '20px 40px', fontSize: '20px', borderRadius: '10px', cursor: 'pointer'}}
        >
          Books
        </button>
        <button
          onClick={() => navigate('/movies')}
          style={{margin: '20px', padding: '20px 40px', fontSize: '20px', borderRadius: '10px', cursor: 'pointer'}}
        >
          Movies
        </button>
      </div>
    </div>
  );
};

export default Home;
