import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Quiz = () => {
  const [quiz, setQuiz] = useState(''); // set the quiz to an empty string
  const { id } = useParams(); // extract the id from the url

  useEffect(() => {
    const getQuiz = async () => { 
      const response = await fetch(`http://localhost:3000/quizzes/${id}`, { // fetch the quiz from the database
        headers: { 
          token: localStorage.token, // set the token in the headers
          accept: 'application/json', // set the accept header to application/json
        },
      });
      const data = await response.json(); // parse the response into json
      setQuiz(data); // set the quiz to the data
    };
    getQuiz();
  }, []);

  return (
    <form className="Quiz">
      <h2>{quiz.name}</h2> 
      {quiz && // if the quiz is not empty
        quiz.Questions.map((question) => ( // map through the questions
          <div key={question.id}> // render the question
            {question.question} 
            <ul> // render the choices
              {question.Choices.map((choice) => ( // map through the choices
                <li key={choice.id}> 
                  <input type="radio" name={question.id} value={choice.id} required /> 
                  {choice.label}
                </li>
              ))}
            </ul>
          </div>
        ))}

      <button type="submit">Submit</button>
    </form>
  );
};

export default Quiz;
