const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { Quiz } = require('../models');

// Body parser middleware - allows us to parse the body of the request
router.use(bodyParser.urlencoded({ extended: false }));

// GET /quizzes - returns all quizzes - (INDEX)
router.get('/', async (req, res) => {
  const quizzes = await Quiz.findAll(); // find all quizzes in the database
  res.json(quizzes); // send the quizzes to the client in JSON format
});

// GET /quizzes/:id - returns a single quiz - (SHOW)
router.get('/:id', async (req, res) => {
  const quiz = await Quiz.findByPk(req.params.id); // find the quiz in the database with the id in the url
  res.json(quiz); // send the quiz to the client in JSON format
});

// POST /quizzes - creates a new quiz - (CREATE)
router.post('/', async (req, res) => {
  const { name, weight } = req.body; // extract the name and weight from the request body
  const quiz = await Quiz.create({ name, weight }); // create a new quiz in the database
  res.json(quiz); // send the quiz just created to the client in JSON format
});

// POST /quizzes/:id - updates a quiz - (UPDATE)
router.post('/:id', async (req, res) => {
  const { name, weight } = req.body; // extract the name and weight from the request body
  const { id } = req.params; // extract the id from the request params
  const quiz = await Quiz.update({ name, weight }, { where: { id } }); // update the quiz in the database
  res.json(quiz); // send the quiz to the client in JSON format
});

// DELETE /quizzes/:id - deletes a quiz - (DELETE)
router.delete('/:id', async (req, res) => {
  const { id } = req.params; // extract the id from the request params
  const quiz = await Quiz.destroy({ where: { id } }); // delete the quiz in the database
  res.redirect('/quizzes'); // redirect the client to the quizzes index page
});

module.exports = router; // Exports the router object
