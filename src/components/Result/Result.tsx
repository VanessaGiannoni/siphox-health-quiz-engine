import React from 'react'
import { useQuiz } from '../../contexts/QuizContext'
import question from '../../questions/questions.json'

import './result.scss';

export default function Result() {
  const { state } = useQuiz();
  return (
    <div>
      {
        state.userAnswer === state.question?.correct_answer ?
        <p className='result correct'>
          <strong>
            &#10003; Your answered correctly!
          </strong>
        </p>
        :
        <p className='result incorrect'>
          <strong>&#10005; Too bad. The correct answer was <em>{state.question?.correct_answer}</em></strong>
        </p>
      }
    </div>
  )
}
