const express = require('express');
const router = express.Router();
const request = require('request');
const querystring = require('querystring');
const { LoginToken } = require('../models');

router.get('/login', (req, res) => {
  res.render('auth/login'); // Renders the login page
});

router.get('/callback', async (req, res) => {
  // Gets the callback from the OAuth provider
  const { code } = req.query; // Grabs the code from the query string

  await request(
    {
      url: 'https://github.com/login/oauth/access_token',
      qs: {
        client_id: '51030c86f488a583a663',
        client_secret: 'e99dd169396e49a86bc10f4fc1439d769257f334',
        code,
      },
    },
    async (err, response, body) => {
      const { access_token } = querystring.parse(body); // Parses the body of the response into an object
      req.session.access_token = access_token; // Sets the access_token in the session
      const loginToken = await LoginToken.create({ token: access_token }); // Creates a new login token
      res.redirect(`http://localhost:3001?token=${access_token}`); // Redirects to the frontend
    }
  );
});

// check if token is valid and inside the database
router.get('/token', async (req, res) => {
  const token = await LoginToken.findOne({
    where: { token: req.headers.token }, // Grabs the token from the headers
  });

  if (token) {
    req.session.access_token = req.headers.token; // Sets the access_token in the session
    res.json(token); // Returns the token
  } else {
    res.json({ error: 'Invalid token' }); // Returns an error
  }
});

module.exports = router;
