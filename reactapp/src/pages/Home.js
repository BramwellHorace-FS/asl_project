import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [quizzes, setQuizzes] = useState(''); // set the quizzes to an empty string

  useEffect(() => {
    const getQuizzes = async () => {
      const response = await fetch(`http://localhost:3000/quizzes`, {
        // fetch the quizzes from the database
        headers: {
          token: localStorage.token, // set the token in the headers
          accept: 'application/json', // set the accept header to application/json
        },
      });
      const data = await response.json(); // parse the response into json
      setQuizzes(data); // set the quizzes to the data
    };
    getQuizzes();
  }, []);

  return (
    <section className="quizzes">
      <h2 className="text-3xl font-semibold mb-4">All Quizzes</h2>
      <p className="text-lg mb-8">Whether you have a minute or an hour, <br /> you're sure to find a great quiz here to test your brain.</p>
      <ul>
        {quizzes &&
          quizzes.map((quiz, index) => (
            <li className="flex items-center justify-start gap-2 font-medium text-7xl mt-4" key={quiz.id}>
              <span className="text-4xl font-medium">  + </span>
              <Link className="strokeText" to={`/quiz/${quiz.id}`}>{quiz.name}</Link>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default Home;
