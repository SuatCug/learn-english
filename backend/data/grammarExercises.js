// Grammar konularının egzersizleri (seed.js bunları Question olarak yükler).
// Anahtar: `${level}::${title}` (data/grammarCurriculum.js'teki başlıkla birebir aynı).
// Değer: { 1: [[soru, seçenekler, doğru, açıklama]...],   // Exercise 1 — 4 şıklı açılır menü
//          2: [[soru, seçenekler, doğru, açıklama]...],   // Exercise 2 — 2 seçenekli butonlar
//          3: [[soru, doğru, açıklama]...] }               // Exercise 3 — boşluk doldurma
const { B1_EXERCISES } = require('./grammarExercisesB1');
const { B2_EXERCISES } = require('./grammarExercisesB2');

const GRAMMAR_EXERCISES = { ...B1_EXERCISES, ...B2_EXERCISES };

module.exports = { GRAMMAR_EXERCISES };
