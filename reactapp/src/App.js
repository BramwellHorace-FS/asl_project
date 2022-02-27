import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Login from './pages/Login';
import Navigation from './components/Navigation';

import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import queryString from 'querystring';

const App = () => {
  const [jwt, setJwt] = useState('');

  useEffect(() => {
    const getJWT = async () => {
      // extract the token from the url
      const token = queryString.parse(window.location.search.slice(1)).token;

      // Save the token in the local storage
      localStorage.token = token;

      // validate the token in the database and return the jwt if valid
      const response = await fetch('http://localhost:3000/auth/token', {
        // set the token in the headers
        headers: {
          token: localStorage.token,
        },
      });

      // parse the response into json
      const data = await response.json();

      // set the jwt in the state
      setJwt(data.token);
    };
    getJWT();
  }, []);

  // if the jwt is empty, render the login page
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
