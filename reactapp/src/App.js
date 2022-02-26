import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Login from './pages/Login';
import Navigation from './components/Navigation';

import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import queryString from 'querystring';

const App = () => {
  const [jwt, setJwt] = useState(''); // set the jwt to an empty string

  useEffect(() => {
    const getJWT = async () => {
      const token = queryString.parse(window.location.search.slice(1)).token; // extract the token from the url
      localStorage.token = token; // set the token in the local storage

      const response = await fetch('http://localhost:3000/auth/token', {
        // validate the token in the database and return the jwt if valid
        headers: {
          token: localStorage.token, // set the token in the headers
        },
      });
      const data = await response.json(); // parse the response into json
      setJwt(data.token); // set the jwt to the data
    };
    getJWT();
  }, []);

  if (!jwt) {
    return <Login />;
  }

  return (
    <BrowserRouter>
      <div className="App mx-auto max-w-3xl my-20">
        <Navigation loggedIn={jwt ? true : false} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz/:id" element={<Quiz />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
