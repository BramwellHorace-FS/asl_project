const isAuthenticated = (req, res, next) => {
  if (typeof req.session.access_token !== 'undefined') {
    next();
    return;
  }

  if (typeof req.headers.token !== 'undefined') {
    next();
    return;
  }

  res.send({ error: 'Not authenticated' });
};

module.exports = { isAuthenticated };
