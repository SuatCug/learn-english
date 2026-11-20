import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LEVELS, CATEGORIES } from '@/lib/constants';
import { AI_SECTIONS } from '@/lib/aiSections';
import BrandMark from '@/components/BrandMark';
import PlanModal from './PlanModal';
import { tk } from '@/i18n';

const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/dogusuniv/',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/DogusUniversity/',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95Z" />
      </svg>
    ),
  },
  {
    label: 'X',
    href: 'https://x.com/DogusUniv',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M18.9 3H21l-6.5 7.4L22 21h-6.4l-5-6.4L4.7 21H2.6l6.9-7.9L2 3h6.5l4.5 5.8L18.9 3Zm-1.1 16h1.7L7.3 4.9H5.5L17.8 19Z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/channel/UCB5TDTCXPku-m7qQHSc1h0g',
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
        <path d="M23 12s0-3.6-.46-5.3a2.9 2.9 0 0 0-2-2C18.9 4.2 12 4.2 12 4.2s-6.9 0-8.54.5a2.9 2.9 0 0 0-2 2C1 8.4 1 12 1 12s0 3.6.46 5.3a2.9 2.9 0 0 0 2 2C5.1 19.8 12 19.8 12 19.8s6.9 0 8.54-.5a2.9 2.9 0 0 0 2-2C23 15.6 23 12 23 12ZM9.7 15.4V8.6l6 3.4-6 3.4Z" />
      </svg>
    ),
  },
];

// Etiketler render sırasında t() ile çevrilir.
const INFO_LINKS = [
  { label: tk('About us'), slug: 'about-us' },
  { label: tk('Terms of Use'), slug: 'terms-of-use' },
  { label: tk('Privacy Policy'), slug: 'privacy-policy' },
  { label: tk('Cookie Policy'), slug: 'cookie-policy' },
  { label: tk('Cookie Declaration'), slug: 'cookie-declaration' },
];

const CONTACT_LINKS = [
  { label: tk('Contact us'), slug: 'contact-us' },
  { label: tk('Request a topic for a lesson'), slug: 'request-topic' },
  { label: tk('Change your cookie consent'), slug: 'cookie-consent' },
];

// Pratik ve testler sütunu (girişe kapalı sayfalar; misafir giriş ekranına gider, sonra buraya döner).
const PRACTICE_LINKS = [
  { label: AI_SECTIONS.chat.label, to: AI_SECTIONS.chat.path },
  { label: AI_SECTIONS.talk.label, to: AI_SECTIONS.talk.path },
  { label: tk('Level Exams'), to: '/exams' },
  { label: tk('Level Test'), to: '/placement-test' },
  { label: tk('School Mode'), to: '/school' },
];

const LINK_CLASS = 'text-sm text-gray-400 hover:text-emerald-400 transition-colors';

function FooterColumn({ title, children }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-white mb-3">{title}</h4>
      <ul className="space-y-1.5">{children}</ul>
    </div>
  );
}

export default function Footer() {
  const { t } = useTranslation();
  const isGuest = !useSelector((state) => state.auth.token);
  const isPremium = useSelector((state) => state.auth.user?.isPremium);
  const [planModalOpen, setPlanModalOpen] = useState(false);

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Üst şerit: marka, kısa tanıtım; girişli kullanıcıya seviye testi / Pro butonları (misafir için navbar'da giriş/kayıt var) */}
      <div className="border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-center md:text-left">
          <div className="max-w-md">
            <Link to="/" className="inline-flex items-center gap-2">
              <BrandMark size={30} />
              <span className="text-lg font-bold text-white">learnenglish</span>
            </Link>
            <p className="mt-2 text-sm text-gray-400 leading-relaxed">
              {t(
                'Lessons, exercises and AI conversation practice from A1 to B2 — with instant feedback on every answer.'
              )}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 shrink-0">
            {!isGuest && (
              <>
                <Link
                  to="/placement-test"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg border border-gray-600 text-white text-sm font-semibold px-5 py-2.5 hover:bg-white/5 transition-colors"
                >
                  {t('Take a level test')}
                </Link>
                {isPremium ? (
                  <span className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-lg border border-emerald-500/50 text-emerald-400 text-sm font-semibold px-5 py-2.5">
                    ✓ {t('Pro member')}
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setPlanModalOpen(true)}
                    className="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-2.5 transition-colors"
                  >
                    {t('Upgrade to pro')}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Bağlantı sütunları */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-9 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8">
        <FooterColumn title={t('Learn')}>
          {CATEGORIES.map((c) => (
            <li key={c.slug}>
              <Link to={`/topics/${c.slug}`} className={LINK_CLASS}>
                {t(c.label)}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title={t('Practice & tests')}>
          {PRACTICE_LINKS.map((link) => (
            <li key={link.to}>
              <Link to={link.to} className={LINK_CLASS}>
                {t(link.label)}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title={t('Levels')}>
          {LEVELS.map((l) => (
            <li key={l.code}>
              <Link to={`/levels/${l.code}`} className={LINK_CLASS}>
                {l.code} {t(l.name)}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title={t('About')}>
          {INFO_LINKS.map((info) => (
            <li key={info.slug}>
              <Link to={`/info/${info.slug}`} className={LINK_CLASS}>
                {t(info.label)}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <div>
          <FooterColumn title={t('Help')}>
            {CONTACT_LINKS.map((contact) => (
              <li key={contact.slug}>
                <Link to={`/info/${contact.slug}`} className={LINK_CLASS}>
                  {t(contact.label)}
                </Link>
              </li>
            ))}
          </FooterColumn>
          <div className="flex items-center gap-2.5 mt-4">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-gray-300 hover:bg-white/20 hover:text-white transition-colors"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Alt şerit: telif */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} learnenglish. {t('All rights reserved.')}
          </p>
        </div>
      </div>

      <div className="h-1 bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500" />

      <PlanModal open={planModalOpen} onClose={() => setPlanModalOpen(false)} />
    </footer>
  );
}
