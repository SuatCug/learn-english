const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

// Cloudinary public ID'sinden (ör. topics/grammar/a1/01-subject-pronouns) optimize edilmiş resim URL'si üretir.
// f_auto/q_auto: tarayıcıya uygun format (WebP/AVIF) ve kalite; w_: genişlik (retina için kart genişliğinin ~2 katı).
// Cloud name tanımlı değilse null döner; çağıran taraf yedek görsele düşer.
export function cloudinaryUrl(publicId, width = 800) {
  if (!publicId || !CLOUD_NAME) return null;
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto,w_${width}/${publicId}`;
}

// Listening kaydı: Cloudinary ses dosyalarını "video" kaynak tipi altında tutar; .mp3 uzantısı formatı belirler.
export function cloudinaryAudioUrl(publicId) {
  if (!publicId || !CLOUD_NAME) return null;
  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/${publicId}.mp3`;
}
