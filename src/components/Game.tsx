import React, { useState } from 'react';
import question from '../questions/questions.json';
import { useQuiz } from '../contexts/QuizContext';
import Result from './Result/Result';
// @ts-ignore
import confetti from 'https://cdn.skypack.dev/canvas-confetti';


function Game() {
  const { state, dispatch } = useQuiz();

  let wonAudio = new Audio('./sounds/won.wav');
  let lostAudio = new Audio('./sounds/lost.wav');

  const handleCheckAnswer = (answer: string) => {
    dispatch({ type: "setUserAnswer", payload: answer });
  }

  const handleSubmit = () => {
    dispatch({ type: "setStatus", payload: "answered" });
    if (state.userAnswer === state.question?.correct_answer) {
      dispatch({ type: "setScore", payload: "correct" });
      wonAudio.play();
      confetti();
    } else {
      dispatch({ type: "setScore", payload: "incorrect" });
      lostAudio.play();
    }

  }

  return (
    <div>
      <h1> Game </h1>
      <h2> Question: {state.question?.question} </h2>
      <p>
        <strong>Difficulty: {state.question?.difficulty} </strong>
      </p>
      <select onChange={(e) => handleCheckAnswer(e.target.value)}>
        {state.question?.incorrect_answers.map(
          (answer) => (
            <option
              value={answer}
              key={answer}
            >
              {answer}
            </option>
            )
        )}

      </select>
      
      {
        state.userAnswer && state.gameStatus !== "answered" &&
        <button
          onClick={handleSubmit}
        >
          Submit
        </button>
      }
      
      {
        state.gameStatus === "answered" &&
        <>
          <p><strong>Correct answer: {state.question?.correct_answer}</strong></p>
          <Result />
          <button onClick={() => dispatch({ type: "setStatus", payload: "idle" })}>Next Question</button>
        </>
      }
    </div>
  )
}

export default Game
