const { Conversation } = require('../models');
const {
  streamReply,
  countTodayMessages,
  countUserTurns,
  DAILY_LIMIT,
  MAX_INPUT_CHARS,
  TOPIC_TURNS,
} = require('../services/ai.service');
const { findTopic } = require('../data/aiTopics');

// AI sohbeti: kullanıcı 'ai:message' gönderir, cevap 'ai:delta' parçalarıyla canlı akar,
// bitince 'ai:done' gelir. Hata olursa 'ai:error'.
function registerAiChatSocket(socket) {
  socket.on('ai:message', async ({ conversationId, text } = {}, callback) => {
    const reply = (payload) => callback?.(payload);
    const content = typeof text === 'string' ? text.trim() : '';

    if (!content) return reply({ ok: false, message: 'Mesaj boş olamaz.' });
    if (content.length > MAX_INPUT_CHARS) {
      return reply({ ok: false, message: `Mesaj en fazla ${MAX_INPUT_CHARS} karakter olabilir.` });
    }
    // Aynı anda tek cevap: önceki cevap bitmeden yeni mesaj gönderilemez.
    if (socket.data.aiBusy) return reply({ ok: false, message: 'Önceki cevap henüz bitmedi.' });

    socket.data.aiBusy = true;
    try {
      const conversation = await Conversation.findOne({ _id: conversationId, userId: socket.user.id }).catch(() => null);
      if (!conversation) return reply({ ok: false, message: 'Sohbet bulunamadı.' });
      if (conversation.finished) return reply({ ok: false, message: 'Bu sohbet bitti. Yeni bir sohbet başlatabilirsin.' });

      const usedToday = await countTodayMessages(socket.user.id);
      if (usedToday >= DAILY_LIMIT) {
        return reply({ ok: false, message: `Günlük ${DAILY_LIMIT} mesaj sınırına ulaştın. Yarın tekrar gel! 🙂` });
      }

      conversation.messages.push({ role: 'user', content });
      if (conversation.messages.length === 1) {
        conversation.title = content.length > 40 ? `${content.slice(0, 40)}…` : content;
      }
      await conversation.save();
      // Konulu sohbette sınırdaki mesaj: AI sohbeti kapatır, cevaptan sonra sohbet biter (sonuç ekranı).
      const lastTurn = Boolean(conversation.topic) && countUserTurns(conversation.messages) >= TOPIC_TURNS;

      // Mesaj kabul edildi; cevap stream ile gelecek.
      reply({ ok: true, usedToday: usedToday + 1, dailyLimit: DAILY_LIMIT, title: conversation.title });

      try {
        const answer = await streamReply({
          mode: conversation.mode,
          level: conversation.level,
          topic: conversation.topic ? findTopic(conversation.level, conversation.topic) : null,
          messages: conversation.messages,
          lastTurn,
          onDelta: (chunk) => socket.emit('ai:delta', { conversationId, chunk }),
        });

        conversation.messages.push({ role: 'assistant', content: answer });
        if (lastTurn) conversation.finished = true;
        await conversation.save();
        // finished: true gelirse frontend sonuç ekranını açar ve değerlendirmeyi (POST .../finish) ister.
        socket.emit('ai:done', {
          conversationId,
          message: conversation.messages[conversation.messages.length - 1],
          finished: conversation.finished,
        });
      } catch (err) {
        console.error('AI cevap hatası:', err.status, err.message);
        // Cevapsız kalan kullanıcı mesajını geri al ki sohbet geçmişi bozulmasın (iki user mesajı art arda).
        conversation.messages.pop();
        await conversation.save().catch(() => {});
        socket.emit('ai:error', {
          conversationId,
          message: err.status === 429 ? 'AI şu an çok yoğun, birazdan tekrar dene.' : 'AI şu an cevap veremiyor, tekrar dene.',
        });
      }
    } catch (err) {
      console.error('AI sohbet hatası:', err.message);
      reply({ ok: false, message: 'Bir hata oluştu, tekrar dene.' });
    } finally {
      socket.data.aiBusy = false;
    }
  });
}

module.exports = registerAiChatSocket;
