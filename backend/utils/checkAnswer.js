// Soru tipine göre kullanıcı cevabını `correctAnswer` / `matchingPairs` ile karşılaştırır.
// Placement test gibi backend'in puanlama yapması gereken senaryolarda kullanılır.
const normalize = (value) => String(value ?? '').trim().toLowerCase();

const isAnswerCorrect = (question, userAnswer) => {
  switch (question.type) {
    case 'multiple-choice':
      return normalize(userAnswer) === normalize(question.correctAnswer);

    case 'fill-in-blanks': {
      const accepted = Array.isArray(question.correctAnswer)
        ? question.correctAnswer
        : [question.correctAnswer];
      return accepted.some((answer) => normalize(answer) === normalize(userAnswer));
    }

    case 'matching': {
      if (!Array.isArray(userAnswer) || !Array.isArray(question.matchingPairs)) return false;
      if (userAnswer.length !== question.matchingPairs.length) return false;
      return question.matchingPairs.every((pair) =>
        userAnswer.some((entry) => normalize(entry.left) === normalize(pair.left) && normalize(entry.right) === normalize(pair.right))
      );
    }

    default:
      return false;
  }
};

module.exports = { isAnswerCorrect };
