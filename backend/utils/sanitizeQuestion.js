// Sınav ekranına gönderilirken doğru cevabın sızmaması için soruyu temizler.
const shuffle = (arr) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

const sanitizeQuestion = (questionDoc, { includeAnswers = false } = {}) => {
  const q = questionDoc.toObject ? questionDoc.toObject() : questionDoc;

  const base = {
    id: q._id,
    topicId: q.topicId,
    type: q.type,
    title: q.title,
    level: q.level,
    isPlacementQuestion: q.isPlacementQuestion,
    exerciseGroup: q.exerciseGroup ?? 1,
    section: q.section ?? null,
    passage: q.passage ?? null,
    order: q.order ?? 0,
  };

  if (q.type === 'multiple-choice') {
    base.options = q.options;
  }

  if (q.type === 'matching' && Array.isArray(q.matchingPairs)) {
    base.left = q.matchingPairs.map((pair) => pair.left);
    base.right = shuffle(q.matchingPairs.map((pair) => pair.right));
  }

  if (includeAnswers) {
    base.correctAnswer = q.correctAnswer;
    base.matchingPairs = q.matchingPairs;
    base.explanation = q.explanation;
  }

  return base;
};

module.exports = { sanitizeQuestion, shuffle };
