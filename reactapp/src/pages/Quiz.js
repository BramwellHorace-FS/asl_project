import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Quiz = () => {
  const [quiz, setQuiz] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const getQuiz = async () => {
      const response = await fetch(`http://localhost:3000/quizzes/${id}`, {
        headers: {
          token: localStorage.token,
          accept: 'application/json',
        },
      });
      const data = await response.json();
      setQuiz(data);
    };
    getQuiz();
    console.log(quiz);
  }, []);

  return (
    <form className="Quiz">
      <h2>{quiz.name}</h2>
    </form>
  );
};

export default Quiz;
