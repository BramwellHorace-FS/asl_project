const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// Body parser middleware - allows us to parse the body of the request
router.use(bodyParser.urlencoded({ extended: false }));

// GET /quizzes - returns all quizzes - (INDEX)
router.get('/', (req, res) => {
  res.send('GET /quizzes');
});

// GET /quizzes/:id - returns a single quiz - (SHOW)
router.get('/:id', (req, res) => {
  res.send('GET /quizzes/:id');
});

// POST /quizzes - creates a new quiz - (CREATE)
router.post('/', (req, res) => {
  res.send('POST /quizzes');
});

// POST /quizzes/:id - updates a quiz - (UPDATE)
router.post('/:id', (req, res) => {
  res.send('POST /quizzes/:id');
});

// DELETE /quizzes/:id - deletes a quiz - (DELETE)
router.delete('/:id', (req, res) => {
  res.send('DELETE /quizzes/:id');
});

module.exports = router; // Exports the router object
