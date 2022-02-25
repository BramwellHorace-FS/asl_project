import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Login from './pages/Login';
import Navigation from './components/Navigation';

import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import queryString from 'querystring';

function App() {
  const [jwt, setJwt] = useState('');

  useEffect(() => {
    const getJWT = async () => {
      const token = queryString.parse(window.location.search.slice(1)).token;
      localStorage.token = token;

      const response = await fetch('http://localhost:3000/auth/token', {
        headers: {
          token: localStorage.token,
        },
      });
      const data = await response.json();
      setJwt(data.token);
    };
    getJWT();
  }, []);

  if (!jwt) {
    return <Login />;
  }

  return (
    <BrowserRouter>
      <Navigation loggedIn={jwt ? true : false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz/:id" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
