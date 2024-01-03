import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import WikipediaSearch from '../Search/Search.js';
import LoginButton from '../Main/Main';
import './App.css';
import { useAuth0 } from '@auth0/auth0-react';

function App() {
  
  const { isAuthenticated } = useAuth0();


  return (
    <div className="App">
      <header className="App-header">
        <h1 className='header-text'>H8rAid!</h1>
        {isAuthenticated ? (
          <button className='login-button'>Logout</button>
        ) : (
          <LoginButton />
        )}
      </header>
      <Routes>
        <Route path='/' element={<WikipediaSearch />} />
        <Route path='/main' element={<Navigate to='/' />} />
        <Route path="article/:id" element={<WikipediaSearch />} />
      </Routes>
    </div>
  );
}

export default App;
