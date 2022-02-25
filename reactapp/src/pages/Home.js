import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [quizzes, setQuizzes] = useState('');

  useEffect(() => {
    const getQuizzes = async () => {
      const response = await fetch(`http://localhost:3000/quizzes`, {
        headers: {
          token: localStorage.token,
          accept: 'application/json',
        },
      });
      const data = await response.json();
      setQuizzes(data);
    };
    getQuizzes();
  }, []);

  return (
    <section className="quizzes">
      <h2>Quizzes</h2>
      <ul>
        {quizzes && quizzes.map((quiz) => (
          <li key={quiz.id}>
            <Link to={`/quiz/${quiz.id}`}>{quiz.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Home;
