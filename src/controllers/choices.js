const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { Choice } = require('../models');

// Body parser middleware - allows us to parse the body of the request
router.use(bodyParser.urlencoded({ extended: false }));

// GET /Choices - returns all choices - (INDEX)
router.get('/', async (req, res) => {
  const choices = await Choice.findAll(); // find all choices in the database
  res.json(choices); // send the choices to the client in JSON format
});

// GET /Choices/:id - returns a single choice - (SHOW)
router.get('/:id', async (req, res) => {
  const choice = await Choice.findByPk(req.params.id); // find the choice in the database with the id in the url
  res.json(choice); // send the choice to the client in JSON format
});

// POST /Choices - creates a new choice - (CREATE)
router.post('/', async (req, res) => {
  const { label, questionId } = req.body; // extract the label and questionId from the request body
  const choice = await Choice.create({ label, questionId }); // create a new choice in the database
  res.json(choice); // send the choice just created to the client in JSON format
});

// POST /Choices/:id - updates a choice - (UPDATE)
router.post('/:id', (req, res) => {
  const { label, questionId } = req.body; // extract the label and questionId from the request body
  const { id } = req.params; // extract the id from the request params
  Choice.update({ label, questionId }, { where: { id } }); // update the choice in the database
  res.json(choice); // send the choice to the client in JSON format
});

// DELETE /Choices/:id - deletes a choice - (DELETE)
router.delete('/:id', (req, res) => {
  const { id } = req.params; // extract the id from the request params
  Choice.destroy({ where: { id } }); // delete the choice in the database
  res.redirect('/choices'); // redirect the client to the choices index page
});

module.exports = router; // Exports the router object
