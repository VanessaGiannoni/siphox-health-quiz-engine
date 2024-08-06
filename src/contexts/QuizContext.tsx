import React, { createContext, useContext, useReducer } from 'react';

export interface Question {
  type: "multiple" | "boolean" | "input" | "one-choice";
  difficulty: "easy" | "medium" | "hard";
  category: string;
  question: string;
  correct_answer: string | string[];
  incorrect_answers: string[];
  options: string[];
}

export interface QuestionResponse {
  results: Question[];
}

interface Score {
  correct: number,
  incorrect: number
}

interface IQuizContext {
  state: QuizState,
  dispatch: React.Dispatch<QuizAction>
}

type Status = "idle" | "fetching" | "ready" | "error" | "answered";

export interface QuizState {
  gameStatus: Status
  question: Question | null,
  userAnswer: string | string[] | null,
  score: Score,
  currentQuestion: number
  correctAnswer: string | string[] | null,
  isCorrect: boolean,
}

export type QuizAction =
  { type: "setStatus"; payload: Status }
  | { type: "setQuestion"; payload: Question }
  | { type: "setUserAnswer"; payload: string | string[] | null }
  | { type: "setScore"; payload: "correct" | "incorrect" }
  | { type: "setCurrentQuestion"; payload: number }
  | { type: "setCorrectAnswer"; payload: string | string[] | null }
  | { type: "setIsCorrect"; payload: boolean }

const initialState: QuizState = {
  gameStatus: "idle",
  question: null,
  userAnswer: null,
  score: {
    correct: 0,
    incorrect: 0
  },
  currentQuestion: 0,
  correctAnswer: null,
  isCorrect: false,
}

const QuizContext = createContext<IQuizContext>({
  state: initialState,
  dispatch: () => null
});

export function QuizProvider({ children }: { children: React.ReactElement }) {
  const [state, dispatch] = useReducer(QuizReducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  )
}

export function useQuiz() {
  return useContext(QuizContext);
}

function QuizReducer(state: QuizState, action: QuizAction): QuizState {
  const score = state.score;

  switch (action.type) {
    case "setQuestion":
      return {...state, question: action.payload};
    case "setStatus":
      return {...state, gameStatus: action.payload};
    case "setUserAnswer":
      return {...state, userAnswer: action.payload};
    case "setCorrectAnswer":
      return {...state, correctAnswer: action.payload};
    case "setIsCorrect":
      return {...state, isCorrect: action.payload};
    case "setScore":
      return {...state, score: {...score, [action.payload]: score[action.payload] + 1}};
    case "setCurrentQuestion":
      return { ...state, currentQuestion: state.currentQuestion > 10 ? 0 : state.currentQuestion + 1 };
    default:
      throw new Error("Unknown action");
  }
}
