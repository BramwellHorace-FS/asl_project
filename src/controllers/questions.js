const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// Body parser middleware - allows us to parse the body of the request
router.use(bodyParser.urlencoded({ extended: false }));

// GET /Questions - returns all questions - (INDEX)
router.get('/', (req, res) => {
  res.send('GET /Questions');
});

// GET /Questions/:id - returns a single question - (SHOW)
router.get('/:id', (req, res) => {
  res.send('GET /Questions/:id');
});

// POST /Questions - creates a new question - (CREATE)
router.post('/', (req, res) => {
  res.send('POST /Questions');
});

// POST /Questions/:id - updates a question - (UPDATE)
router.post('/:id', (req, res) => {
  res.send('POST /Questions/:id');
});

// DELETE /Questions/:id - deletes a question - (DELETE)
router.delete('/:id', (req, res) => {
  res.send('DELETE /Questions/:id');
});

module.exports = router; // Exports the router object
