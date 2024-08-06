type isSelectionCorrectType = {
  isCorrect: boolean;
  userAnswer: string[] | string;
  correctAnswer: string[] | string;
}

export const isSelectionCorrect = (userAnswers: string | string[], correctAnswers: string | string[]): isSelectionCorrectType => {
  const isArray = Array.isArray(userAnswers) && Array.isArray(correctAnswers)

  if (isArray) {
    return areStringArraysEqual(userAnswers, correctAnswers);    
  }
  
  const isString = String(userAnswers).toLocaleLowerCase() === String(correctAnswers).toLocaleLowerCase();

  return {
    isCorrect: isString,
    userAnswer: userAnswers,
    correctAnswer: correctAnswers,
  };
};


export function areStringArraysEqual(userAnswers: string[], correctAnswers: string[]): isSelectionCorrectType {
  if (userAnswers.length !== correctAnswers.length) {
      return {
        isCorrect: false,
        userAnswer: userAnswers,
        correctAnswer: correctAnswers,
      }
  }

  const sortedArray1 =  userAnswers.map(str => str.toLowerCase()).sort();
  const sortedArray2 = correctAnswers.map(str => str.toLowerCase()).sort();

  for (let i = 0; i < sortedArray1.length; i++) {
      if (sortedArray1[i] !== sortedArray2[i]) {
        return {
          isCorrect: false,
          userAnswer: userAnswers,
          correctAnswer: correctAnswers,
        };
      }
  }

  return {
    isCorrect: true,
    userAnswer: sortedArray1,
    correctAnswer: sortedArray2,
  };
}

