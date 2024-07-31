import React from 'react';
import Score from './components/Score';
import Game from './components/Game';
import { useQuiz } from './contexts/QuizContext';

import './App.scss';

function App() {
  const state = useQuiz();
  console.log(state)

  return (
    <main className="App">
      <Score />
      <Game />
    </main>
  );
}

export default App;
