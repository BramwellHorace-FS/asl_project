const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { Choice, Question } = require('../models');
const { isAuthenticated } = require('../middlewares/auth');

// Body parser middleware - allows us to parse the body of the request
router.use(bodyParser.urlencoded({ extended: false }));

// GET /Choices - returns all choices - (INDEX)
router.get('/', isAuthenticated, async (req, res) => {
  const choices = await Choice.findAll({
    include: Question,
  }); // find all choices in the database

  if (req.headers.accept.indexOf('application/json') > -1) {
    res.json(choices);
  } else {
    res.render('choice/index', { choices });
  }
});

// Renders the new choice form - (NEW)
router.get('/new', isAuthenticated, (req, res) => {
  res.render('choice/create');
});

// POST /Choices - creates a new choice - (CREATE)
router.post('/', isAuthenticated, async (req, res) => {
  const { label, questionId } = req.body;
  const choice = await Choice.create({ label, questionId });

  if (req.headers.accept.indexOf('application/json') > -1) {
    res.json(choice);
  } else {
    res.redirect(`/choices/${choice.id}`);
  }
});

// GET /Choices/:id - returns a single choice - (SHOW)
router.get('/:id', isAuthenticated, async (req, res) => {
  const choice = await Choice.findByPk(req.params.id, {
    include: Question,
  });

  if (req.headers.accept.indexOf('application/json') > -1) {
    res.json(choice);
  } else {
    res.render('choice/show', { choice });
  }
});

// GET /Choices/:id/edit - renders the edit choice form - (EDIT)
router.get('/:id/edit', isAuthenticated, async (req, res) => {
  const choice = await Choice.findByPk(req.params.id);
  res.render('choice/edit', { choice });
});

// POST /Choices/:id - updates a choice - (UPDATE)
router.post('/:id', isAuthenticated, async (req, res) => {
  const { label, questionId } = req.body;
  const { id } = req.params;
  const choice = await Choice.findByPk(id);
  await choice.update({ label, questionId });

  if (req.headers.accept.indexOf('application/json') > -1) {
    res.json(choice);
  } else {
    res.redirect(`/choices/${choice.id}`);
  }
});

// DELETE /Choices/:id - deletes a choice - (DESTROY)
router.delete('/:id', isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const choice = await Choice.findByPk(id);
  const deletedChoice = await choice.destroy();

  if (req.headers.accept.indexOf('application/json') > -1) {
    res.json(deletedChoice);
  } else {
    res.redirect('/choices');
  }
});

module.exports = router; // Exports the router object
