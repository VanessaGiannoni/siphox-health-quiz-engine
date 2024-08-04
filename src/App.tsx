import React, { useEffect } from 'react';
import Score from './components/Score/Score';
import Game from './components/Game';
import { useQuiz, Question, QuestionResponse} from './contexts/QuizContext';

import './App.scss';
import Loader from './components/Loader/Loader';

function App() {
  const { state, dispatch } = useQuiz();

  async function fetchQuestion() {
    try {
      dispatch({ type: "setStatus", payload: "fetching" });
      dispatch({ type: "setUserAnswer", payload: '' });
      const response = await fetch('https://opentdb.com/api.php?amount=1&category=18');
      let data: QuestionResponse = await(response.json());
      console.log(data)
      if (data.response_code === 0) {
        let question: Question = data.results[0];

        let randomIndex = Math.round(Math.random() * question.incorrect_answers.length);
        question.incorrect_answers.splice(randomIndex, 0, question.correct_answer);

        dispatch({ type: "setStatus", payload: "ready" });
        dispatch({type: "setQuestion", payload: question});
      } else {
        dispatch({ type: "setStatus", payload: "error" });
      }
    } catch (err) {
      dispatch({ type: "setStatus", payload: "error" });
      throw new Error(`Error: ${err}`)
    }
  }

  useEffect(() => {
    if(state.gameStatus === 'idle') {
      fetchQuestion();
    }
  }, [state.gameStatus]);

  return (
    <main className="App">
      {state.gameStatus === "fetching" ?
          <Loader /> : state.gameStatus === "error" ? 
          <p>Error...</p> :
          <>
            <Score />
            <Game />
          </> 
      }
    </main>
  );
}

export default App;
