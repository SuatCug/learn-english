import { useState } from 'react';

// Yüklenince kısa bir geçişle beliren resim. Kartlardaki resimler ağdan farklı sıralarla geldiği için
// tek tek "patlayarak" belirmesi yerine yumuşakça görünür; resim gelene kadar kutunun arka planı görünür.
// priority: ekranda ilk görünen resimler için (tarayıcı bunları önce ister, lazy yüklemez).
export default function FadeImage({ src, className = '', priority = false, ...props }) {
  // Hangi adresin yüklendiğini tutar; src değişince (başka konuya geçince) otomatik olarak tekrar gizlenir.
  const [loadedSrc, setLoadedSrc] = useState(null);
  const loaded = loadedSrc === src;

  return (
    <img
      src={src}
      alt=""
      decoding="async"
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      onLoad={() => setLoadedSrc(src)}
      onError={() => setLoadedSrc(src)}
      className={`${className} transition-opacity duration-500 ease-out ${loaded ? 'opacity-100' : 'opacity-0'}`}
      {...props}
    />
  );
}
