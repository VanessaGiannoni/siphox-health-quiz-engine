import React from 'react'
import { useQuiz } from '../../contexts/QuizContext'
import './result.scss';

export default function Result() {
  const { state } = useQuiz();

  const renderCorrectAnswer = () => {
    if (Array.isArray(state.correctAnswer)) {
      return state.correctAnswer.join(', ')
    }

    return state.correctAnswer;
  }

  return (
    <div>
      {
        state.isCorrect ?
        <p className='result correct'>
          <strong>
            &#10003; Your answered correctly!
          </strong>
        </p>
        :
        <p className='result incorrect'>
          <strong>&#10005; Too bad. The correct answer was: <em>{renderCorrectAnswer()}</em></strong>
        </p>
      }
    </div>
  )
}
