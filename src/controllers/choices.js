const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// Body parser middleware - allows us to parse the body of the request
router.use(bodyParser.urlencoded({ extended: false }));

// GET /Choices - returns all choices - (INDEX)
router.get('/', (req, res) => {
  res.send('GET /Choices');
});

// GET /Choices/:id - returns a single choice - (SHOW)
router.get('/:id', (req, res) => {
  res.send('GET /Choices/:id');
});

// POST /Choices - creates a new choice - (CREATE)
router.post('/', (req, res) => {
  res.send('POST /Choices');
});

// POST /Choices/:id - updates a choice - (UPDATE)
router.post('/:id', (req, res) => {
  res.send('POST /Choices/:id');
});

// DELETE /Choices/:id - deletes a choice - (DELETE)
router.delete('/:id', (req, res) => {
  res.send('DELETE /Choices/:id');
});

module.exports = router; // Exports the router object
