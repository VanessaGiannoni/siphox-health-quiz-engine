import React from 'react'
import { useQuiz } from '../../contexts/QuizContext';

function Score() {
  const { state } = useQuiz();
  return (
    <div>
      <div>
        <p>Correct</p>
        <span>{state.score.correct}</span>
        <span>X</span>
        <p>Incorrect</p>
        <span>{state.score.incorrect}</span>
      </div>
    </div>
  )
}

export default Score
