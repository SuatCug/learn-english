const { verifyToken } = require('../utils/jwt.util');
const { User, Classroom } = require('../models');
const { appendProgressEntry } = require('../utils/progress.util');
const gameSession = require('../services/gameSession.service');

const GAME_OVER_CLEANUP_MS = 30000;

const isClassroomMember = (classroom, userId) =>
  classroom.teacherId.toString() === userId || classroom.students.some((s) => s.toString() === userId);

const scheduleQuestionEnd = (io, session) => {
  clearTimeout(session.timer);
  session.timer = setTimeout(() => endQuestion(io, session), gameSession.QUESTION_DURATION_MS);
};

const endQuestion = async (io, session) => {
  clearTimeout(session.timer);
  session.phase = 'reveal';

  const reveal = gameSession.buildReveal(session);
  io.to(session.roomCode).emit('game:reveal', reveal);
  io.to(session.roomCode).emit('game:leaderboard', { players: gameSession.buildLeaderboard(session) });

  session.timer = setTimeout(() => nextQuestionOrEnd(io, session), gameSession.REVEAL_DURATION_MS);
};

const nextQuestionOrEnd = async (io, session) => {
  const hasNext = gameSession.advanceQuestion(session);

  if (hasNext) {
    session.phase = 'active';
    io.to(session.roomCode).emit('game:question', gameSession.sanitizeQuestion(session));
    scheduleQuestionEnd(io, session);
    return;
  }

  session.phase = 'over';
  io.to(session.roomCode).emit('game:over', { finalLeaderboard: gameSession.buildLeaderboard(session) });

  // Oyun bitince her oyuncunun skoru kalıcı ilerlemeye (User.progress) yazılır — topicId null,
  // sınıf toplam puanına otomatik yansır (classroom.controller.js#getClassroom topicId'den bağımsız toplar).
  const results = gameSession.finalResults(session);
  await Promise.all(
    results.map((r) =>
      appendProgressEntry(r.id, {
        topicId: null,
        topicTitle: `Live Quiz — ${session.category.charAt(0).toUpperCase() + session.category.slice(1)} (${session.level})`,
        score: r.normalizedScore,
        category: session.category,
        exerciseGroup: 1,
        answers: session.answersLog.get(r.id) ?? [],
        assignmentId: null,
        source: 'game',
      }).catch(() => null)
    )
  );

  setTimeout(() => gameSession.deleteSession(session.roomCode), GAME_OVER_CLEANUP_MS);
};

const maybeEndQuestionEarly = (io, session) => {
  if (gameSession.allPlayersAnswered(session)) {
    endQuestion(io, session);
  }
};

function registerGameSockets(io) {
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) return next(new Error('unauthorized'));
      const decoded = verifyToken(token);
      const user = await User.findById(decoded.id);
      if (!user) return next(new Error('unauthorized'));
      socket.user = { id: user._id.toString(), name: user.name };
      next();
    } catch {
      next(new Error('unauthorized'));
    }
  });

  io.on('connection', (socket) => {
    socket.on('game:create', async ({ classroomId, category, level }, callback) => {
      try {
        const classroom = await Classroom.findById(classroomId);
        if (!classroom) return callback?.({ ok: false, message: 'Sınıf bulunamadı.' });
        if (classroom.teacherId.toString() !== socket.user.id) {
          return callback?.({ ok: false, message: 'Bu işlemi sadece öğretmen yapabilir.' });
        }

        const questions = await gameSession.pickQuestions(category, level, gameSession.QUESTIONS_PER_GAME);
        if (questions.length < 4) {
          return callback?.({ ok: false, message: 'Bu seviye/kategoride yeterli soru yok.' });
        }

        const session = gameSession.createSession({
          classroomId,
          hostUserId: socket.user.id,
          category,
          level,
        });
        session.questions = questions;

        socket.join(session.roomCode);
        socket.data.roomCode = session.roomCode;

        callback?.({ ok: true, roomCode: session.roomCode });
      } catch {
        callback?.({ ok: false, message: 'Oyun oluşturulamadı.' });
      }
    });

    socket.on('game:join', async ({ roomCode, classroomId }, callback) => {
      try {
        const session = gameSession.getSession(roomCode);
        if (!session) return callback?.({ ok: false, message: 'Bu kodla bir oyun bulunamadı.' });
        if (session.phase !== 'waiting') {
          return callback?.({ ok: false, message: 'Bu oyun zaten başladı.' });
        }

        const classroom = await Classroom.findById(classroomId || session.classroomId);
        if (!classroom || !isClassroomMember(classroom, socket.user.id)) {
          return callback?.({ ok: false, message: 'Bu sınıfın bir üyesi değilsiniz.' });
        }

        gameSession.addPlayer(session, { id: socket.user.id, name: socket.user.name });
        socket.join(roomCode);
        socket.data.roomCode = roomCode;

        io.to(roomCode).emit('game:playersUpdate', {
          players: Array.from(session.players.values()).map((p) => ({ id: p.id, name: p.name, online: p.online })),
          count: session.players.size,
        });

        callback?.({ ok: true });
      } catch {
        callback?.({ ok: false, message: 'Katılım başarısız.' });
      }
    });

    socket.on('game:start', ({ roomCode }, callback) => {
      const session = gameSession.getSession(roomCode);
      if (!session) return callback?.({ ok: false, message: 'Oyun bulunamadı.' });
      if (session.hostUserId !== socket.user.id) {
        return callback?.({ ok: false, message: 'Sadece oyunu başlatan öğretmen başlatabilir.' });
      }
      if (!session.players.size) {
        return callback?.({ ok: false, message: 'Henüz katılan öğrenci yok.' });
      }
      if (session.phase !== 'waiting') return callback?.({ ok: true });

      session.phase = 'active';
      gameSession.advanceQuestion(session);
      io.to(roomCode).emit('game:question', gameSession.sanitizeQuestion(session));
      scheduleQuestionEnd(io, session);

      callback?.({ ok: true });
    });

    socket.on('game:answer', ({ roomCode, questionId, optionIndex }, callback) => {
      const session = gameSession.getSession(roomCode);
      if (!session || session.phase !== 'active') return callback?.({ ok: false });

      const result = gameSession.recordAnswer(session, socket.user.id, questionId, optionIndex);
      if (!result) return callback?.({ ok: false });

      gameSession.pushActivity(
        session,
        `${socket.user.name} answered ${result.correct ? 'correctly' : 'incorrectly'}${
          result.correct ? ` (+${result.points})` : ''
        }`
      );
      io.to(roomCode).emit('game:activity', session.activityLog[session.activityLog.length - 1]);

      callback?.({ ok: true, correct: result.correct, points: result.points });

      maybeEndQuestionEarly(io, session);
    });

    socket.on('disconnect', () => {
      const roomCode = socket.data.roomCode;
      if (!roomCode) return;
      const session = gameSession.getSession(roomCode);
      if (!session) return;

      gameSession.setPlayerOnline(session, socket.user.id, false);
      if (session.phase === 'waiting') {
        io.to(roomCode).emit('game:playersUpdate', {
          players: Array.from(session.players.values()).map((p) => ({ id: p.id, name: p.name, online: p.online })),
          count: session.players.size,
        });
      }
    });
  });
}

module.exports = registerGameSockets;
