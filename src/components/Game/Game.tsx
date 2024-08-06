import { useQuiz } from '../../contexts/QuizContext';
import Result from '../Result/Result';
import Button from '../Button/Button';
import TextInput from '../TextInput/TextInput';
import CustomSelect from '../CustomSelect/CustomSelect';
import CheckboxGroup from '../CheckboxGroup/CheckboxGroup';
import FinishQuiz from '../FinishQuiz/FinishQuiz';

import  { isSelectionCorrect }  from '../../utils/IsSelectionCorrect';

import './game.scss';


function Game() {
  const { state, dispatch } = useQuiz();  
  const wonAudio = new Audio('./sounds/won.wav');
  const lostAudio = new Audio('./sounds/lost.wav');

  const handleCheckboxChange = (newCheckedOptions: string[]) => {
    dispatch({ type: "setUserAnswer", payload: newCheckedOptions });
  };
  
  const handleCheckAnswer = (answer: string) => {
    dispatch({ type: "setUserAnswer", payload: answer });
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const answer = e.target.value
    dispatch({ type: "setUserAnswer", payload: answer });
  };

  const handleSubmit = () => {
    dispatch({ type: "setStatus", payload: "answered" });

    const correctAnswers = state.question?.correct_answer;
    const userAnswers = state.userAnswer;

    if (!userAnswers || !correctAnswers) {
      return dispatch({ type: "setScore", payload: "incorrect" });
    }

    const { isCorrect, userAnswer, correctAnswer } = isSelectionCorrect(userAnswers, correctAnswers);

    dispatch({ type: "setIsCorrect", payload: isCorrect })
    dispatch({ type: "setUserAnswer", payload: userAnswer });
    dispatch({ type: "setCorrectAnswer", payload: correctAnswer });

    if (isCorrect) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      wonAudio.play();
    } else {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      lostAudio.play();
    }

    dispatch({ type: "setScore", payload: isCorrect ? "correct" : "incorrect" });
  };


  const handleNextQuestion = () => {
    dispatch({ type: "setStatus", payload: "idle" })
    dispatch({ type: "setCurrentQuestion", payload: state.currentQuestion })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  }

  const RenderQuizInput = (type: string | undefined) => {
   switch (type) {
    case 'input':
      return <TextInput onChange={handleInputChange} onKeyDown={handleKeyDown}/>
    case 'multiple':
      return <CheckboxGroup options={state.question?.options} onChange={handleCheckboxChange} />
    case 'one-choice':
     return  <CustomSelect
        options={state.question?.options as string[]}
        onChange={(e) => handleCheckAnswer(e.target.value)}
      />
    default:
      return <FinishQuiz />;
   }
  }

  return (
    <div className='game-container'>
      <h1 className='game-title'> SiPhox Health Quiz Engine </h1>
      <div className='game-question-wrapper'>
        <h2 className='game-question'>
          <strong>Question:</strong> {state.question?.question}
        </h2>
        <p className='game-question-difficulty'>
          <strong>Difficulty: {state.question?.difficulty} </strong>
        </p>
      </div>
     

      {RenderQuizInput(state.question?.type)}
      
      
      {
        state.userAnswer && state.gameStatus !== "answered" &&
        <Button label='Submit' onClick={handleSubmit} type='submit' />
      }
      {
        state.gameStatus === "answered" &&
        <>
          <Result />
          <Button label='Next Question' onClick={handleNextQuestion} type='button' />
        </>
      }
    </div>
  )
}

export default Game
