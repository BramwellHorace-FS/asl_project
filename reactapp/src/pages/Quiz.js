import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Quiz = () => {
  const [quiz, setQuiz] = useState(''); // set the quiz to an empty string
  const { id } = useParams(); // extract the id from the url

  useEffect(() => {
    const getQuiz = async () => {
      const response = await fetch(`http://localhost:3000/quizzes/${id}`, {
        // fetch the quiz from the database
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

  if (!quiz) {
    return <div>Loading...</div>;
  }

  const ValidateAnswer = (e) => {
    e.preventDefault();
    
  };

  return (
    <main className="h-screen mb-40">
      <h2 className="mb-8 text-2xl font-medium">{quiz.name}</h2>
      <p className="text-lg mb-8">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi non quis exercitationem culpa nesciunt nihil aut nostrum explicabo
        reprehenderit optio amet ab temporibus asperiores quasi cupiditate.
      </p>
      <form onSubmit={ValidateAnswer} className="Quiz h-full mb-10">
        {quiz &&
          quiz.Questions.map((question, i) => (
            <div key={question.id}>
              <div className="flex items-center justify-start gap-1 my-10">
                {/* <span className="font-medium text-2xl">0{i + 1}.</span> */}
                <h3 className="text-5xl font-medium">{question.question}</h3>
              </div>

              <ul className="">
                {question.Choices.slice(0)
                  .reverse()
                  .map((choice) => (
                    <li className="text-2xl flex items-center justify-start gap-2 mb-2 font-medium strokeText" key={choice.id}>
                      <input className="bg-transparent h-5 w-5 checked:bg-black checked:focus:bg-black active:bg-black focus:outline focus:outline-black" type="radio" name={question.id} value={choice.id} required />
                      {choice.label}
                    </li>
                  ))}
              </ul>
            </div>
          ))}

        <button className="bg-black text-white my-16 py-4 px-14 uppercase text-md font-normal hover:opacity-80 transition-all" type="submit">
          Submit
        </button>
      </form>
    </main>
  );
};

export default Quiz;
