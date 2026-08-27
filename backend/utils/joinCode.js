// 0/O, 1/I/L gibi karışabilecek karakterler çıkarılmış bir alfabeden 6 haneli kod üretir (örn: A7F2K9).
const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

const generateJoinCode = () => {
  let code = '';
  for (let i = 0; i < 6; i += 1) {
    code += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return code;
};

module.exports = { generateJoinCode };
