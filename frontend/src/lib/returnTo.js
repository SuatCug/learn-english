// Giriş/kayıt sonrası kullanıcıyı geldiği sayfaya geri götürmek için: girişe kapalı bir sayfaya giden misafirin
// (veya "Giriş yap" butonuna basanın) bulunduğu adres saklanır; giriş, Google girişi, e-posta doğrulama ve şifre
// sıfırlama bitince oraya dönülür. Sekme kapanınca silinir (sessionStorage).
const KEY = 'returnTo';

export function rememberReturnTo(path) {
  try {
    if (path && !/^\/(login|register|verify-email|forgot-password)\b/.test(path)) sessionStorage.setItem(KEY, path);
  } catch {
    // depolama kapalıysa giriş sonrası ana sayfaya gidilir
  }
}

// Saklanan adresi döndürür ve siler; yoksa (veya güvenli bir site içi adres değilse) ana sayfa.
export function takeReturnTo() {
  try {
    const path = sessionStorage.getItem(KEY);
    sessionStorage.removeItem(KEY);
    return path && path.startsWith('/') && !path.startsWith('//') ? path : '/';
  } catch {
    return '/';
  }
}
