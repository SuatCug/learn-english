// Tamamlanmış dersler: bir ders ancak TÜM alıştırmaları (çoğunda 3) bitince tamamlanmış sayılır. Bunu sunucu
// hesaplar (/users/me > user.completedTopicIds). Alan yoksa (eski sunucu): en az bir alıştırması kaydedilmiş dersler.
export function completedTopicSet(user) {
  if (Array.isArray(user?.completedTopicIds)) return new Set(user.completedTopicIds.map(String));
  return new Set((user?.progress ?? []).map((p) => String(p.topicId?._id ?? p.topicId ?? '')).filter(Boolean));
}

// Ödev, dersin tüm alıştırmaları bitince yapılmış sayılır; puan = her alıştırmanın son puanının ortalaması.
export function assignmentResult(user, assignment) {
  const topicId = String(assignment.topicId?._id ?? assignment.topicId ?? '');
  if (!topicId || !completedTopicSet(user).has(topicId)) return null;
  const latestByGroup = new Map();
  (user?.progress ?? [])
    .filter((p) => String(p.topicId?._id ?? p.topicId ?? '') === topicId)
    .forEach((p) => {
      const g = p.exerciseGroup ?? 1;
      const prev = latestByGroup.get(g);
      if (!prev || new Date(p.completedAt) >= new Date(prev.completedAt)) latestByGroup.set(g, p);
    });
  const scores = [...latestByGroup.values()].map((p) => p.score);
  return { score: scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0 };
}
