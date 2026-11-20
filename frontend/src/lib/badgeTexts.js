import { tk } from '@/i18n';

// Rozet adları ve açıklamaları veritabanından (backend/utils/seed.js) İngilizce gelir ve ekranda t(badge.title),
// t(badge.description) ile çevrilir. Bu liste sadece çeviri kontrolü içindir (npm run i18n:check):
// seed'e yeni rozet eklenince adı ve açıklaması buraya ve i18n/tr.js'e de eklenmelidir.
export const BADGE_TEXTS = [
  tk('First Step'), tk('You completed your first topic!'),
  tk('Dedicated Learner'), tk('You completed 10 topics.'),
  tk('Bookworm'), tk('You completed 25 topics.'),
  tk('Knowledge Seeker'), tk('You completed 50 topics.'),
  tk('Century Club'), tk('You completed 100 topics.'),
  tk('Level Master'), tk('You completed all topics at your current level.'),
  tk('Grammar Guru'), tk('You completed 10 grammar topics.'),
  tk('Word Collector'), tk('You completed 10 vocabulary topics.'),
  tk('Avid Reader'), tk('You completed 10 reading topics.'),
  tk('Wordsmith'), tk('You completed 10 writing topics.'),
  tk('Good Listener'), tk('You completed 10 listening topics.'),
  tk('Perfect Score'), tk('You scored 100% on a topic.'),
  tk('Sharp Mind'), tk('You scored 100% ten times.'),
  tk('Flawless'), tk('You scored 100% twenty-five times.'),
  tk('Warming Up'), tk('You practised 3 days in a row.'),
  tk('On a Roll'), tk('You practiced 7 days in a row.'),
  tk('Unstoppable'), tk('You practised 30 days in a row.'),
  tk('Know Your Level'), tk('You completed the Level Test.'),
  tk('Certified'), tk('You passed a level exam.'),
  tk('Exam Champion'), tk('You passed all four level exams (A1–B2).'),
  tk('First Words'), tk('You finished your first speaking practice.'),
  tk('Confident Speaker'), tk('You finished 10 speaking practices.'),
  tk('Chat Starter'), tk('You finished your first chat practice.'),
  tk('Chatterbox'), tk('You finished 10 chat practices.'),
  tk('Fluent Moment'), tk('You scored 9/10 or more in an AI conversation.'),
  tk('Game On'), tk('You played your first live game.'),
  tk('Quiz Regular'), tk('You played 10 live games.'),
];
