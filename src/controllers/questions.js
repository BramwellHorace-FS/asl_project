const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { Question, Quiz } = require('../models');
const { isAuthenticated } = require('../middlewares/auth');

// Body parser middleware - allows us to parse the body of the request
router.use(bodyParser.urlencoded({ extended: false }));

// GET /Questions - returns all questions - (INDEX)
router.get('/', isAuthenticated, async (req, res) => {
  const questions = await Question.findAll({
    include: Quiz,
  }); // find all questions in the database

  if (req.headers.accept.indexOf('application/json') > -1) {
    // if the client accepts json
    res.json(questions); // send the questions as json
  } else {
    res.render('question/index', { questions }); // render the index view and pass in the questions
  }
});

// Renders the new question form - (NEW)
router.get('/new', isAuthenticated, async (req, res) => {
  res.render('question/create');
});

// POST /questions - creates a new question - (CREATE)
router.post('/', isAuthenticated, async (req, res) => {
  const { question, quizId } = req.body; // extract the question and quizId from the request body
  const questionObj = await Question.create({ question, quizId }); // create a new question in the database

  if (req.headers.accept.indexOf('application/json') > -1) {
    res.json(questionObj);
  } else {
    res.redirect(`/questions/${questionObj.id}`); // redirect to the show page for the new question
  }
});

// GET /questions/:id - returns a single question - (SHOW)
router.get('/:id', isAuthenticated, async (req, res) => {
  const question = await Question.findByPk(req.params.id, {
    include: Quiz,
  }); // find the question in the database with the id in the url

  if (req.headers.accept.indexOf('application/json') > -1) {
    res.json(question);
  } else {
    res.render('question/show', { question }); // render the show view and pass in the question
  }
});

// GET /questions/:id/edit - renders the edit question form - (EDIT)
router.get('/:id/edit', isAuthenticated, async (req, res) => {
  const question = await Question.findByPk(req.params.id); // find the question in the database with the id in the url
  res.render('question/edit', { question }); // render the edit view and pass in the question
});

// POST /questions/:id - updates a question - (UPDATE)
router.post('/:id', isAuthenticated, async (req, res) => {
  const { question, quizId } = req.body; // extract the question and quizId from the request body
  const { id } = req.params; // extract the id from the request params
  const questionObj = await Question.findByPk(id); // find the question in the database with the id in the url
  const updatedQuestion = await questionObj.update({ question, quizId }); // update the question in the database

  if (req.headers.accept.indexOf('application/json') > -1) {
    res.json(updatedQuestion);
  } else {
    res.redirect(`/questions/${updatedQuestion.id}`); // redirect to the show page for the updated question
  }
});

// DELETE /questions/:id - deletes a question - (DESTROY)
router.get('/:id/delete', isAuthenticated, async (req, res) => {
  const { id } = req.params; // extract the id from the request params
  const question = await Question.findByPk(id); // find the question in the database with the id in the url
  const deletedQuestion = await question.destroy(); // delete the question from the database

  if (req.headers.accept.indexOf('application/json') > -1) {
    res.json({ deletedQuestion });
  } else {
    res.redirect('/questions'); // redirect to the index page
  }
});

module.exports = router; // Exports the router object
