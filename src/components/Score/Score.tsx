import React from 'react'
import { useQuiz } from '../../contexts/QuizContext';
import './score.scss'

function Score() {
  const { state } = useQuiz();

  return (
    <div className='score-container'>
      <div className='score-wrapper'>
        <p>Correct</p>
        <span className='point'>{state.score.correct}</span>
        <span>X</span>
        <span className='point'>{state.score.incorrect}</span>
        <p>Incorrect</p>
      </div>
    </div>
  )
}

export default Score
