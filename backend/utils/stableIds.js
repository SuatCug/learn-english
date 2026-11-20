// Seed konuları ve soruları silip yeniden yazarken eski _id'leri korur.
// Neden: kullanıcı ilerlemesi (User.progress.topicId) konuya, "See Answers" için saklanan cevaplar
// (progress.answers.questionId) soruya _id ile bağlı. Yeni _id'lerle yazılırsa bu bağlar kopar.
//
// Eşleme sabit bir anahtarla yapılır:
//  - Konu: kategori + seviye + başlık (başlığı değişen konu yeni konu sayılır)
//  - Soru: konu + test bölümü + egzersiz + tür + soru metni (+ aynı anahtarın kaçıncı tekrarı olduğu)
// Anahtarı eşleşmeyen kayıtlar (yeni eklenen konu/soru) yeni _id alır.

const topicKey = (t) => `${t.category}|${t.level}|${t.title}`;

const questionKeyBase = (q) =>
  [
    q.topicId ? String(q.topicId) : '-',
    q.isPlacementQuestion ? 'P' : '',
    q.section ?? '',
    q.exerciseGroup ?? 1,
    q.type,
    q.title,
  ].join('|');

// Aynı temel anahtar birden fazla kez geçebilir; kaçıncı tekrar olduğunu ekleyerek tekilleştirir.
const withOccurrence = (items, baseKey) => {
  const seen = new Map();
  return items.map((item) => {
    const base = baseKey(item);
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    return `${base}#${n}`;
  });
};

// Silmeden ÖNCE çağrılır: mevcut konu ve soruların anahtar → _id haritası.
const snapshotIds = async ({ Topic, Question }) => {
  const [topics, questions] = await Promise.all([
    Topic.find({}, 'category level title').lean(),
    // _id sırası = ekleme sırası; tekrar eden anahtarların sırası yeni listeyle aynı olsun diye.
    Question.find({}, 'topicId isPlacementQuestion section exerciseGroup type title').sort({ _id: 1 }).lean(),
  ]);
  const topicIds = new Map(topics.map((t) => [topicKey(t), t._id]));
  const questionKeys = withOccurrence(questions, questionKeyBase);
  const questionIds = new Map(questionKeys.map((key, i) => [key, questions[i]._id]));
  return { topicIds, questionIds };
};

// Yeni listedeki her kayda, anahtarı eskisiyle eşleşiyorsa eski _id'yi verir.
const assignIds = (items, keys, idMap) => {
  const used = new Set();
  return items.map((item, i) => {
    const id = idMap.get(keys[i]);
    if (!id || used.has(String(id))) return item;
    used.add(String(id));
    return { ...item, _id: id };
  });
};

const withStableTopicIds = (topics, snapshot) => assignIds(topics, topics.map(topicKey), snapshot.topicIds);

const withStableQuestionIds = (questions, snapshot) =>
  assignIds(questions, withOccurrence(questions, questionKeyBase), snapshot.questionIds);

module.exports = { snapshotIds, withStableTopicIds, withStableQuestionIds, topicKey };
