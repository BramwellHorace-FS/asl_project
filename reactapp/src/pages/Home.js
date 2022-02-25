import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [quizzes, setQuizzes] = useState(''); // set the quizzes to an empty string

  useEffect(() => {
    const getQuizzes = async () => {
      const response = await fetch(`http://localhost:3000/quizzes`, { // fetch the quizzes from the database
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
      <h2>Quizzes</h2>
      <ul>
        {quizzes && quizzes.map((quiz) => ( // map through the quizzes
          <li key={quiz.id}>
            <Link to={`/quiz/${quiz.id}`}>{quiz.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Home;
