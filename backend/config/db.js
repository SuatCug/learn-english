const dns = require('dns');
const mongoose = require('mongoose');

// Windows'ta Node'un c-ares tabanlı DNS çözücüsü bazı ağlarda (VPN/sanal adaptör vb.)
// mongodb+srv:// bağlantısının gerektirdiği SRV kaydını çözemiyor; işletim sistemi
// nslookup'ı çözebildiği halde Node querySrv ECONNREFUSED veriyor. Genel bir DNS
// sunucusu belirtmek bu sorunu çözüyor.
dns.setServers(['8.8.8.8', '1.1.1.1']);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB veritabanına bağlanıldı.');
  } catch (error) {
    console.error('❌ MongoDB bağlantı hatası:', error.message);
    // GEÇİCİ teşhis (Frankfurt taşıması): şifreyi göstermeden MONGO_URI'nin başını ve tanımlı adları yazar.
    const uri = process.env.MONGO_URI ?? '';
    console.error('🔎 MONGO_URI teşhis:', {
      ilk14: JSON.stringify(uri.slice(0, 14)),
      ilkKarakterKodlari: [...uri.slice(0, 4)].map((c) => c.charCodeAt(0)),
      uzunluk: uri.length,
      mongoIceren: Object.keys(process.env).filter((k) => k.toUpperCase().includes('MONGO')).map((k) => JSON.stringify(k)),
    });
    process.exit(1);
  }
};

module.exports = connectDB;
