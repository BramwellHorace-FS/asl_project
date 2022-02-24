const express = require('express'); // Express web server framework - grabs the express module from node_modules
const session = require('express-session'); // Express session - grabs the express-session module from node_modules
const app = express(); // Creates an instance of express
const quizzesCtrl = require('./src/controllers/quizzes'); // Grabs the quizzes controller
const questionsCtrl = require('./src/controllers/questions'); // Grabs the questions controller
const choicesCtrl = require('./src/controllers/choices'); // Grabs the choices controller
const authCtrl = require('./src/controllers/auth'); // Grabs the auth controller

app.use(
  session({ // Sets up the express-session middleware
    saveUninitialized: false, // Don't create session until something stored
    secret: 'secret', // Secret used to sign the session ID cookie
    cookie: { maxAge: 60000 }, // Sets the cookie to expire in 1 minute
  })
);

app.set('views', __dirname + '/src/views'); // Sets the views directory
app.set('view engine', 'twig'); // Sets the view engine to twig

// GET / HTTP/1.1 - GET is the default method for a request
// The req is the request object and the res is the response object
app.get('/', (req, res) => {
  res.render('home/home');
});

app.use('/quizzes', quizzesCtrl); // Uses the quizzes controller
app.use('/questions', questionsCtrl); // Uses the questions controller
app.use('/choices', choicesCtrl); // Uses the choices controller
app.use('/auth', authCtrl); // Uses the auth controller

// Listen for requests on port 3000 and log to the console
app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
