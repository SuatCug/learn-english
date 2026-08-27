import { useEffect, useRef, useState } from 'react';

/**
 * Bir elemanın viewport'a İLK KEZ girdiğini native IntersectionObserver ile yakalar.
 * Eleman bir kez görününce observer durdurulur — yukarı/aşağı kaydırınca animasyon
 * tekrar tekrar oynamaz. Ekstra kütüphane kullanmaz.
 *
 * Kullanım:
 *   const [ref, inView] = useInView();
 *   <div
 *     ref={ref}
 *     className={`transition-all duration-500 ease-out ${
 *       inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
 *     }`}
 *   />
 *
 * @param {Object} [options]
 * @param {number} [options.threshold=0.15]   Elemanın görünür oranı bu değeri geçince tetiklenir (%15).
 * @param {string} [options.rootMargin='0px 0px -10% 0px']  Gözlem kutusu marjı; alttan biraz erken tetikler.
 * @returns {[import('react').MutableRefObject<any>, boolean]} [ref, inView]
 */
export default function useInView({ threshold = 0.15, rootMargin = '0px 0px -10% 0px' } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // IntersectionObserver yoksa (çok eski tarayıcı) ya da kullanıcı hareket azaltmayı
    // tercih ediyorsa animasyonu atla: elemanı direkt görünür say.
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (typeof IntersectionObserver === 'undefined' || prefersReduced) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, inView];
}
