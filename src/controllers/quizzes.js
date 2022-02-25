const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { Quiz, Question, Choice } = require('../models');
const { isAuthenticated } = require('../middlewares/auth');

// Body parser middleware - allows us to parse the body of the request
router.use(bodyParser.urlencoded({ extended: false }));

// GET /quizzes - returns all quizzes - (INDEX)
router.get('/', isAuthenticated, async (req, res) => {
  const quizzes = await Quiz.findAll({
    // find all quizzes
    include: [{ model: Question, include: [Choice] }], // include the questions and choices
  });

  if (req.headers.accept.indexOf('application/json') > -1) {
    // if the client accepts json
    res.json(quizzes); // send the quizzes as json
  } else {
    res.render('quiz/index', { quizzes }); // render the index view and pass in the quizzes
  }
});

// Renders the new quiz form - (NEW)
router.get('/new', isAuthenticated, (req, res) => {
  res.render('quiz/create'); // render the create view
});

// GET /quizzes/:id - returns a single quiz - (SHOW)
router.get('/:id', isAuthenticated, async (req, res) => {
  const quiz = await Quiz.findByPk(req.params.id, {
    include: [{ model: Question, include: [Choice] }],
  }); // find the quiz in the database with the id in the url

  if (req.headers.accept.indexOf('application/json') > -1) {
    res.json(quiz);
  } else {
    res.render('quiz/show', { quiz }); // render the show view and pass in the quiz
  }
});

// POST /quizzes - creates a new quiz - (CREATE)
router.post('/', isAuthenticated, async (req, res) => {
  const { name, weight } = req.body; // extract the name and weight from the request body
  const quiz = await Quiz.create({ name, weight }); // create a new quiz in the database

  if (req.headers.accept.indexOf('application/json') > -1) {
    res.json(quiz);
  } else {
    res.redirect(`/quizzes/${quiz.id}`); // redirect to the show page for the new quiz
  }
});

// GET /quizzes/:id/edit - renders the edit quiz form - (EDIT)
router.get('/:id/edit', isAuthenticated, async (req, res) => {
  const quiz = await Quiz.findByPk(req.params.id); // find the quiz in the database with the id in the url
  res.render('quiz/edit', { quiz }); // render the edit view and pass in the quiz
});

// POST /quizzes/:id - updates a quiz - (UPDATE)
router.post('/:id', isAuthenticated, async (req, res) => {
  const { name, weight } = req.body; // extract the name and weight from the request body
  const { id } = req.params; // extract the id from the request params
  const quiz = await Quiz.update({ name, weight }, { where: { id } }); // update the quiz in the database

  if (req.headers.accept.indexOf('application/json') > -1) {
    res.json(quiz);
  } else {
    res.redirect(`/quizzes/${id}`); // redirect to the show page for the updated quiz
  }
});

// GET /quizzes/:id - deletes a quiz - (DELETE)
router.get('/:id/delete', isAuthenticated, async (req, res) => {
  const { id } = req.params; // extract the id from the request params
  const quiz = await Quiz.destroy({ where: { id } }); // delete the quiz in the database

  if (req.headers.accept.indexOf('application/json') > -1) {
    res.json({ deleted: quiz });
  } else {
    res.redirect('/quizzes'); // redirect the client to the quizzes index page
  }
});

module.exports = router; // Exports the router object
