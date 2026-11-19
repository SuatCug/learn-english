const { Anthropic } = require('@anthropic-ai/sdk');
const mongoose = require('mongoose');
const { Conversation } = require('../models');

// ANTHROPIC_API_KEY'i .env'den kendisi okur.
const client = new Anthropic();

const MODEL = process.env.AI_MODEL || 'claude-opus-5-5';
const DAILY_LIMIT = Number(process.env.AI_DAILY_LIMIT) || 50; // kullanıcı başına günlük mesaj
const MAX_INPUT_CHARS = 4000;
const HISTORY_LIMIT = 30; // modele gönderilen son mesaj sayısı (maliyet için)

const SYSTEM_PROMPTS = {
  // Sesli konuşma: cevap tarayıcıda sesli okunur, kullanıcının sözleri ses tanımayla yazıya çevrilmiştir.
  talk: (level) => `You are a friendly English speaking partner on a language-learning website. The learner is Turkish and their English level is CEFR ${level}. This is a spoken conversation: the learner's words come from speech recognition, and your reply is read aloud by text-to-speech.

- Speak like a real person in a relaxed conversation. Reply in 1-3 short sentences, then ask one simple question to keep the conversation going.
- Use vocabulary and grammar suited to ${level}. For A1/A2 use very short, clear sentences.
- Write only plain spoken English: no Markdown, no emojis, no lists, no symbols.
- Ignore small speech-recognition errors (missing punctuation, capital letters, a wrongly recognised word that is clear from context). Don't comment on spelling.
- If the learner makes a real grammar or vocabulary mistake, naturally use the correct form in your reply. Then put the correction on its own final line, starting with "Tip:", with the corrected sentence and a very short, simple explanation in English (use easy words suited to the learner's level). This line is shown on screen, not read aloud. If there is no real mistake, don't add a tip line.
- Always reply in English. Stay friendly and encouraging. Keep topics appropriate for all ages.`,

  chat:(level) => `You are a friendly English conversation partner on a language-learning website. The learner is Turkish and their English level is CEFR ${level}.

- Use vocabulary and grammar suited to ${level}. For A1/A2 use short, simple sentences.
- Keep each reply short: 2-4 sentences. End with a question so the conversation continues.
- Always reply in English, even if the learner writes in Turkish (you may add a very short Turkish hint in parentheses for A1/A2 learners if they seem stuck).
- If the learner's last message has grammar or vocabulary mistakes, reply naturally first, then add one final line starting with "💡 Tip:" that shows the corrected sentence and a very short, simple explanation in English (use easy words suited to the learner's level). If there are no mistakes, don't add a tip.
- Stay friendly and encouraging. Keep topics appropriate for all ages.`,

  writing: (level) => `You are an English writing tutor on a language-learning website. The learner is Turkish and their English level is CEFR ${level}. They send you a piece of English writing (a sentence, paragraph, email or essay).

Reply in this format, using Markdown:

**✅ Corrected version**
The full text with all mistakes fixed. Keep the learner's meaning and style; don't rewrite it more than needed.

**🔍 Mistakes**
A numbered list. For each mistake: the wrong part → the correct part, then a short explanation in Turkish. If there are no mistakes, say so.

**📊 Score: X/10**
One sentence in Turkish about the score, judged for level ${level}.

**🚀 Next step**
One concrete suggestion in Turkish to make the writing better (a useful phrase, a linking word, a richer word choice).

If the learner asks a question instead of sending writing, answer it briefly in Turkish, with English examples.`,
};

// Bugün (UTC gün başından itibaren) bu kullanıcının kaç AI mesajı gönderdiğini sayar.
async function countTodayMessages(userId) {
  const startOfDay = new Date();
  startOfDay.setUTCHours(0, 0, 0, 0);

  const [result] = await Conversation.aggregate([
    { $match: { userId: new mongoose.Types.ObjectId(userId), updatedAt: { $gte: startOfDay } } },
    { $unwind: '$messages' },
    { $match: { 'messages.role': 'user', 'messages.createdAt': { $gte: startOfDay } } },
    { $count: 'count' },
  ]);
  return result?.count ?? 0;
}

// Claude'dan cevabı parça parça (stream) alır. Her yeni metin parçası için onDelta çağrılır.
// Tamamlanan cevabın metnini döndürür.
async function streamReply({ mode, level, topic, messages, onDelta }) {
  const history = messages.slice(-HISTORY_LIMIT).map(({ role, content }) => ({ role, content }));
  // Konulu sohbetler AI'nın ilk mesajıyla (opener) başlar; geçmiş bir kullanıcı mesajıyla başlamalı.
  if (history[0]?.role === 'assistant') {
    history.unshift({ role: 'user', content: '(I opened this topic. Please start the conversation.)' });
  }

  let system = SYSTEM_PROMPTS[mode](level);
  if (topic && topic.slug === 'free-talk') {
    system += `\n\nThis is a free conversation: ${topic.scenario}`;
  } else if (topic) {
    // Konu kartından açılan sohbet: AI konuda/rolde kalır, sapılırsa nazikçe konuya döner.
    system += `\n\nTopic of this conversation: "${topic.title}".
Scenario: ${topic.scenario}

Every reply must be about this topic. Stay in your role for the whole conversation and keep it moving: ask questions and add new details that fit the scenario, so the learner practises the words and phrases of this topic.
If the learner writes something off-topic, answer it in one short, friendly sentence, then bring the conversation back to the topic with a question.
If the learner says they want to finish, close the conversation politely in your role.`;
  }

  const stream = client.beta.messages.stream({
    model: MODEL,
    max_tokens: 4000,
    output_config: { effort: 'low' }, // sohbet için hızlı ve ekonomik
    // Model bir isteği güvenlik nedeniyle reddederse sunucu tarafında uygun bir yedek modele düşer.
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    system,
    messages: history,
  });

  stream.on('text', (text) => onDelta(text));
  const final = await stream.finalMessage();

  if (final.stop_reason === 'refusal') {
    return "Sorry, I can't help with that. Let's talk about something else! 🙂";
  }

  const text = final.content
    .filter((block) => block.type === 'text')
    .map((block) => block.text)
    .join('')
    .trim();

  return text || "Sorry, I couldn't answer that. Could you say it another way?";
}

module.exports = { streamReply, countTodayMessages, DAILY_LIMIT, MAX_INPUT_CHARS };
