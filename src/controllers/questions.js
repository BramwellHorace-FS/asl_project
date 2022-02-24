const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { Question } = require('../models');

// Body parser middleware - allows us to parse the body of the request
router.use(bodyParser.urlencoded({ extended: false }));

// GET /Questions - returns all questions - (INDEX)
router.get('/', async (req, res) => {
  const questions = await Question.findAll(); // find all questions in the database
  res.json(questions); // send the questions to the client in JSON format
});

// GET /Questions/:id - returns a single question - (SHOW)
router.get('/:id', async (req, res) => {
  const question = await Question.findByPk(req.params.id); // find the question in the database with the id in the url
  res.json(question); // send the question to the client in JSON format
});

// POST /Questions - creates a new question - (CREATE)
router.post('/', async (req, res) => {
  const { question, quizId } = req.body; // extract the question, answer and quizId from the request body
  const question = await Question.create({ question, quizId }); // create a new question in the database
  res.json(question); // send the question just created to the client in JSON format
});

// POST /Questions/:id - updates a question - (UPDATE)
router.post('/:id', async (req, res) => {
  const { question, quizId } = req.body; // extract the question, answer and quizId from the request body
  const { id } = req.params; // extract the id from the request params
  const question = await Question.update({ question, quizId }, { where: { id } }); // update the question in the database
  res.json(question); // send the question to the client in JSON format
});

// DELETE /Questions/:id - deletes a question - (DELETE)
router.delete('/:id', async (req, res) => {
  const { id } = req.params; // extract the id from the request params
  const question = await Question.destroy({ where: { id } }); // delete the question in the database
  res.redirect('/questions'); // redirect the client to the questions index page
});

module.exports = router; // Exports the router object
