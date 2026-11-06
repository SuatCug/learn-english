// Seviye sistemi A1, A2, B1, B2 olarak sadeleştirildi (B1+, C1, C2 kaldırıldı). Bu script,
// kaldırılan seviyelerde kayıtlı kullanıcıları en yakın geçerli seviyeye taşır:
// B1+ -> B1, C1/C2 -> B2. Aksi halde bu kullanıcıların bir sonraki save() çağrısı enum
// doğrulamasından geçemez.
//
// Doğrudan updateMany kullanır (user.save() yerine): eski değerler zaten enum dışında olduğundan
// doküman doğrulaması atlanmalı.
// Çalıştırmak için: node utils/migrateLevels.js
require('dotenv').config();
const connectDB = require('../config/db');
const { User } = require('../models');

const LEVEL_MAP = { 'B1+': 'B1', C1: 'B2', C2: 'B2' };

const migrate = async () => {
  await connectDB();

  let total = 0;
  for (const [from, to] of Object.entries(LEVEL_MAP)) {
    const { modifiedCount } = await User.updateMany({ level: from }, { $set: { level: to } });
    console.log(`  ${from} -> ${to}: ${modifiedCount} kullanıcı`);
    total += modifiedCount;
  }

  console.log(`✅ Toplam ${total} kullanıcının seviyesi güncellendi.`);
  process.exit(0);
};

migrate().catch((error) => {
  console.error('❌ Migration başarısız oldu:', error);
  process.exit(1);
});
