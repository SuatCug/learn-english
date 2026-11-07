// School Mode odalarının rengi: oda id'sinden türetilir, böylece bir oda her yerde (School sayfası kartı,
// oda detay başlığı) aynı renkte görünür.
const ROOM_COLORS = ['#50af31', '#1a8ec1', '#ff6699', '#f7741d', '#a84d98', '#ed1c24'];

export const roomColor = (id = '') =>
  ROOM_COLORS[[...String(id)].reduce((sum, ch) => sum + ch.charCodeAt(0), 0) % ROOM_COLORS.length];

// Anasayfadaki kategori kartlarıyla aynı renkler.
export const CATEGORY_COLORS = {
  grammar: '#1a8ec1',
  vocabulary: '#ff6699',
  reading: '#ed1c24',
  writing: '#a84d98',
  listening: '#f7741d',
};
