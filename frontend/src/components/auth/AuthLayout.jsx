import heroImage from '@/assets/home-hero.webp';

// Auth ekranları (Login/Register/Verify) için ortak iki panelli yerleşim.
// Solda: navbar ile aynı koyu zemin üzerinde ana sayfadaki fotoğraf ve slogan.
// Sağda: beyaz form paneli. Mobilde fotoğraf paneli yerine üstte kısa, koyu bir şerit görünür.
function HeroPhoto({ className = '' }) {
  return (
    <img
      src={heroImage}
      alt=""
      className={`absolute inset-0 w-full h-full object-cover object-[35%_center] -scale-x-100 ${className}`}
    />
  );
}

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen lg:h-screen grid lg:grid-cols-2">
      {/* Masaüstü: sol fotoğraf paneli */}
      <div className="hidden lg:flex relative isolate h-full overflow-hidden bg-[#15181c] items-end">
        <HeroPhoto className="-z-10 brightness-[0.6]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-[#15181c] to-transparent" />
        <div className="p-12 max-w-lg">
          <p className="text-white text-[40px] font-bold leading-none tracking-wide">
            learn english
            <span className="block mt-2 text-[0.8em] text-emerald-500">Take your learning with you!</span>
          </p>
          <p className="mt-4 text-white/85 text-lg font-light leading-snug">
            Grammar, vocabulary, reading and writing lessons from A1 to B2, with instant feedback on every
            exercise.
          </p>
        </div>
      </div>

      <div className="flex flex-col bg-white overflow-y-auto">
        {/* Mobil: üstte koyu şerit */}
        <div className="lg:hidden relative isolate h-32 shrink-0 overflow-hidden bg-[#15181c] flex items-end">
          <HeroPhoto className="-z-10 brightness-[0.45]" />
          <p className="px-4 pb-4 text-emerald-500 text-xl font-bold leading-tight">Take your learning with you!</p>
        </div>

        <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-8">
          {/* 400px: Google butonunun izin verilen en büyük genişliği; form elemanları onunla aynı genişlikte olsun. */}
          <div className="w-full max-w-[400px]">{children}</div>
        </div>
      </div>
    </div>
  );
}
