const { Topic, Question } = require('../models');
const { generateJoinCode } = require('../utils/joinCode');

// Canlı oyun (Live Game) oturumları tamamen bellekte tutulur — kısa ömürlü, tek sunucu
// örneği için ayrı bir Mongoose modeli gereksiz karmaşıklık olurdu.
const sessions = new Map();

const QUESTIONS_PER_GAME = 10;
const QUESTION_DURATION_MS = 20000;
const REVEAL_DURATION_MS = 4000;

const createUniqueRoomCode = () => {
  let code;
  do {
    code = generateJoinCode();
  } while (sessions.has(code));
  return code;
};

const createSession = ({ classroomId, hostUserId, category, level }) => {
  const roomCode = createUniqueRoomCode();
  const session = {
    roomCode,
    classroomId,
    hostUserId,
    category,
    level,
    phase: 'waiting', // waiting | active | reveal | over
    players: new Map(), // userId -> { id, name, score, online }
    questions: [], // full docs (server-only, incl. correctAnswer)
    currentIndex: -1,
    questionStartedAt: null,
    answersThisQuestion: new Map(), // userId -> { optionIndex, correct, points }
    answersLog: new Map(), // userId -> [{questionId, answer}]
    activityLog: [],
    timer: null,
  };
  sessions.set(roomCode, session);
  return session;
};

const getSession = (roomCode) => sessions.get(roomCode);

const deleteSession = (roomCode) => sessions.delete(roomCode);

const addPlayer = (session, { id, name }) => {
  if (!session.players.has(id)) {
    session.players.set(id, { id, name, score: 0, online: true });
    session.answersLog.set(id, []);
  } else {
    session.players.get(id).online = true;
  }
};

const setPlayerOnline = (session, userId, online) => {
  const player = session.players.get(userId);
  if (player) player.online = online;
};

const pickQuestions = async (category, level, count = QUESTIONS_PER_GAME) => {
  const topics = await Topic.find({ category, level }).select('_id').lean();
  const topicIds = topics.map((t) => t._id);
  if (!topicIds.length) return [];

  const questions = await Question.aggregate([
    {
      $match: {
        topicId: { $in: topicIds },
        type: 'multiple-choice',
        // Exercise 2: yarışma için 4 şıklı sorular burada daha tutarlı (exercise 1'de
        // bazı sorular sadece 2-3 şıklı, bir yarışma sorusu için yetersiz).
        exerciseGroup: 2,
        'options.3': { $exists: true },
        'options.4': { $exists: false },
      },
    },
    { $sample: { size: count } },
  ]);
  return questions;
};

const buildLeaderboard = (session) =>
  Array.from(session.players.values())
    .sort((a, b) => b.score - a.score)
    .map((p, index) => ({ id: p.id, name: p.name, score: p.score, online: p.online, rank: index + 1 }));

const pushActivity = (session, text) => {
  const entry = { id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`, text, ts: Date.now() };
  session.activityLog.push(entry);
  if (session.activityLog.length > 20) session.activityLog.shift();
  return entry;
};

const currentQuestion = (session) => session.questions[session.currentIndex];

const sanitizeQuestion = (session) => {
  const q = currentQuestion(session);
  if (!q) return null;
  return {
    index: session.currentIndex,
    total: session.questions.length,
    questionId: q._id.toString(),
    title: q.title,
    options: q.options,
    durationMs: QUESTION_DURATION_MS,
    startedAt: session.questionStartedAt,
  };
};

const computeScore = (correct, elapsedMs) => {
  if (!correct) return 0;
  const clamped = Math.min(Math.max(elapsedMs, 0), QUESTION_DURATION_MS);
  return Math.round(500 + 500 * (1 - clamped / QUESTION_DURATION_MS));
};

const recordAnswer = (session, userId, questionId, optionIndex) => {
  const q = currentQuestion(session);
  if (!q || q._id.toString() !== questionId) return null;
  if (session.answersThisQuestion.has(userId)) return null;

  const elapsedMs = Date.now() - session.questionStartedAt;
  const chosen = q.options?.[optionIndex];
  const correct = chosen !== undefined && chosen === q.correctAnswer;
  const points = computeScore(correct, elapsedMs);

  session.answersThisQuestion.set(userId, { optionIndex, correct, points });
  const player = session.players.get(userId);
  if (player) player.score += points;
  session.answersLog.get(userId)?.push({ questionId: q._id, answer: chosen });

  return { correct, points };
};

const allPlayersAnswered = (session) => {
  const onlinePlayers = Array.from(session.players.values()).filter((p) => p.online);
  if (!onlinePlayers.length) return false;
  return onlinePlayers.every((p) => session.answersThisQuestion.has(p.id));
};

const buildReveal = (session) => {
  const q = currentQuestion(session);
  const correctIndex = q.options.findIndex((opt) => opt === q.correctAnswer);
  const tally = q.options.map((_, i) =>
    Array.from(session.answersThisQuestion.values()).filter((a) => a.optionIndex === i).length
  );
  const correctCount = Array.from(session.answersThisQuestion.values()).filter((a) => a.correct).length;
  return { questionId: q._id.toString(), correctIndex, correctCount, tally };
};

const advanceQuestion = (session) => {
  session.currentIndex += 1;
  session.questionStartedAt = Date.now();
  session.answersThisQuestion = new Map();
  return session.currentIndex < session.questions.length;
};

const finalResults = (session) =>
  Array.from(session.players.values()).map((p) => ({
    id: p.id,
    name: p.name,
    score: p.score,
    normalizedScore: Math.round((p.score / (session.questions.length * 1000)) * 100),
  }));

module.exports = {
  QUESTIONS_PER_GAME,
  QUESTION_DURATION_MS,
  REVEAL_DURATION_MS,
  createSession,
  getSession,
  deleteSession,
  addPlayer,
  setPlayerOnline,
  pickQuestions,
  buildLeaderboard,
  pushActivity,
  sanitizeQuestion,
  recordAnswer,
  allPlayersAnswered,
  buildReveal,
  advanceQuestion,
  finalResults,
};
