import authIllustration from '@/assets/auth-illustration.png';

// Auth ekranları (Login/Register) için ortak iki panelli yerleşim.
// Solda görsel paneli, sağda form paneli.
export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen lg:h-screen grid lg:grid-cols-2">
      <div className="hidden lg:block relative h-full overflow-hidden">
        <img
          src={authIllustration}
          alt="Kütüphanede birlikte İngilizce çalışan öğrenciler"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </div>

      <div className="flex items-center justify-center px-6 py-8 bg-white overflow-y-auto">
        <div className="w-full max-w-[440px]">{children}</div>
      </div>
    </div>
  );
}
