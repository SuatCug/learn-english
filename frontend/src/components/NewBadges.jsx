import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Sınav, Level Test ve AI sohbeti sonuç ekranlarında "yeni rozet kazandın" kutusu.
// Backend cevaptaki newlyAwardedBadges dizisini verir; boşsa hiçbir şey göstermez.
export default function NewBadges({ badges, className = '' }) {
  const { t } = useTranslation();
  if (!badges?.length) return null;
  return (
    <div className={`rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-left ${className}`}>
      <p className="text-sm font-semibold text-amber-900">
        {badges.length > 1 ? t('New badges earned!') : t('New badge earned!')}
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {badges.map((badge) => (
          <span
            key={badge._id}
            title={t(badge.description)}
            className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-sm font-medium text-gray-800 shadow-sm"
          >
            <span aria-hidden="true">{badge.icon}</span> {t(badge.title)}
          </span>
        ))}
      </div>
      <Link to="/profile" className="mt-2 inline-block text-xs font-semibold text-amber-800 hover:underline">
        {t('See all badges →')}
      </Link>
    </div>
  );
}
