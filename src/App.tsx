import { useCallback, useEffect } from 'react';
import Score from './components/Score/Score';
import Game from './components/Game/Game';
import { useQuiz, Question} from './contexts/QuizContext';
import questions from './questions/questions.json'
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import shuffleArray from './utils/ShuffleArray';
import ProgressBar from './components/ProgressBar/ProgressBar';

import './App.scss';

function App() {
  const { state, dispatch } = useQuiz();
  const totalQuestions = questions.results.length | 0;

  const fetchQuestion = useCallback(
    (questionIndex: number) => {
      try {
        dispatch({ type: "setStatus", payload: "fetching" });
        dispatch({ type: "setUserAnswer", payload: null });

        const data = questions;  
        const question = data.results[questionIndex] as Question;

        if (question.type === "one-choice" || question.type === 'multiple') {
          question.options = shuffleArray(question.options);
        } else {
          question.options = Array.isArray(question.correct_answer) ? question.correct_answer : [question.correct_answer];
        }

        dispatch({ type: "setStatus", payload: "ready" });
        dispatch({ type: "setQuestion", payload: question });
      } catch (err) {
        dispatch({ type: "setStatus", payload: "error" });
        throw err;
      }
    },
    [dispatch]
  );

  useEffect(() => {
    if (
      state.gameStatus === 'idle' &&
      state.currentQuestion !== undefined
    ) {
      fetchQuestion(state.currentQuestion);
    } 
  }, [state.currentQuestion, state.gameStatus, fetchQuestion]);

  return (
    <main className="App">
      {state.gameStatus === "fetching" ?
          <Loader /> : state.gameStatus === "error" ? 
          <ErrorMessage description='Something went wrong...' /> :
          <>
            <Score />
            <ProgressBar total={totalQuestions} current={state.currentQuestion} />
            <Game />
          </> 
      }
    </main>
  );
}

export default App;
